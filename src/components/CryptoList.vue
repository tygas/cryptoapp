<template>
  <div class="">
    <ul class="listheader">
      <li class="listheader__el first logo"></li>
      <li class="listheader__el listheader__el--name" @click="filterByName()">
        Name
      </li>
      <li class="listheader__el unnecessary" @click="filterByPrice()">
        Price
      </li>
      <li class="listheader__el unnecessary" @click="filterByVolume()">
        Volume
      </li>

      <li class="listheader__el last" @click="filterBy24h()">
        <i class="fas fa-percent fa-xs"></i> 24h
      </li>
    </ul>
    <CryptoListItem
      v-for="[number, CryptoItem] in CryptoItems.entries()"
      :key="CryptoItem.id"
      :cryptoItem="CryptoItem"
      :number="number"
      :currency="currency"
    />
    <transition name="fade">
      <div v-if="loading" class="lds-dual-ring"></div>
    </transition>
  </div>
</template>

<script>
import CryptoListItem from '@/components/CryptoListItem'

export default {
  name: 'CryptoList',
  props: ['currency'],
  components: {
    CryptoListItem,
  },
  data() {
    return {
      page: 1,
    }
  },

  computed: {
    CryptoItems: {
      get() {
        return this.$store.getters.cryptoСurrencyItems
      },
      set(items) {
        this.$store.commit('UPDATE_CRYPTO_CURRENCY_ITEMS', items)
      },
    },
    loading() {
      return this.$store.getters.loading
    },
  },
  watch: {
    currency() {
      this.$store.dispatch('fetchCrypto', { currency: this.currency })
    },
  },

  methods: {
    parsePrice(price) {
      price = parseFloat(price)
      return price.toLocaleString('en-US', {
        style: 'currency',
        currency: this.currency,
      })
    },
    filterByPrice() {
      this.CryptoItems = this.CryptoItems.sort(
        (item1, item2) =>
          item2.quote[this.currency].price - item1.quote[this.currency].price,
      )
    },
    filterByVolume() {
      this.CryptoItems = this.CryptoItems.sort(
        (item1, item2) =>
          item2.quote[this.currency].volume_24h -
          item1.quote[this.currency].volume_24h,
      )
    },

    filterByName() {
      this.CryptoItems = this.CryptoItems.sort((item1, item2) => {
        if (item1.name < item2.name) {
          return -1
        }
        if (item1.name > item2.name) {
          return 1
        }
        return 0
      })
    },

    filterBy24h() {
      this.CryptoItems = this.CryptoItems.sort(
        (item1, item2) =>
          item2.quote[this.currency].percent_change_24h -
          item1.quote[this.currency].percent_change_24h,
      )
    },
  },
}
</script>

<style scoped lang="scss">
.listheader {
  display: flex;
  width: 100%;
  list-style: none;
  padding: 8px 15px;
  border-bottom: 1px solid #ccc;
  margin: 0;
  height: fit-content;
  justify-content: space-between;

  &__el {
    width: 15%;
    height: fit-content;
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    color: #bbb;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #eee;
      color: #999;
    }

    &.first {
      width: 30px;
      padding: 10px 0;
    }

    &.last {
      width: fit-content;
    }
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 0 47%;
}

.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #1153fc;
  border-color: #1153fc transparent #1153fc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 500px) {
  .unnecessary {
    display: none;
  }

  .listheader__el {
    width: 70%;

    &.first {
      width: 30px;
    }
    &.last {
      min-width: 30%;
    }
  }
}

.lds-dual-ring {
  margin: 0 35%;
}
</style>
