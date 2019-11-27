<template>
  <div>
    <div v-if="loading" class="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="article && brandTips" class="article">
      <HeroBanner v-bind:hero-image="heroBanner.imageUrl" v-bind:heading="heroBanner.heading" v-bind:subHeading="heroBanner.subHeading" v-bind:category="category">
      </HeroBanner>
      <div class="container-fluid mt-3">
        <ContentBlock type="heading" alignment="center">
          <h1 v-html="articleTitle"></h1>
        </ContentBlock>
        <div class="pt-4" v-html="article">
        </div>
        <div class="container-fluid pb-4" align="center">
          <ScheduleServiceButton coupon-id="" v-bind:source="scheduleServiceSource">
          </ScheduleServiceButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ServiceHubAPI } from '@/services/service-hub-api'
import HeroBanner from '@/components/HeroBanner'
import ScheduleServiceButton from '@/components/ScheduleServiceButton'
import ContentBlock from '@/components/ContentBlock'
export default {
  name: 'TipArticle',
  components: {
    ContentBlock,
    ScheduleServiceButton,
    HeroBanner
  },
  data () {
    return {
      loading: false,
      brandTips: null,
      article: null,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    scheduleServiceSource: function () {
      return `article-${this.$route.params.category}-${this.$route.params.id}`
    },
    category: function () {
      return `${this.$route.params.category}-${this.$route.params.id}`
    },
    heroBanner: function () {
      let result
      if (this.brandTips) {
        let categoryDetails = this.categoryTileData(this.$route.params.category)
        if (categoryDetails && categoryDetails.hero) {
          result = categoryDetails.hero
        } else {
          result = {}
        }
      } else {
        result = {}
      }
      return result
    },
    articleTitle: function () {
      let result
      if (this.brandTips) {
        let categoryDetails = this.categoryTileData(this.$route.params.category)
        if (categoryDetails) {
          let articleHeading = null
          for (let i = 0; i < categoryDetails.articles.length; i++) {
            if (categoryDetails.articles[i].id === this.$route.params.id) {
              articleHeading = categoryDetails.articles[i]
              break
            }
          }
          if (articleHeading) {
            result = articleHeading.title
          } else {
            result = ''
          }
        } else {
          result = ''
        }
      } else {
        result = ''
      }
      return result
    }
  },
  methods: {
    categoryTileData (category) {
      let tile = null
      if (this.brandTips && this.brandTips.tiles) {
        for (let i = 0; i < this.brandTips.tiles.length; i++) {
          if (this.brandTips.tiles[i].category === this.$route.params.category) {
            tile = this.brandTips.tiles[i]
            break
          }
        }
      }
      return tile
    },
    fetchData () {
      this.error = this.tips = null
      this.loading = true
      let brandTipsPromise = ServiceHubAPI.brandTips(this.$store.state.brand.name)
      let brandTipArticlePromise = ServiceHubAPI.brandTipArticle(this.$store.state.brand.name, this.$route.params.category, this.$route.params.id)
      Promise.all([brandTipsPromise, brandTipArticlePromise])
        .then((data) => {
          this.brandTips = data[0]
          this.article = data[1]
          this.loading = false
        }).catch((err) => {
          this.error = err
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss">
/* styles for xs screens go here */
l.list-item-heading {
  font-size: 18px;
  font-weight: bold;
}
li.list-item-bullet {
  font-size: 16px;
  padding-bottom: 10px;
}
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
