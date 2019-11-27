<template>
  <div id="content-page">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'ContentPage'
}
</script>

<style lang="scss">
#content-page {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  height: 100%;
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  max-width: 100%;
  overflow-x: hidden
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
