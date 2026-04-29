import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

type Article = { id: string; title: string; excerpt: string; content: string; coverImage: string; tags: string[]; comments: any[] };

export const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [comment, setComment] = useState<Record<string, string>>({});

  useEffect(() => { api.get("/articles").then((r) => setArticles(r.data)); }, []);
  const submit = async (id: string) => { await api.post(`/articles/${id}/comments`, { content: comment[id] }); window.location.reload(); };

  return <div className="grid gap-8">{articles.map((a, i) => (
    <motion.article key={a.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .08 }} className="glass overflow-hidden rounded-3xl">
      <img src={a.coverImage} className="h-64 w-full object-cover" />
      <div className="space-y-4 p-6"><div className="flex gap-2">{a.tags.map((t) => <span key={t} className="rounded-full bg-violet-500/20 px-3 py-1 text-xs">{t}</span>)}</div>
      <h2 className="text-2xl font-bold">{a.title}</h2><p className="text-zinc-300">{a.excerpt}</p>
      <textarea placeholder="Leave a thoughtful comment..." className="w-full rounded-xl bg-zinc-900 p-3" onChange={(e) => setComment((p) => ({ ...p, [a.id]: e.target.value }))} />
      <button onClick={() => submit(a.id)} className="rounded-xl bg-accent px-4 py-2 shadow-glow">Post comment</button>
      <div>{a.comments?.map((c: any) => <p key={c.id} className="mt-2 text-sm text-zinc-200">• {c.content}</p>)}</div></div>
    </motion.article>
  ))}</div>;
};
