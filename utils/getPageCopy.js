
export async function getPageCopy(page, locale='es_Us' ) {  
    let copy

    try {
        copy = await import(`../content/${locale}/${page}.yml`)
    } catch(e) {
        copy = await import(`../content/en/${page}.yml`)
    }

    return copy
}
