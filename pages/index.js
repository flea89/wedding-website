import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { getPageCopy } from "../utils/getPageCopy";
import metaImg from "../public/meta.jpg";

export default function Ruutsu(context) {
  return (
    <div>
      <Head>
        <title>{context.meta.title}</title>
        <meta name="description" content={context.meta.desc} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`${context.meta.site}${metaImg.src}`}
        />
        <meta property="og:title" content={context.meta.title} />
        <meta
          name="description"
          content={context.meta.desc}
          itemProp="description"
        />
        <meta property="og:description" content={context.meta.desc} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={context.meta.title} />
        <meta name="twitter:description" content={context.meta.desc} />
        <meta
          name="twitter:image"
          content={`${context.meta.site}${metaImg.src}`}
        />
      </Head>

      <h1>{context.title}</h1>
      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
      ...(await getPageCopy("home", locale)),
    },
  };
}
