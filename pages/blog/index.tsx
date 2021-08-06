import React from "react";
import Link from 'next/link';
import axios from "axios";

export interface Article {
    id: number;
    title: string;
    content: string;
}

function Blog({ list }: { list: Article[] }) {
    return (
        <ul>
            {list.map((article) => (<li key={article.id}>
                <Link href={`/blog/article/${article.id}`}>
                    {article.title}
                </Link>
            </li>))}
        </ul>
    )
}

export async function getServerSideProps() {
    const resp = await axios(`http://localhost:8080/users/blog`);
    return {
        props: {
            list: resp.data.data,
        }
    }
}

export default Blog;