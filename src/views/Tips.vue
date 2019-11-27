<template>
  <div>
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="tips !== null" align="center">
      <HeroBanner v-bind:heroImage="tips.hero.imageUrl" v-bind:heading="tips.hero.heading" v-bind:subHeading="tips.hero.subHeading" category="tips">
      </HeroBanner>
      <div class="containger-fluid">
        <ContentBlock type="heading" alignment="center">
          <h1 class="col-12 mt-4">{{ tips.heading }}
          </h1>
        </ContentBlock>
        <ContentBlock type="content" alignment="left">
          <div class="col pl-md-0 pr-md-0 pl-xs-3 pr-xs-3 pt-4 ">
            <div>{{ tips.content }}
            </div>
          </div>
        </ContentBlock>
        <div class="row articles-width pt-4">
          <TipTile v-for="tip in tips.tiles" v-bind:key="tip.category" v-bind:category="tip.category" v-bind:image-url="tip.image" v-bind:headline="tip.headline" v-bind:articles="tip.articles">
          </TipTile>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ServiceHubAPI } from '@/services/service-hub-api'
import HeroBanner from '@/components/HeroBanner'
import ContentBlock from '@/components/ContentBlock'
import TipTile from '@/components/TipTile'
export default {
  name: 'Tips',
  components: {
    TipTile,
    HeroBanner,
    ContentBlock
  },
  data () {
    return {
      loading: false,
      tips: null,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.error = this.tips = null
      this.loading = true
      ServiceHubAPI.brandTips(this.$store.state.brand.name)
        .then((tips) => {
          this.tips = tips
          this.loading = false
        }).catch((err) => {
          this.error = err
          this.loading = false
        })
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
  /* Tip Articles Width */
  .articles-width {
    width: 700px;
  }
}
@media only screen and (min-width: 992px) {
  /* Article Row Width */
  .articles-width {
    width: 650px;
  }
}
@media only screen and (min-width: 1200px) {
  /* Article Row Width */
  .articles-width {
    width: 650px;
  }
}
</style>
