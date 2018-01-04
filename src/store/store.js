import Vue from 'vue';
import Vuex from 'vuex';
import config from 'config';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    data: []
  },
  getters: {
    data: state => state.data
  },
  mutations: {
    SET_DATA: (state, data) => {
      // todo - parse CSV data
      state.data = data;
    }
  },
  actions: {
    fetchData: ({ commit }) => {
      Vue.axios.get(config.sheetUrl).then((response) => {
        console.log(response);
        commit('SET_DATA', response.data);
      });
    }
  }
});
