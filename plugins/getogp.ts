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
        const data = await fs.readFile(`./dist/images/${url.replaceAll('/','_')}.json`, {encoding: 'utf-8'})
        const ogp = JSON.parse(data) as OGP
        return ogp
    }
}

const ogpClient = new OGPClient()

export default ogpClient