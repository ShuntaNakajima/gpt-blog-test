<template>
  <a class="BlogCard" @click="click" :href="`/blog/${page_id}`">
    <div class="BlogCardContent">
      <div class="BlogCardContentHeader" :style="styles" v-if="!cover">
        <div class="icon">
          <img src="~/assets/images/icon.png" alt="icon" class="image" />
        </div>
      </div>
      <div class="BlogCardContentHeader" v-else>
        <div class="LoadCircle"></div>
        <img :src="cover.file.url" loading="lazy" alt="cover" class="BlogCardContentHeaderIMG">
      </div>
      <div class="BlogCardContentInner">
        <div class="datelatbel">
          {{ date }}
        </div>
        <div class="title">
          {{ title }}
        </div>
      </div>
    </div>
  </a>
</template>

<script lang="ts">
import { ExternalFile } from "@notionhq/client/build/src/api-types";
import {
  Component,
  Prop,
  Vue,
  Emit
} from "nuxt-property-decorator";

@Component
export default class BlogList extends Vue {
  @Prop()
  title!: string;
  @Prop()
  date!: string;
  @Prop()
  imageUrl?: string;
  @Prop()
  page_id!: string
  @Prop()
  color!: string;
  @Prop()
  cover!: File | ExternalFile | null

  @Emit()
  click(){}

  get styles(){
    const styles:{[name:string]: any} = {}
    if (this.color == "0"){
      styles['background'] = '#f5a7a7'
    }else if (this.color == "1"){
      styles['background'] = '#D3F5A7'
    }else if (this.color == "2"){
      styles['background'] = '#A7F5F5'
    }else if (this.color == "3"){
      styles['background'] = '#FFBC7E'
    }else if (this.color == "4"){
      styles['background'] = '#CFD4FF'
    }else{
      styles['background'] = '#F5B9FF'
    }
    return styles
  }
}
</script>

<style scoped lang="scss">
.BlogCard {
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 0px 22px -5px rgba(0, 0, 0, 0.1);
  background: $white;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
  &:before {
    content: "";
    display: block;
    width: 100%;
    padding-top: 100%;
  }
  &:hover{
    box-shadow: 0px 0px 25px -5px rgba(0, 0, 0, 0.2);
    transform: translateY(-3px);
    transition: all 0.5s 0s ease;
  }
  &Content {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    &Header {
      width: 100%;
      height: 45%;
      background: #F0F0F0;
      display: flex;
      align-items: center;
      position: relative;
      .icon {
        margin: auto;
        height: 60px;
        width: 60px;
      }
      &IMG {
        object-fit: cover;
        z-index: 10;
      }
      .LoadCircle{
        background: linear-gradient(89.79deg, rgba(255, 255, 255, 0) 13.26%, rgba(254, 254, 254, 0.7) 52.65%, rgba(234, 234, 234, 0) 89.8%);
        height: 100%;
        width: 250px;
        top: 0;
        left: -150px;
        position: absolute;
        animation: skeleton-animation 1.4s linear infinite;
        @keyframes skeleton-animation {
          0% {
              transform: translateX(-200%);
          }
          100% {
              transform: translateX(200%);
          }
        }
      }
    }
    &Inner {
      padding: 10px;
      .datelatbel {
        font-size: 1.1rem;
        color: $gray;
      }
      .title {
        margin-top: 10px;
      }
    }
  }
}
</style>
