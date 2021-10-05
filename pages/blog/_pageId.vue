<template>
  <div class="Content">
      <Header :selected="'blog'"></Header>
      <div class="BlogContent">
        <div class="TitleContent" v-if="!page_obj.cover">
          <h1>{{pageItem.Title.title[0].plain_text}}</h1>
          <div class="timelabel">{{createdTime}}</div>
        </div>
        <div class="TitleContentWithCover" v-else>
          <img :src="page_obj.cover.file.url" loading="lazy" class="Cover_IMG" alt="cover">
          <div class="Cover_IMG_Wrapper"></div>
          <div class="TitleWithCover">
            <h1>{{pageItem.Title.title[0].plain_text}}</h1>
            <div class="timelabel">{{createdTime}}</div>
          </div>
        </div>
        <div class="BlogBlocks">
          <div class="Article">
            <LazyBlockContent v-for="block in page" :key="block.id" :block="block" :ogp="ogps[block.id]" />
          </div>
          <div class="Index">
            <LazyBlockContentIndex :indexItems="indexItems" :nowId="nowId" />
          </div>
        </div>
      </div>
      <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Block, Page } from '@notionhq/client/build/src/api-types'
import { Component, Vue } from 'nuxt-property-decorator'
import ogpClient from '~/plugins/getogp'
import apiClient from '~/plugins/notion-api'
import { convertBookMarkObject, convertPageListItem, convertStringFormula, PageListItem } from '~/util/Interface/Page'

export interface OGP {
  title: string;
  description: string;
  url: string;
  image: string;
  siteName: string;
  twitterCard: string;
}

@Component({
    async asyncData({ params }) {
      const page_id = params.pageId
      const [page_obj,page] = await apiClient.getPage(page_id)
      const pageItem = convertPageListItem(page_obj)
      const ogps:{[name:string]: OGP} = {}
      const bookmarkblocks = page.filter(x=>x.type=="bookmark")
      for (let block of bookmarkblocks) {
        const bookmarkBlock = convertBookMarkObject(block)
        if (bookmarkBlock) {
          const ogp = await ogpClient.getOGP(bookmarkBlock?.id)
          if(ogp){
            ogps[block.id] = ogp
          }
        }
      }
      return { page_id, pageItem, page, ogps, page_obj }
    }
})
export default class BlogContent extends Vue {
    page_id: string = ""
    pageItem?: PageListItem
    page?: Block[] = []
    nowId: string = ""
    ogps: {[name:string]: OGP} = {}
    page_obj: Page|null = null

    head() {
      let description = ""
      if (this.pageItem?.description.rich_text[0]){
        description = this.pageItem?.description.rich_text[0].plain_text
      }
      return {
        title: this.pageItem?.Title.title[0].plain_text,
        meta: [
          { hid: 'og:url', property: 'og:url', content: `https://shunta.dev/blog/${this.page_id}` },
          { hid: 'og:image', property: 'og:image', content: `https://shunta.dev/ogp/${this.page_id}.png` },
          { hid: 'og:title', property: 'og:title', content: this.pageItem?.Title.title[0].plain_text },
          { hid: 'og:description', property: 'og:description', content: description },
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

    getBookmark(block:Block){
      return convertBookMarkObject(block)
    }

    handleScroll(): void {
      const allH2 = document.querySelectorAll("h2")
      if (allH2.length > 0){
        let id = allH2[0].id || ''
        allH2.forEach(x=>{
          if (x.offsetTop<=window.scrollY + 100){
            id = x.id
          }
        })
        this.nowId = id
      }
    }

    mounted(): void {
      window.addEventListener('scroll', this.handleScroll);
      const allH2 = document.querySelectorAll("h2")
      if (allH2.length > 0){
        this.nowId = allH2[0].id || ''
      }
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
  max-width: $content-width;
  display: flex;
  flex-direction: column;
  @include mq(md){
    justify-content: center;
  }
  .TitleContent{
    padding: 0 $content-padding;
  }
  .TitleContentWithCover{
    display: flex;
    max-width: calc(670px);
    width: 100%;
    height: 380px;
    position: relative;
    margin: 0 $content-padding;
    @include mq(md){
      align-self: center;
      margin: 0;
    }
    .TitleWithCover{
      position: absolute;
      left: $content-padding;
      bottom: $content-padding;
      color: white;
      .timelabel{
        color: white;
      }
    }
    .Cover_IMG{
      object-fit: cover
    }
    .Cover_IMG_Wrapper{
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0%;
      left: 0%;
      background: rgba(0, 0, 0, 0.214);
    }
  }
  .timelabel{
    font-size: 1.1rem;
    color: $gray;
  }
  .BlogBlocks{
    padding: 0 $content-padding;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    @include mq(md){
      justify-content: center;
    }
    .Article{
      max-width: 670px;
      width: 100%;
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