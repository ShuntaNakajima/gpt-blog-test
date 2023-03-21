<template>
  <div class="Content">
      <Header :selected="'blog'"></Header>
      <div class="PageList">
        <h2>記事一覧</h2>
        <div class="PageListContentGrid">
          <BlogCard :cover="coverItems[index]" :date="toString(item.created).string" :title="getTitle(item.Title)" :page_id="toString(item.page_id).string" :color="toString(item.color).string" v-for="(item,index) in filterdListItems" :key="toString(item.page_id).string" />
          <div class="dummyCard"></div>
          <div class="dummyCard"></div>
        </div>
      </div>
      <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { FormulaPropertyValue, Page, TitlePropertyValue } from '@notionhq/client/build/src/api-types'
import { Component, Vue } from 'nuxt-property-decorator'
import apiClient from '~/plugins/notion-api'
import { convertPageListItem, convertStringFormula, PageListItem } from '~/util/Interface/Page'

@Component({
    async asyncData({ params }) {
      const title = params.title
      const pages = await apiClient.getPages()
      const listItems = pages.map(page => convertPageListItem(page))
      return { title,listItems, pages }
    },
})
export default class BlogList extends Vue {
  listItems: PageListItem[] | null = null
  pages: Page[] | null = null

  get filterdListItems(){
    return this.listItems?.filter(x=>x.isPublic.checkbox)
  }

  get coverItems() {
    const filter_pages = this.pages?.filter(x=>convertPageListItem(x).isPublic.checkbox)
    return filter_pages?.map(x=>x.cover)
  }

  toString(formula:FormulaPropertyValue){
    return convertStringFormula(formula)
  }

  getTitle(title:TitlePropertyValue){
    if (title.title[0]){
      return title.title[0].plain_text
    }else{
      return ""
    }
  }
}
</script>

<style scoped lang="scss">
.PageList{
  margin: auto;
  padding: 0 $content-padding;
  max-width: $content-width;
  &ContentGrid{
    margin-top: 30px;
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(268px, 1fr));
  }
}
</style>