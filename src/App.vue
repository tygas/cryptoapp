<template>
  <main id="app" class="main">
    <div class="">
      <router-view :currency="currency" />
    </div>
  </main>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      search: '',
      currency: 'USD',
      page: 1,
    }
  },
  mounted() {
    this.scroll(this.page)
  },
  created() {
    this.$store.dispatch('fetchCrypto', {
      currency: this.currency,
    })
  },
  watch: {
    currency() {
      this.$store.dispatch('fetchCrypto', { currency: this.currency })
    },
  },
  methods: {
    reachBottom() {
      const { scrollTop, scrollHeight, clientHeight } = this.el
      const bottom = scrollHeight
      const scrollY = scrollTop + clientHeight
      const threshold = 400
      return bottom - scrollY < threshold
    },
    scroll() {
      window.onscroll = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          if (this.reachBottom) {
            this.loadMore()
          }
        }, 200)
      }
    },
    loadMore() {
      this.page = this.page + 1
      this.$store.dispatch('fetchMoreCrypto', {
        currency: this.currency,
        page: this.page,
      })
    },
  },
}
</script>

<style lang="scss">
.infinite-list {
  height: 100%;
  overflow-y: scroll;
}

@import './assets/app';
</style>
