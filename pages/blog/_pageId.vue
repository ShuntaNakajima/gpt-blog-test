<template>
  <div class="Content">
      <Header :selected="'blog'"></Header>
      <div class="BlogContent">
        <h1>{{pageItem.Title.title[0].plain_text}}</h1>
        <div class="timelabel">{{createdTime}}</div>
        <div class="BlogBlocks">
          <div class="Article">
            <BlockContent v-for="block in page" :key="block.id" :block="block" />
          </div>
          <div class="Index">
            <BlockContentIndex :indexItems="indexItems" :nowId="nowId" />
          </div>
        </div>
      </div>
      <Footer></Footer>
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
    }
})
export default class BlogContent extends Vue {
    page_id: string = ""
    pageItem?: PageListItem
    page?: Block[] = []
    nowId: string = ""

    head() {
      return {
        title: this.pageItem?.Title.title[0].plain_text,
        meta: [
          { hid: 'og:url', property: 'og:url', content: `https://shunta.dev/blog/${this.page_id}` },
          { hid: 'og:image', property: 'og:image', content: `https://shunta.dev/ogp/${this.page_id}.png` },
          { hid: 'og:title', property: 'og:title', content: this.pageItem?.Title.title[0].plain_text },
          { hid: 'og:type', property: 'og:type', content: "article" },
        ]
      }
    }

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

    scrollY: number = 0;

    handleScroll(): void {
      const allH2 = document.querySelectorAll("h2")
      let id = allH2[0].id || ''
      allH2.forEach(x=>{
          if (x.offsetTop<=window.scrollY + 100){
            id = x.id
          }
      })
      this.nowId = id
    }

    mounted(): void {
      window.addEventListener('scroll', this.handleScroll);
      const allH2 = document.querySelectorAll("h2")
      this.nowId = allH2[0].id || ''
    }

    destoryed(): void {
      window.removeEventListener('scroll', this.handleScroll);
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
    @include mq(md){
      justify-content: center;
    }
    .Article{
      max-width: 670px;
    }
    .Index{
      @include mq(md){
        display: none;
      }
      position: sticky;
      top: 100px;
      height: fit-content;
    }
  }
}
</style>