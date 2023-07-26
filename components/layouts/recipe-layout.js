import Head from "next/head";
import Link from "next/link";
import React from "react";
import HeadMeta from "../HeadMeta";

export default function RecipeLayout({ children, context }) {
  const metaContext = {
    meta: {
      ...context.meta,
      title: `${context.meta.title} - ${context.title}`,
      desc: `${context.short_desc}`,
      img: context.image,
    },
  };

  return (
    <>
      <HeadMeta pageContext={metaContext} />

      <header className="ph4 w-100 pv3 bt bb overflow-auto position-sticky-top background-white z1">
        {context.menu.map((i, index) => (
          <Link className="mr3 ttc" key={index} href={i.link}>
            {i.text}
          </Link>
        ))}
      </header>
      <main className="flex flex-column center pb4">
        <article>
          <div
            className="hero flex flex-column items-center justify-center tc"
            style={{
              backgroundImage: `url(${context.image})`,
            }}
          >
            <h1 className="mw6 mb2 pt5">{context.title}</h1>
            {context.original ? <p className="h3">({context.original})</p> : ""}
            <p className="mw6 ph4 pb6 center tc">{context.short_desc}</p>
          </div>
          <section className="justify-center ph4 mw7 center">
            {children}
          </section>
        </article>
      </main>
      <footer className="recipe-footer flex flex-column flex-row-ns justify-between-ns ph4 pv3 w-100">
        <ul className="list mt0 mb3 mb0-ns">
          {context.menu.map((i, index) => (
            <Link className="mr3 ttc" key={index} href={i.link}>
              {i.text}
            </Link>
          ))}
        </ul>

        {/* <ul className="list mv0">
          <li>
            <Link href="/it/recipes/"> Italiano </Link> -
            <Link href="/en/recipes/"> English</Link>
          </li>
        </ul> */}
      </footer>
    </>
  );
}
