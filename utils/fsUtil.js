import { promises as fs } from "fs";
import path from "path";

export async function getPageCopy(page, { locale = "en", isRecipe = false }) {
  let copy;
  let recipeBase = {};

  if (isRecipe) {
    // If a recipe, we get the base content, so that we share menu content.
    recipeBase = await import(`../content/${locale}/recipes.yml`);
  }

  const filePath = `${isRecipe ? "recipes/" : ""}${page}.yml`;

  try {
    copy = await import(`../content/${locale}/${filePath}`);
  } catch (e) {
    copy = await import(`../content/it/${filePath}`);
  }

  return {
    slug: page,
    ...recipeBase,
    ...copy,
  };
}

export async function getAllRecipes(locale = "en") {
  const slugs = (
    await fs.readdir(path.join(process.cwd(), "content", locale, "recipes"))
  ).map((fileName) => fileName.replace(".yml", ""));
  const recipes = await Promise.all(
    slugs.map((slug) => getPageCopy(slug, { locale, isRecipe: true }))
  );

  return {
    slugs,
    recipes,
  };
}
