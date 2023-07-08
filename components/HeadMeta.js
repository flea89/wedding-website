import Head from "next/head";
import React from "react";
import metaImg from "../public/meta.jpg";
import heroImg from "../public/hero.jpg";

/**
 * This module assumes the pages content always have the expected structure.
 * It is meant to be used within a next/head component.
 * @param {*} param0
 * @returns
 */
export default function HeadMeta({ pageContext }) {
  const image = pageContext.meta.img || metaImg.src;

  return (
    <Head>
      <title key="title">{pageContext.meta.title}</title>

      <meta
        name="description"
        key="description"
        content={pageContext.meta.desc}
      />
      <meta
        property="og:image"
        content={`${pageContext.meta.site}${image}`}
        key="og:image"
      />
      <meta
        property="og:title"
        content={pageContext.meta.title}
        key="og:title"
      />
      <meta
        name="description"
        content={pageContext.meta.desc}
        itemProp="description"
      />
      <meta
        property="og:description"
        content={pageContext.meta.desc}
        key="og:description"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta
        name="twitter:title"
        content={pageContext.meta.title}
        key="twitter:title"
      />
      <meta
        name="twitter:description"
        content={pageContext.meta.desc}
        key="twitter:description"
      />
      <meta
        name="twitter:image"
        content={`${pageContext.meta.site}${image}`}
        key="twitter:image"
      />
    </Head>
  );
}
