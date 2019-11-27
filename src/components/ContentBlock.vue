<template>
  <div v-bind:class="blockLayout">
    <div class="row" v-bind:align="alignment">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentBlock',
  props: {
    type: String,
    alignment: String
  },
  computed: {
    blockLayout: function () {
      let result
      if (this.type === 'heading') {
        result = 'container-fluid col-lg-7 col-md-7 col-sm-8'
      } else if (this.type === 'subheading') {
        result = 'container-fluid col-lg-7 col-md-11 col-sm-8'
      } else {
        result = 'container-fluid col-lg-7 col-md-11 col-sm-8'
      }
      return result
    }
  }
}
</script>

<style scoped lang="scss">
/* styles for xs screens go here */
/* styles for different screen widths follow */
@media only screen and (min-width: 576px) {
}
@media only screen and (min-width: 768px) {
}
@media only screen and (min-width: 992px) {
}
@media only screen and (min-width: 1200px) {
}
</style>
