import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import fetchCryptoMock from './mock'
Vue.use(Vuex)

const options = {
  headers: {
    'X-CMC_PRO_API_KEY': '999cc9fb-efbe-47fe-9292-c05ca05e6965',
  },
}

const state = {
  cryptoСurrencyItems: [],
  loading: true,
}

const mutations = {
  UPDATE_CRYPTO_CURRENCY_ITEMS(state, payload) {
    state.cryptoСurrencyItems = state.cryptoСurrencyItems.length
      ? state.cryptoСurrencyItems.concat(payload)
      : payload
  },
  UPDATE_LOADING(state, payload) {
    state.loading = payload
  },
}
const CORS = 'https://cors-anywhere.herokuapp.com/'
export const LIMIT = 15
const MOCK = false
const actions = {
  fetchCrypto({ commit }, { currency, page = 1 }) {
    const start = (page - 1) * LIMIT + 1

    commit('UPDATE_LOADING', true)
    if (MOCK) {
      commit('UPDATE_CRYPTO_CURRENCY_ITEMS', fetchCryptoMock(page))
      return commit('UPDATE_LOADING', false)
    }

    axios
      .get(
        `${CORS}https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&limit=${LIMIT}&convert=${currency}`,
        options,
      )
      .then(response => {
        commit('UPDATE_CRYPTO_CURRENCY_ITEMS', response.data.data)
        commit('UPDATE_LOADING', false)
      })
  },
}

const getters = {
  cryptoСurrencyItems: state => state.cryptoСurrencyItems,
  loading: state => state.loading,
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
