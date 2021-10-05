<template>
  <div class="Content">
      <Header :selected="'about'"></Header>
      <div class="Preparation">
          準備中...
      </div>
      <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { FormulaPropertyValue, Page, TitlePropertyValue } from '@notionhq/client/build/src/api-types'
import { Component, Vue } from 'nuxt-property-decorator'
import apiClient from '~/plugins/notion-api'
import { convertPageListItem, convertStringFormula, PageListItem } from '~/util/Interface/Page'

@Component
export default class About extends Vue {
}
</script>

<style scoped lang="scss">
.Preparation{
    margin: auto;
    text-align: center;
    line-height: 100%;
    font-weight: 700;
    font-size: 32px;
    padding: 50px 0;
}
</style>