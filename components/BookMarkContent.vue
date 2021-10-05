<template>
    <a class="BookMarkContent" :href="ogp.url" target="_blank" rel="noopener">
      <div class="Info" :class="{'withdesc':ogp.description}">
        <div class="titleelement">
          <div class="title">{{ogp.title}}</div>
          <div class="description" v-show="ogp.description">{{ogp.description}}</div>
        </div>
        <div class="url">{{ogp.url}}</div>
      </div>
      <div class="Image" v-show="ogp.image">
        <div class="SkeltonBase" v-if="!showIMG"></div>
        <div class="LoadCircle" v-if="!showIMG"></div>
        <img loading="lazy" :src="ogp.image" :alt="ogp.title" v-if="showIMG">
      </div>
    </a>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
} from "nuxt-property-decorator";
import { OGP } from "~/plugins/getogp";

@Component({
    components:{
    }
})
export default class BookMarkContent extends Vue {
    @Prop()
    ogp!: OGP

    showIMG = false

    mounted(){
      function sleep(ms:number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      const waittime = Math.round( Math.random () * 1000 ) + 2500
      sleep(waittime).then(()=>{
        this.showIMG = true
      })
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
    width: 50%;
    min-height: 150px;
    position: relative;
    overflow: hidden;
    .SkeltonBase{
      background: #F0F0F0;
      height: 100%;
      width: 100%;
      position: absolute;
    }
    .LoadCircle{
      background: linear-gradient(89.79deg, rgba(255, 255, 255, 0) 13.26%, rgba(254, 254, 254, 0.7) 52.65%, rgba(234, 234, 234, 0) 89.8%);
      height: 100%;
      width: 250px;
      top: 0;
      left: -150px;
      position: absolute;
      animation: skeleton-animation 2.4s linear infinite;
      @keyframes skeleton-animation {
        0% {
            transform: translateX(-200%);
        }
        100% {
            transform: translateX(200%);
        }
      }
    }
    @include mq(sm){
      width: 100%;
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
