<template>
  <div class="Content">
      <Header></Header>
  </div>
</template>

<script lang="ts">
import { Component , Inject , Model , Prop , Provide , Vue , Watch , Emit } from 'nuxt-property-decorator'
import apiClient from '~/plugins/notion-api'

@Component({
    async asyncData({ params }) {
      const title = params.title
      const pages = await apiClient.getPages()
      return { title }
    },
})
export default class BlogList extends Vue {
    title: string = ""
}
</script>

<style scoped lang="scss">

</style>