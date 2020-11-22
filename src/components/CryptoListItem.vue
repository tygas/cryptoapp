<template>
  <div>
    <li class="cryptoitem">
      <div class="cryptoitem__feature logo">
        <img
            class="coin-face"
            :src="
            'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
              cryptoItem.id +
              '.png'
          "
        />
      </div>
      <div class="cryptoitem__feature name">{{ cryptoItem.name }}</div>

      <div class="cryptoitem__feature price unnecessary volume">
        {{ parsePrice(cryptoItem.quote[currency].price) }}
      </div>
      <div class="cryptoitem__feature unnecessary volume">
        <span>{{ parsePrice(shortenLargeNumber(cryptoItem.quote[currency].volume_24h)) }}</span>
      </div>

      <div
          class="cryptoitem__feature 24h last "
          :class="isNegOrPos(cryptoItem.quote[currency].percent_change_24h)"
      >
        <div :class="Math.abs(cryptoItem.quote[currency].percent_change_24h) > 5 ? 'pulse':''">
          {{ cryptoItem.quote[currency].percent_change_24h > 0 ? '+':'' }}
          {{ (cryptoItem.quote[currency].percent_change_24h.toFixed(1)) }}

          <small>% </small>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import {shortenLargeNumber} from '../utils'

export default {
  name: 'CryptoListItem',
  props: ['cryptoItem', 'number', 'currency'],
  methods: {
    shortenLargeNumber,
    isNegOrPos(percent) {
      if (percent >= 0) {
        return 'pos'
      } else {
        return 'neg'
      }
    },
    parsePrice(price) {
      return price.toLocaleString('en-US', {
        style: 'currency',
        currency: this.currency,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.cryptoitem {
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
  border-bottom: 1px solid #ccc;
  height: 30px;
  width: 100%;
  align-items: center;
  background-color: #fff;

  .logo {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;
    margin: 3px 0 0 10px;
    animation: spin 3s cubic-bezier(0.3, 2, 0.4, 0.8) infinite both;
    transform-style: preserve-3d;
    vertical-align: middle;

    @keyframes spin {
      0%,
      10% {
        transform: rotate(-10deg) perspective(400px);
      }
      90%,
      100% {
        transform: rotate(-10deg) perspective(400px) rotateY(180deg);
      }
    }

    .coin-face {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      border-radius: 50%;
      width: 100%;
      height: 100%;

      &:nth-child(1) {
        transform: translateZ(-0.2em) rotateY(-180deg);
      }

      &:nth-child(2) {
        transform: translateZ(-0.1em);
      }

      &:nth-child(4) {
        transform: translateZ(0.1em);
      }

      &:nth-child(5) {
        transform: translateZ(0.2em);
      }
    }
  }

  &__feature {
    width: 15%;

    &.volume {
      text-align: center;
    }
    &.last {
      text-align: center;
    }
  }

  &__link {
    display: flex;
    width: 100%;
    text-decoration: none;
    height: 100%;
    justify-content: space-between;
    color: #000;
    transition: 0.2s;
  }

  &__link:hover {
    background-color: #ccc;
  }
}

.first {
  width: fit-content;
  min-width: 50px;
  padding-right: 5px;
}

.last {
  width: fit-content;
}

.name,
.price {
  font-weight: bold;
}

.neg {
  color: #ff0000;
}

.pos {
  color: #00ff00;
}

@media (max-width: 500px) {
  .unnecessary {
    display: none;
  }
  .cryptoitem__feature {
    width: 33%;
  }
  .number {
    width: 5%;
  }
}

@media (min-width: 1300px) {
  .last {
    padding-right: 35px;
  }
}
</style>
