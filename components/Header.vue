<template>
  <div class="Header">
      <div class="HeaderContent">
          <a href="/blog" class="HeaderContentLeft">
              <div class="icon">
                  <img src="~/assets/images/icon.png" alt="icon" class="image">
              </div>
              <p class="headertitle">shunta.dev</p>
          </a>
          <div class="HeaderContentRight">
              <a href="/blog" class="menuitem" :class="{'selected':selected=='blog'}">
                  Blog
              </a>
              <a href="/about" class="menuitem" :class="{'selected':selected=='about'}">
                  About
              </a>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component , Inject , Model , Prop , Provide , Vue , Watch , Emit } from 'nuxt-property-decorator'

@Component
export default class BlogList extends Vue {
    @Prop()
    selected?: string
}
</script>

<style scoped lang="scss">
.Header{
    height: 64px;
    width: 100%;
    background: $white;
    border-bottom: 0.5px solid #E7E7E7;
    position: fixed;
    top: 0;
    z-index: 99;
    &Content{
        padding: 0 $content-padding;
        margin: auto;
        max-width: $content-width;
        height: 100%;
        display: flex;
        justify-content: space-between;
        &Left{
            height: 100%;
            display: flex;
            align-items: center;
            .icon{
                width: 40px;
                height: 40px;
            }
            .headertitle{
                margin-left: 8px;
            }
        }
        &Right{
            height: 100%;
            display: flex;
            align-items: center;
            .menuitem{
                color: $gray;
                &:not(:last-child){
                    margin-right: 20px;
                }
            }
            .selected{
                color: black;
            }
        }
    }
}
</style>