<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@font-face {
  font-family: 'bmwr-webfont';
  src: url('/static/bmw/fonts/bmwr-webfont.woff2') format('woff2'),
    url('/static/bmw/fonts/bmwr-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
@media only screen and (min-width: 576px) {
}

@media only screen and (min-width: 768px) {
}

@media only screen and (min-width: 992px) {
}

@media only screen and (min-width: 1200px) {
}
</style>
