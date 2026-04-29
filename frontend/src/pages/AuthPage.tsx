import { useState } from "react";
import { api } from "@/lib/api";

export const AuthPage = () => {
  const [isSignup, setSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const submit = async () => {
    const path = isSignup ? "/auth/signup" : "/auth/login";
    const payload = isSignup ? form : { email: form.email, password: form.password };
    const { data } = await api.post(path, payload);
    localStorage.setItem("token", data.token);
    alert(`Welcome ${data.user.name}`);
  };
  return <div className="glass mx-auto max-w-md space-y-3 rounded-3xl p-6"><h2 className="text-2xl">{isSignup ? "Create account" : "Welcome back"}</h2>
  {isSignup && <input className="w-full rounded-xl bg-zinc-900 p-3" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />}
  <input className="w-full rounded-xl bg-zinc-900 p-3" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
  <input type="password" className="w-full rounded-xl bg-zinc-900 p-3" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
  <button onClick={submit} className="w-full rounded-xl bg-accent py-3">Continue</button>
  <button onClick={() => setSignup(!isSignup)} className="text-sm text-zinc-400">{isSignup ? "Already have an account?" : "Need to sign up?"}</button></div>;
};
