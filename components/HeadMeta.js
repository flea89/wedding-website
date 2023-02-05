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
  return (
    <>
      <title>{pageContext.meta.title}</title>
      <meta name="description" content={pageContext.meta.desc} />
      <link rel="icon" href="/favicon.ico" />
      <meta
        property="og:image"
        content={`${pageContext.meta.site}${metaImg.src}`}
      />
      <meta property="og:title" content={pageContext.meta.title} />
      <meta
        name="description"
        content={pageContext.meta.desc}
        itemProp="description"
      />
      <meta property="og:description" content={pageContext.meta.desc} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageContext.meta.title} />
      <meta name="twitter:description" content={pageContext.meta.desc} />
      <meta
        name="twitter:image"
        content={`${pageContext.meta.site}${heroImg.src}`}
      />
    </>
  );
}
