import Link from "next/link";
import React, { useRef, useState } from "react";
import RecipeLayout from "../../components/layouts/recipe";
import { getAllRecipes, getPageCopy } from "../../utils/fsUtil";

export default function Index({ context, recipes }) {
  return (
    <>
      <h1>{context.title}</h1>
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
