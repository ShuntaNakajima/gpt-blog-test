<template>
    <a class="EmbedContent" :href="link" target="_blank">
      <div class="Info" :class="{'withdesc':data.description}">
        <div class="titleelement">
          <div class="title">{{data.title}}</div>
          <div class="description" v-if="data.description">{{data.description}}</div>
        </div>
        <div class="url">{{link}}</div>
      </div>
      <div class="Image" v-if="data.image">
        <img :src="data.image" :alt="data.title">
      </div>
    </a>
</template>

<script lang="ts">

interface OGP {
  title: string;
  description: string;
  url: string;
  image: string;
  siteName: string;
  twitterCard: string;
}

import { Block, EmbedBlock, RichText, RichTextText, RichTextTextInput } from "@notionhq/client/build/src/api-types";
import {
  Component,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch,
  Emit
} from "nuxt-property-decorator";
@Component({
    components:{
    }
})
export default class EmbedContent extends Vue {
    @Prop()
    link!: string

    data: OGP = {
        title: "",
        description: "",
        url: "",
        image: "",
        siteName: "",
        twitterCard: "",
    }

  async mounted() {
    try {
      const resp = await this.$axios.$get(`.netlify/functions/embed?url=${this.link}`)
      this.data = resp
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style scoped lang="scss">
.EmbedContent{
  width: 100%;
  border-radius: 5px;
  border: 0.5px solid $gray;
  min-height: 100px;
  max-height: 170px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  .Info{
    max-width: 50%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    &.withdesc{
      justify-content: space-between;
    }
    .titleelement{
      .title{
        min-height: 20px;
        max-height: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .description{
        margin-top: 4px;
        max-height: 60px;
        color: $gray;
        font-size: 1.1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
    .url{
      margin-top: 4px;
      height: 20px;
      color: $gray;
      font-size: 1.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .Image{
    max-width: 50%;
    img{
      object-fit: contain;
      width: auto;
    }
  }
}
</style>
