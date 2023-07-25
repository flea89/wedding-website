import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import RecipeLayout from "../../components/layouts/recipe-layout";
import { getAllRecipes, getPageCopy } from "../../utils/fsUtil";
import { useRouter } from "next/router";
import { marked } from "marked";
import HeadMeta from "../../components/HeadMeta";

export default function Index({ context, recipes }) {
  // NextJS automatic locale detection works only on index pages.
  // This is a quick workaround to detect the language on the client and redirect it to
  // to the right page.
  const router = useRouter();
  useEffect(() => {
    if (
      !/^\/(it|en).*/.test(location.pathname) &&
      /^en\b/.test(window.navigator.language)
    ) {
      router.push("/recipes", "/recipes", { locale: "en" });
    }
  }, []);

  return (
    <>
      <section
        className="no-border"
        dangerouslySetInnerHTML={{ __html: marked(context.description || "") }}
      ></section>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link href={`recipes/${recipe.slug}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

Index.getLayout = (page) => {
  return <RecipeLayout context={page.props.context}>{page}</RecipeLayout>;
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      locale,
      context: { ...(await getPageCopy("recipes", { locale })) },
      recipes: [...(await getAllRecipes(locale)).recipes],
    },
  };
}
