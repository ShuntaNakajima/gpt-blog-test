import { Client } from "@notionhq/client"
import { Block, Filter, Page } from "@notionhq/client/build/src/api-types"
import { convertPageListItem, PageListItem } from "../util/Interface/Page"

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

    async getPage(page_id:string): Promise<[Page,Block[]]> {
        const filter:Filter = {
            property: "page_id",
            text: {
                contains: page_id
            }
        }
        const page = await this.client.databases.query({
            database_id: process.env.NOTION_DB || "",
            filter: filter
        })
        const id = page.results[0].id
        const page2 = await this.client.blocks.children.list({
            block_id: id
        })
        return [page.results[0],page2.results]
    }
}

const apiClient = new NotionAPIClient()

export default apiClient