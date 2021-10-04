import parser from "ogp-parser"

export interface OGP {
    title: string;
    description: string;
    url: string;
    image: string;
    siteName: string;
    twitterCard: string;
}

class OGPClient{

    constructor(){}

    async getOGP(url:string){
        let data = await parser(encodeURI(url), { skipOembed: true })
        const siteName = data.ogp["og:site_name"] || [""]
        const title = data.title
        const description = data.seo.description || data.ogp["og:description"] || [""]
        const image = data.ogp["og:image"] || [""]
        const twitterCard = data.seo["twitter:card"] || data.ogp["twitter:card"] || [""]
        const ogp:OGP = {
            title: title,
            description: description[0],
            url: url,
            image: image[0],
            siteName: siteName[0],
            twitterCard: twitterCard[0]
        }
        return ogp
    }
}

const ogpClient = new OGPClient()

export default ogpClient