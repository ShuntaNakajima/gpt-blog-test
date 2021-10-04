const fs = require('fs').promises;
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
        let ogp: OGP|null
        try {
            const data = await fs.readFile(`./tmp/${url.replaceAll('/','_')}.json`, {encoding: 'utf-8'})
            ogp = JSON.parse(data) as OGP
        } catch (error) {
            ogp = null
        }
        return ogp
    }
}

const ogpClient = new OGPClient()

export default ogpClient