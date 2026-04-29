import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const router = Router();
const schema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6) });

router.post("/signup", async (req, res) => {
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error.flatten());
  const { name, email, password } = parse.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ message: "Email already used" });

  const role = (await prisma.user.count()) === 0 ? "ADMIN" : "USER";
  const user = await prisma.user.create({ data: { name, email, password: await bcrypt.hash(password, 10), role } });
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" });

  return res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

router.post("/login", async (req, res) => {
  const parsed = z.object({ email: z.string().email(), password: z.string() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

export default router;
