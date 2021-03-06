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

function Blog({ list }: { list: Article[] }) {
  const router = useRouter();
  const [lang, setLang] = useState(router.locale);

  // @ts-ignore
  function onLangChange(e) {
    setLang(e.target.value);
    router.push(router.pathname, router.asPath, { locale: e.target.value });
  }
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

export async function getServerSideProps() {
  const resp = await axios(`http://localhost:8080/users/blog`);
  return {
    props: {
      list: resp.data.data,
    },
  };
}

export default Blog;
