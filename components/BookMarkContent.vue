<template>
    <a class="BookMarkContent" :href="link" target="_blank">
      <div class="Info" :class="{'withdesc':ogpData.description}">
        <div class="titleelement">
          <div class="title">{{ogpData.title}}</div>
          <div class="description" v-show="ogpData.description">{{ogpData.description[0]}}</div>
        </div>
        <div class="url">{{link}}</div>
      </div>
      <div class="Image" v-show="ogpData.image">
        <img :src="ogpData.image" :alt="ogpData.title">
      </div>
    </a>
</template>

<script lang="ts">

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
import { OGP } from "~/plugins/getogp";
@Component({
    components:{
    }
})
export default class BookMarkContent extends Vue {
    @Prop()
    link!: string

    @Prop()
    OGPDict!: {[name:string]:OGP};

    get ogpData():OGP{
      if (this.OGPDict){
        return this.OGPDict[this.link]
      }else{
        return {
          title: "",
          description: "",
          url: "",
          image: "",
          siteName: "",
          twitterCard: "",
        }
      }
    }

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
