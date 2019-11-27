<template>
  <div v-bind:id="category" class="col-xl-4 col-lg-4 col-md-4 col-xs-12 pb-2">
    <button class="collapsible tips-image-container" v-on:click="toggleDetails()">
      <div class="coupon-text-container">
        <img class="tip-image" width="200" height="200" v-bind:src="imageUrl">
        <div class="tips-heading">{{ headline }}&nbsp;<span class="tips-get-details"><i class="fa fa-chevron-down"></i></span></div>
      </div>
    </button>
    <div class="content" v-show="showDetails">
      <div class="tips-list">
        <template v-for="article in articles">
          <div v-bind:key="articleKey(article.id)" class="list-item">
            <router-link class="article-link" v-bind:to="{ name: 'article', params: { category: category, id: article.id } }" v-html="article.title">
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { DataCache } from '@/utils/data-cache.js'
export default {
  name: 'TipTile',
  props: {
    category: String,
    imageUrl: String,
    headline: String,
    articles: Array
  },
  data: function () {
    return {
      showDetails: false
    }
  },
  computed: {
    cacheKey: function () {
      return `${this.name}-${this.category}`
    }
  },
  methods: {
    articleKey: function (id) {
      return `${this.category}-${id}`
    },
    toggleDetails: function () {
      this.showDetails = !this.showDetails
      const action = this.showDetails ? 'show' : 'hide'
      this.$ga.event('tile', action, this.category)
      DataCache.save(this.cacheKey, this.showDetails)
    }
  },
  mounted: function () {
    this.showDetails = DataCache.get(this.cacheKey, { default: false })
  }
}
</script>

<style scoped lang="scss">
/* styles for xs screens go here */

/* Tips image button hover style */
.tips-image-container:hover {opacity: 0.9}

/* Tips Image Overlay Styles */
.coupon-text-container {
  position: relative;
  text-align: center;
  color: white;
}
.tips-heading {
  font-size: 16px;
  line-height: 18px;
  position: absolute;
  bottom: 8px;
  left: 16px;
}
.tips-get-details {
  font-size: 16px;
  line-height: 16px;
}

/*Tips Image Styles*/
.tips-image-container {
  width: 100%;
  border:1px solid #ccc;
  box-shadow:0px 2px 5px 0px rgba(0,0,0,0.26);
  margin:10px 1%;
  padding: 10px 10px 10px 10px;
  overflow: auto;
  background-color: white;
  box-sizing: border-box;
}
.image-container {
  height: 100%;
  width: auto;
  position:relative;
  overflow:hidden;
  padding: 0px;
}

/* Collapsible Content */
.collapsible {
  background-color: white;
  width: 200px;
  color: white;
  cursor: pointer;
  padding: 0px;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}
.active, .collapsible:hover {
  background-color: #ffffff;
}
.content {
  padding: 0 2px;
  width: 200px;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
}
.list-item {
  font-size: 12px;
  line-height: 12px;
  padding: 6px;
  text-align: left;
}
.article-link {
  color:#000000;
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
