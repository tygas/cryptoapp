<template>
  <div class="">
    <table class="table">
      <thead>
        <tr class="listheader">
          <th width="50" class="listheader__el first logo"></th>
          <th
            class="listheader__el listheader__el--name"
            @click="filterByName()"
          >
            Name
          </th>
          <th class="listheader__el unnecessary" @click="filterByPrice()">
            Price
          </th>
          <th class="listheader__el unnecessary" @click="filterByVolume()">
            Volume
          </th>

          <th class="listheader__el last" @click="filterBy24h()">
            <i class="fas fa-percent fa-xs"></i> 24h
          </th>
        </tr>
      </thead>
      <tbody>
        <CryptoListItem
          v-for="[number, CryptoItem] in CryptoItems.entries()"
          :key="CryptoItem.id"
          :cryptoItem="CryptoItem"
          :number="number"
          on
          :currency="currency"
        />
      </tbody>
    </table>
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
.table {
  border-collapse: collapse;
  width: 100%;

  thead {
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
  }
  th {
    background: #fff;
    position: sticky;
    animation: 3s linear 1s infinite alternate slidein;
    top: 0; /* Don't forget this, required for the stickiness */
    z-index: 1;
  }
}
.listheader {
  border-bottom: 1px solid #ccc;
  list-style: none;
  margin: 0;
  padding: 8px 15px;
  width: 100%;

  &__el {
    font-weight: bold;
    text-align: center;
    font-size: 20px;
    color: #bbb;
    padding: 10px;
    cursor: pointer;

    &:hover {
      color: #999;

      span {
        display: block;
      }
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
  content: '  🚀 ';
  display: block;
  width: 40px;
  height: 40px;
  margin: 8px;
  padding: 3px;
  border-radius: 50%;
  border: 4px solid #eee;
  border-color: #eee transparent #eee transparent;
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
