import { Client } from "@notionhq/client"
import { Page } from "@notionhq/client/build/src/api-types"

class NotionAPIClient{

    client: Client

    constructor(){
        this.client = new Client({
            auth: process.env.NOTION_TOKEN
        })
    }

    async getPages(): Promise<Page[]> {
        const page = await this.client.databases.query({
            database_id: process.env.NOTION_DB || ""
        })
        return page.results
    }
}

const apiClient = new NotionAPIClient()

export default apiClient