import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { AuthedRequest, requireAdmin, requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res) => {
  const articles = await prisma.article.findMany({ include: { comments: { include: { user: true } } }, orderBy: { createdAt: "desc" } });
  res.json(articles);
});

router.post("/", requireAuth, requireAdmin, async (req: AuthedRequest, res) => {
  const parsed = z.object({ title: z.string(), excerpt: z.string(), content: z.string(), coverImage: z.string().url(), tags: z.array(z.string()), authorName: z.string() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });
  const article = await prisma.article.create({ data: parsed.data });
  res.status(201).json(article);
});

router.post("/:id/comments", requireAuth, async (req: AuthedRequest, res) => {
  const parsed = z.object({ content: z.string().min(2) }).safeParse(req.body);
  if (!parsed.success || !req.user) return res.status(400).json({ message: "Invalid payload" });

  const comment = await prisma.comment.create({
    data: { content: parsed.data.content, articleId: req.params.id, userId: req.user.userId },
    include: { user: true }
  });
  res.status(201).json(comment);
});

export default router;
