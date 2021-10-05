<template>
  <a class="BlogCard" @click="click" :href="`/blog/${page_id}`">
    <div class="BlogCardContent">
      <div class="BlogCardContentHeader" :style="styles">
        <div class="icon">
          <img src="~/assets/images/icon.png" alt="icon" class="image" />
        </div>
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
      background: #f5a7a7;
      display: flex;
      align-items: center;
      .icon {
        margin: auto;
        height: 60px;
        width: 60px;
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
