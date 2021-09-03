import { Client } from "@notionhq/client"
import { PageInterface } from "~/util/Interface/Page"

class NotionAPIClient{

    client: Client

    constructor(){
        this.client = new Client({
            auth: process.env.NOTION_TOKEN
        })
    }

    async getTitles() {
        return (await this.getPages()).map(page => page.Title)
    }

    async getPages(): Promise<PageInterface[]> {
        const page = await this.client.databases.query({
            database_id: process.env.NOTION_DB || ""
        })
        return page.results.map(page => page.properties as PageInterface)
    }
}

const apiClient = new NotionAPIClient()

export default apiClient