export async function getPageCopy(page, {
  locale = "en", 
  isRecipe=false
}) {
  let copy;
  const filePath = `${isRecipe? 'recipes/': '' }${page}.yml`

  try {
    copy = await import(`../content/${locale}/${filePath}`);
  } catch (e) {
    copy = await import(`../content/en/${filePath}`);
  }

  return copy;
}
