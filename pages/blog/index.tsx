import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import intl from "react-intl-universal";
import { useRouter } from "next/router";

export interface Article {
  id: number;
  title: string;
  content: string;
}

function Blog() {
  const [list, setList]: [Article[], any] = useState([]);
  const router = useRouter();
  const [lang, setLang] = useState(router.locale);

  // @ts-ignore
  function onLangChange(e) {
    setLang(e.target.value);
    router.push(router.pathname, router.asPath, { locale: e.target.value });
  }
  async function LoadList() {
    const resp = await axios(`/api/blog`);
    setList(resp.data.data);
  }
  useEffect(() => {
    LoadList();
  }, []);
  return (
    <div>
      <select name="lang" value={lang} onChange={onLangChange}>
        <option value="zh-CN">简体中文</option>
        <option value="en-US">English</option>
      </select>
      <h2>{intl.get(`blog.title`)}</h2>
      <ul>
        {list.map((article) => (
          <li key={article.id}>
            <Link href={`/blog/article/${article.id}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
