<template>
    <span v-if="!text.href" :style="style">{{text.text.content}}</span>
    <a :href="text.href" :style="style" v-else>{{text.text.content}}</a>
</template>

<script lang="ts">
import { RichTextText } from "@notionhq/client/build/src/api-types";
import {
  Component,
  Prop,
  Vue,
} from "nuxt-property-decorator";

@Component
export default class BlockText extends Vue {
  @Prop()
  text!: RichTextText;

  get style(){
      const styles:{[name:string]: any} = {}
      if (this.text.annotations){
          if (this.text.annotations.bold){
              styles['font-weight'] = '500'
          }
          if (this.text.annotations.italic){
              styles['font-style'] = 'italic'
          }
          if (this.text.annotations.strikethrough){
              styles['text-decoration'] = 'line-through'
          }
          if (this.text.annotations.underline){
              styles['border-bottom'] = '0.05em solid'
          }
          if (this.text.annotations.code){
              styles['background'] = 'rgba(135,131,120,0.15)'
              styles['color'] = '#EB5757'
              styles['border-radius'] = '3px'
              styles['font-size'] = '85%'
              styles['padding'] = '0.2em 0.4em'
          }
          if (this.text.annotations.color){
              styles['color'] = this.text.annotations.color
          }
      }
      return styles
  }
}
</script>

<style scoped lang="scss">
a{
    color: $link;
    border-bottom: 0.05em solid;
}
</style>
