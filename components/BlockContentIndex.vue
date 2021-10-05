<template>
    <div class="PageIndex">
        <div class="Title">目次</div>
        <div class="Indexs">
            <a v-for="(item,index) in indexItems" :key="idForH2(item)" :href="`#${idForH2(item)}`" :class="{'now':isShowArrow(item,index)}"><span v-if="isShowArrow(item,index)">👉　</span>{{richObject(item)}}</a>
        </div>
    </div>
</template>

<script lang="ts">
import { Block } from "@notionhq/client/build/src/api-types";
import {
  Component,
  Prop,
  Vue,
} from "nuxt-property-decorator";
import { convertRichTextObject, getIdForH2 } from "~/util/Interface/Page";

@Component
export default class BlockContentIndex extends Vue {
    @Prop()
    indexItems!: Block[]

    @Prop()
    nowId!: string

    isShowArrow(item:Block,index:number){
        return this.nowId===this.idForH2(item) || (this.nowId==='' && index===0)
    }

    idForH2(block:Block){
        return getIdForH2(block)
    }

    richObject(block:Block){
        return convertRichTextObject(block)?.text[0].plain_text
    }
}
</script>

<style scoped lang="scss">
.PageIndex{
    width: 200px;
    height: fit-content;
    .Indexs{
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        a{
            margin-top: 5px;
            margin-bottom: 5px;
            color: $gray;
            font-weight: 400;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            &.now{
                color: black;
            }
        }
    }
}
</style>
