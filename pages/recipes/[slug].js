import { marked } from "marked";
import React from "react";
import { getPageCopy } from "../../utils/getPageCopy";
import { promises as fs } from "fs";
import path from "path";
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
  const recipies = await fs.readdir(
    path.join(process.cwd(), "content", "en", "recipes/")
  );

  return {
    paths: recipies.flatMap((fileName) =>
      locales.map((locale) => ({
        params: { slug: fileName.replace(".yml", "") },
        locale,
      }))
    ),
    fallback: false,
  };
}
