import React, { useEffect, useState } from "react";
import styles from "@/styles/BlogPost.module.css";
import { useRouter } from "next/router";
import * as fs from "fs";

const Slug = (props) => {
  const [blog, setBlog] = useState(props.myBlog);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.title}</h1>
        <hr />
        <div>{blog && blog.content}</div>
      </main>
    </div>
  );
};




export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "how-to-learn-flask" } },
      { params: { slug: "how-to-learn-javascript" } },
      { params: { slug: "how-to-learn-nextjs" } },
    ],
    fallback: false, // can also be true or 'blocking'
  };
}
export async function getStaticProps(context) {
  console.log(context);
  const { slug } = context.params;

  let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, "utf-8");
  
    

  return {
    props: { myBlog:JSON.parse(myBlog) }, // will be passed to the page component as props
  };
}
export default Slug;
