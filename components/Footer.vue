<template>
  <div class="Footer">
      <!-- <p>© 2021 ︎Shunta Nakajima<br>All Rights Reserved.</p> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue} from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {
}
</script>

<style scoped lang="scss">
.Footer{
    padding-bottom: 50px;
    color: $gray;
    display: flex;
    flex-direction: column;
    p{
        font-size: 1.1rem;
        margin: 10px auto;
        text-align: center;
    }
    bottom: 0;
    position: absolute;
    width: 100%;
}
</style>