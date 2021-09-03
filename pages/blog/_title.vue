<template>
  <div class="bb">
      {{title}}
  </div>
</template>

<script lang="ts">
import { Component , Inject , Model , Prop , Provide , Vue , Watch , Emit } from 'nuxt-property-decorator'

@Component({
    async asyncData({ params }) {
      const title = params.title
      return { title }
    },
})
export default class BlogContent extends Vue {
    title: string = ""
}
</script>

<style scoped lang="scss">

</style>