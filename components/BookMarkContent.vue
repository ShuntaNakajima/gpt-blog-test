<template>
    <a class="BookMarkContent" :href="link" target="_blank">
      <div class="Info" :class="{'withdesc':ogp.description}">
        <div class="titleelement">
          <div class="title">{{ogp.title}}</div>
          <div class="description" v-show="ogp.description">{{ogp.description[0]}}</div>
        </div>
        <div class="url">{{bookmark.bookmark.url}}</div>
      </div>
      <div class="Image" v-show="ogp.image">
        <img :src="ogp.image" :alt="ogp.title">
      </div>
    </a>
</template>

<script lang="ts">

import { Block, BookmarkBlock, EmbedBlock, RichText, RichTextText, RichTextTextInput } from "@notionhq/client/build/src/api-types";
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
import ogpClient, { OGP } from "~/plugins/getogp";
@Component({
    components:{
    },
    async fetch(){
      // @ts-ignore
      const data = await ogpClient.getOGP(this.link)
      // @ts-ignore
      this.ogp = data
    }
})
export default class BookMarkContent extends Vue {
    @Prop()
    bookmark!: BookmarkBlock

    ogp!: OGP
}
</script>

<style scoped lang="scss">
.BookMarkContent{
  width: 100%;
  border-radius: 5px;
  border: 0.5px solid $border;
  min-height: 100px;
  max-height: 170px;
  @include mq(sm){
    max-height: 999px;
  }
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  background: $white;
  position: relative;
  @include mq(sm){
    flex-direction: column-reverse;
  }
  &::after{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
  }
  &:hover::after{
    background: $hover;
    opacity: 0.2;
  }
  .Info{
    max-width: calc(50% - 32px);
    @include mq(sm){
      max-width: 100%;
    }
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
        @include mq(sm){
          display: none;
        }
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
    @include mq(sm){
      max-width: 100%;
    }
    img{
      object-fit: contain;
      width: auto;
      float: right;
      @include mq(sm){
        width: 100%;
      }
    }
  }
}
</style>
