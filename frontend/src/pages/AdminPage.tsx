import { useState } from "react";
import { api } from "@/lib/api";

export const AdminPage = () => {
  const [article, setArticle] = useState({ title: "", excerpt: "", content: "", coverImage: "", tags: "design,ux", authorName: "Admin" });
  const submit = async () => {
    await api.post("/articles", { ...article, tags: article.tags.split(",").map((t) => t.trim()) });
    alert("Article published");
  };
  return <div className="glass mx-auto grid max-w-3xl gap-3 rounded-3xl p-6">{Object.keys(article).map((k) => (
    <input key={k} placeholder={k} className="rounded-xl bg-zinc-900 p-3" onChange={(e) => setArticle((p) => ({ ...p, [k]: e.target.value }))} />
  ))}<button onClick={submit} className="rounded-xl bg-accent py-3">Publish article</button></div>;
};
