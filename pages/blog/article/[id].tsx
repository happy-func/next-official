import React from "react";
import { Article } from "../index";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import intl from "react-intl-universal";

function BlogContent({ article }: { article: Article }) {
  const router = useRouter();
  if (!article) {
    return <div>Loading……</div>;
  }

  function goBack() {
    router.back();
  }

  return (
    <>
      <h2 onClick={goBack}>
        <mark>{intl.get("article.back")}</mark>
      </h2>
      <h1>{article.title}</h1>
      <div>
        <mark>{article.id}</mark>
      </div>
      <article
        dangerouslySetInnerHTML={{
          __html: article.content,
        }}
      />
    </>
  );
}

export async function getStaticPaths() {
  const resp = await axios(`http://localhost:8080/users/blog`);
  return {
    paths: resp.data.data.map((article: Article) => ({
      params: { id: article.id.toString(10) },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { id } = params || {};
  const resp = await axios.get(`http://localhost:8080/users/blog/${id}`);
  return {
    props: {
      article: resp.data.data,
    },
    revalidate: 60,
  };
}

export default BlogContent;
