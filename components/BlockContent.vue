<template>
  <component class="BlockContent" :is="tag" v-if="richTexts">
    <span v-for="(text, index) in richTexts.text" :key="index"><BlockText :text="richTextText(text)"></BlockText></span>
  </component>
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
import { convertRichTextObject } from "~/util/Interface/Page";

@Component
export default class BlockContent extends Vue {
  @Prop()
  block!: Block;

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
      case 'embed':
        return "div"
      default:
        return "div"
    }
  }

  richTextText(richText:RichText){
    if (richText.type === "text"){
      return richText
    } else {
      return {} as RichTextTextInput
    }
  }

  get richTexts(){
    return convertRichTextObject(this.block)
  }
}
</script>

<style scoped lang="scss">
h2{
  border-bottom: 0.5px solid $gray;
  line-height: 50px;
  margin-bottom: 2.2rem;
  &:not(:first-child){
    margin-top: 3rem;
  }
  &:first-child{
    margin-top: 0;
  }
}
p{
  font-weight: 400;
  font-size: 1.4rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
