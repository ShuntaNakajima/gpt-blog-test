<template>
  <div class="Content">
      <Header></Header>
      <div class="BlogContent" v-if="pageItem && page">
        <h1>{{pageItem.Title.title[0].plain_text}}</h1>
        <div class="timelabel">{{createdTime}}</div>
        <div class="BlogBlocks">
          <div class="Article">
            <BlockContent v-for="block in page" :key="block.id" :block="block" />
          </div>
          <div class="Index">
            目次
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Block } from '@notionhq/client/build/src/api-types'
import { Component , Inject , Model , Prop , Provide , Vue , Watch , Emit } from 'nuxt-property-decorator'
import apiClient from '~/plugins/notion-api'
import { convertStringFormula, PageListItem } from '~/util/Interface/Page'

@Component({
    async asyncData({ params }) {
      const page_id = params.pageId
      const [pageItem,page] = await apiClient.getPage(page_id)
      return { page_id, pageItem, page }
    },
})
export default class BlogContent extends Vue {
    page_id: string = ""
    pageItem?: PageListItem
    page?: Block[] = []

    get createdTime(){
      if (this.pageItem){
        return convertStringFormula(this.pageItem?.created).string
      } else {
        return ""
      }
    }

    get indexItems(){
      if (this.page){
        return this.page.filter(x=>x.type=="heading_2")
      }else{
        return []
      }
    }
}
</script>

<style scoped lang="scss">
.BlogContent{
  margin: auto;
  margin-top: 20px;
  padding: 0 $content-padding;
  max-width: $content-width;
  .timelabel{
    font-size: 1.1rem;
    color: $gray;
  }
  .BlogBlocks{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .Article{
    }
    .Index{

    }
  }
}
</style>