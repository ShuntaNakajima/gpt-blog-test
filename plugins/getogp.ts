export default async function getOGP(url:string){
    const parser = require("ogp-parser")
    let data = await parser(encodeURI(url), { skipOembed: true })
    const siteName = data.ogp["og:site_name"] || [""]
    const title = data.title
    const description = data.seo.description || data.ogp["og:description"] || [""]
    const image = data.ogp["og:image"] || [""]
    const twitterCard = data.seo["twitter:card"] || data.ogp["twitter:card"] || [""]
    const ogp:OGP = {
        title: title,
        description: description,
        url: url,
        image: image,
        siteName: siteName,
        twitterCard: twitterCard
    }
    return ogp
}

export interface OGP {
    title: string;
    description: string;
    url: string;
    image: string;
    siteName: string;
    twitterCard: string;
}