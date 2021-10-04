<template>
  <div v-show="type">
    <ScriptContent :content="content" v-if="content && type==='gist'" />
    <ScriptContent :content="content" v-if="content && type==='twitter'" />
    <Tweet :id="data" v-if="data && type==='twitter'" widget-class="twitteremebed" :options="{ width: '100%' }"></Tweet>
  </div>
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
// @ts-ignore
import VueEmbedGist from 'vue-embed-gist'
// @ts-ignore
import { Tweet } from 'vue-tweet-embed'
@Component({
    components:{
      VueEmbedGist,
      Tweet
    }
})
export default class EmbedContent extends Vue {
  @Prop()
  embet!: EmbedBlock

  data: string = ""
  type: string = ""


  content = ""

  getType(){
    const link = this.embet.embed.url
    let script = document.createElement('script');
    if (link.includes('gist.github.com')){
      script.setAttribute("src", `${link}.js`);
      this.type="gist"
    } else if (link.includes('twitter.com')){
      script.setAttribute("src", `https://platform.twitter.com/widgets.js`)
      this.data = link.split('/').slice(-1)[0].split('?')[0]
      console.log(this.data)
      this.type="twitter"
    }
    this.content = script.outerHTML
  }

  mounted(){
    this.getType()
  }
}
</script>

<style lang="scss">
.twitteremebed >>> iframe{
  max-width: 550px !important;
}
</style>
