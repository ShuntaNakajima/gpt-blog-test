<template>
  <component :is="tag" v-if="richTexts" :id="idForH2">
    <span v-for="(text, index) in richTexts.text" :key="index"><BlockText :text="richTextText(text)"></BlockText></span>
    <br v-if="richTexts.text.length === 0">
  </component>
  <component :is="tag" v-else-if="image">
    <img :src="image.file.url" :alt="imageCaption" loading="lazy" class="ImageContent">
  </component>
  <component :is="tag" v-else-if="embet">
    <client-only>
      <LazyEmbedContent :embet="embet" />
    </client-only>
  </component>
  <component :is="tag" v-else-if="bookmark">
      <BookMarkContent :ogp="ogp" />
  </component>
  <component class="ListContent" :is="tag" v-else-if="bulletedList">
    <div class="ListDot"></div><div><span v-for="(text, index) in bulletedList.text" :key="index"><BlockText :text="richTextText(text)"></BlockText></span></div>
  </component>
  <!-- Add more feature here -->
  <!-- <component :is="tag" v-else>
    {{block}}
  </component> -->
</template>

<script lang="ts">
import { Block, RichText } from "@notionhq/client/build/src/api-types";
import {
  Component,
  Prop,
  Vue,
} from "nuxt-property-decorator";
import { OGP } from "~/plugins/getogp";
import { convertEmbetObject, convertBookMarkObject, convertImageObject, convertRichTextObject, getIdForH2, getRichTextText, convertBulletedListItemObject } from "~/util/Interface/Page";

@Component
export default class BlockContent extends Vue {
  @Prop()
  block!: Block;

  @Prop()
  ogp?: OGP;

  get tag(){
    switch (this.block.type){
      case 'heading_1':
        return "h1"
      case 'heading_2':
        return "h2"
      case "heading_3":
        return "h3"
      case 'paragraph':
        return "p"
      case 'bulleted_list_item':
        return "p"
      case 'embed':
        return "div"
      default:
        return "div"
    }
  }

  richTextText(richText:RichText){
    return getRichTextText(richText)
  }

  get idForH2(){
    return getIdForH2(this.block)
  }

  get richTexts(){
    return convertRichTextObject(this.block)
  }

  get image(){
    return convertImageObject(this.block)
  }

  get embet(){
    return convertEmbetObject(this.block)
  }

  get bookmark(){
    return convertBookMarkObject(this.block)
  }

  get bulletedList(){
    return convertBulletedListItemObject(this.block)
  }

  get imageCaption(){
    if (this.image?.caption){
      return this.image.caption[0].plain_text
    } else {
      return ""
    }
  }
}
</script>

<style scoped lang="scss">
h2{
  border-bottom: 0.5px solid $gray;
  line-height: 50px;
  margin-bottom: 2.2rem;
  padding-top: 70px;
  &:not(:first-child){
    margin-top: calc(3rem - 70px);
  }
  &:first-child{
    margin-top: -79px;
  }
}
p{
  font-weight: 400;
  font-size: 1.4rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  @include mq(xs){
    line-height: 1.8;
  }
}
.ImageContent{
  margin-top: 20px;
  margin-bottom: 20px;
}
.ListContent{
  display: flex;
  align-items: center;
}
.ListDot{
  font-size: 2.8rem;
  line-height: 1;
  &::before{
    content: "・"
  }
}
</style>
