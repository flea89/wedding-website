import Head from "next/head";
import React from "react";
import HeadMeta from "../HeadMeta";

export default function RecipeLayout({ children, context }) {
  return (
    <>
      <Head>
        <HeadMeta pageContext={context} />
      </Head>
      <header className="ph4 w-100 pv3 mb4 mb5-ns bt bb overflow-auto position-sticky-top background-white z1">
        {context.menu.map((i, index) => (
          <a className="mr3 ttc" key={index} href={i.link}>
            {i.text}
          </a>
        ))}
      </header>
      <main className="ph4 mw8 flex flex-column center">{children}</main>
    </>
  );
}
