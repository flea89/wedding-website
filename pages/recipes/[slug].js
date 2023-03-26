import { marked } from "marked";
import React from "react";
import { getAllRecipes, getPageCopy } from "../../utils/fsUtil";
import RecipeLayout from "../../components/layouts/recipe";

export default function Recipe(props) {
  return <div dangerouslySetInnerHTML={{ __html: props.content }} />;
}

Recipe.getLayout = (page) => {
  return <RecipeLayout context={page.props.context}>{page}</RecipeLayout>;
};

export async function getStaticProps({ locale, params }) {
  const recepy = await getPageCopy(params.slug, { locale, isRecipe: true });
  const content = marked(recepy.md);

  return {
    props: {
      locale,
      context: { ...recepy },
      content,
    },
  };
}

export async function getStaticPaths({ locales }) {
  const recipesByLocales = {};

  for (let locale of locales) {
    recipesByLocales[locale] = (await getAllRecipes(locale)).slugs;
  }

  return {
    paths: Object.keys(recipesByLocales).flatMap((locale) => {
      const recipesByLocale = recipesByLocales[locale];
      return recipesByLocale.map((fileName) => ({
        params: { slug: fileName.replace(".yml", "") },
        locale,
      }));
    }),
    fallback: false,
  };
}
