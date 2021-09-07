<template>
  <component class="BlockContent" :is="tag" v-if="richTexts" :id="idForH2">
    <span v-for="(text, index) in richTexts.text" :key="index"><BlockText :text="richTextText(text)"></BlockText></span>
    <br v-if="richTexts.text.length === 0">
  </component>
  <component class="BlockContent" :is="tag" v-else-if="image">
    <img :src="image.file.url" :alt="imageCaption" class="ImageContent">
  </component>
  <component class="BlockContent" :is="tag" v-else-if="embet">
    <client-only>
      <EmbedContent :embet="embet" />
    </client-only>
  </component>
  <component class="BlockContent" :is="tag" v-else-if="bookmark">
    <BookMarkContent :link="bookmark" :OGPDict="OGPDict" />
  </component>
  <component class="BlockContent ListContent" :is="tag" v-else-if="bulletedList">
    <div class="ListDot"></div><span v-for="(text, index) in bulletedList.text" :key="index"><BlockText :text="richTextText(text)"></BlockText></span>
  </component>
  <!-- Add more feature here -->
  <!-- <component class="BlockContent" :is="tag" v-else>
    {{block}}
  </component> -->
</template>

<script lang="ts">
import { Block, RichText, RichTextText, RichTextTextInput } from "@notionhq/client/build/src/api-types";
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
import { convertEmbetObject, convertBookMarkObject, convertImageObject, convertRichTextObject, getIdForH2, getRichTextText, convertBulletedListItemObject } from "~/util/Interface/Page";

@Component
export default class BlockContent extends Vue {
  @Prop()
  block!: Block;

  @Prop()
  OGPDict!: {[name:string]:OGP};

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
