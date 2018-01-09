import Vue from 'vue';
import Vuex from 'vuex';
import config from 'config';
import moment from 'moment';
import _ from 'lodash';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    data: null
  },
  getters: {
    data: state => state.data,
    last: state => n => _.takeRight(state.data, n),
    timeBlocks: state => {
      return state.data && state.data.length
        ? state.data[0].lines.map(l => l.time)
        : null;
    }
  },
  mutations: {
    SET_DATA: (state, data) => {

      // parse tsv data
      const lines = data.split('\n');
      const dates = lines.shift().replace('\r', '').split('\t');
      const days = lines.shift().replace('\r', '').split('\t');
      const trainingFocus = lines.shift().replace('\r', '').split('\t');
      const overnightNotes = lines.shift().replace('\r', '').split('\t');
      dates.shift();
      days.shift();
      trainingFocus.shift();
      overnightNotes.shift();
      const parsedLines = lines.map(l => l.split('\t'));
      const getTimeline = (dayNumber, dateStr) => {

        return parsedLines.map(l => {
          // first index is the time of day
          return {
            time: moment(`${dateStr} ${l[0]}`, 'DD/MM hh:mm'),
            events: l[dayNumber].replace('\r', '').split(',').filter(elm => !!elm.length)
          };
        })
      };

      const parsedData = dates.map((dateStr, i) => {
        const m = moment(dateStr, 'DD/MM');
        const dayNumber = Number.parseInt(days[i]);
        return {
          date: m,
          day: dayNumber,
          trainingFocus: trainingFocus[i].replace(/"/g, '').split(',').filter(elm => !!elm.length),
          overnightNotes: overnightNotes[i].replace(/"/g, '').split(',').filter(elm => !!elm.length),
          lines: getTimeline(dayNumber, dateStr)
        };
      });

      state.data = parsedData;
    }
  },
  actions: {
    fetchData: ({ commit }) => {
      Vue.axios.get(config.sheetUrl).then((response) => {
        commit('SET_DATA', response.data);
      });
    }
  }
});
