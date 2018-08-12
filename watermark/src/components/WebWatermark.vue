<template>
  <div class="contentBox">
    <header>
      <h3>主题：web页面水印</h3>
    </header>
    <main id="main">
      <p>水印支持图片、文字</p>
      <p>水印区域支持某个盒子，body</p>
      <section class="btn-bar">
         <input type="button" value="图片水印" @click="changeWatermark(1)">
         <input type="button" value="文字水印" @click="changeWatermark(2)">
      </section>
    </main>
    <footer>
      <p>底部</p>
    </footer>
  </div>
</template>

<script>
import {watermark} from '../utils/webWatermark'
export default {
  name: 'webWatermark',
  data () {
    return {
      msg: 'Welcome to Your webWatermark'
    }
  },
  methods: {
    changeWatermark (value) {
      switch (value) {
        case 1 :
          watermark({type: 'img', container: '#main', imgUrl: './static/hdly-backImg.png'})
          break
        case 2 :
          watermark({type: 'text', txt: 'joel 文字水印1234567890987654321', container: '#main'})
          break
      }
    }
  },
  mounted () {
    watermark({type: 'text', txt: 'joel 文字水印1234567890987654321', container: '#main'})
  }
}
</script>

<style lang="scss" scoped>
@mixin base-border {
  border:solid 1px #ccc;
}
@mixin base-hv-center {
  border:solid 1px #ccc;
}
$base-height:80px;

.contentBox {
  width: 80%;
  margin: 0 auto;
  background-color: white;
  z-index: 9999;
  position: relative;
  header {
    height:$base-height;
    line-height: $base-height;
    @include base-border;

  }
  main {
    height: 600px;
    p {
      padding: 20px 0;
    }
  }
  footer {
    height: $base-height;
    line-height: $base-height;
    @include base-border;
    color:black;
  }
  .btn-bar {
    margin: 50px;
    height: 50px;
    line-height: 50px;
    input {
      padding:10px 15px;
      text-align: center;
      border:none;
      margin-right: 20px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
