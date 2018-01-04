<template>
  <div class='timeline'>
    <div class='timeline__day' v-for='d in data' :key='d.day'>
      <h1>{{ d.day }}</h1>
      <div class='timeline__notes'>
        <span class='tag' v-for='tag in d.overnightNotes'>{{ tag }}</span>
      </div>
      <div class='timeline__notes'>
        <span class='tag' v-for='tag in d.trainingFocus'>{{ tag }}</span>
      </div>
      <div v-bind:class='{
        "timeline__block": true,
        "timeline__block--active": l.events.length
        }' v-for='l in d.lines'>
        <p v-if='l.events.length'>{{ formatDate(l.time) }}</p>
        <div v-bind:class='["timeline__event timeline__event--" + e]' v-for='e in l.events'>{{ e }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  components: {},
  computed: {
    ...mapGetters([
      'data'
    ])
  },
  methods: {
    ...mapActions([
      'fetchData'
    ]),
    formatDate: dateStr => {
      return moment(dateStr).format('hh:mm');
    }
  }
}
</script>

<style scoped lang="scss">
.timeline {
  display: flex;
  align-items: flex-start;
}
.timeline__day {
  width: 100%;
  margin: 0 10px;
}
.timeline__block {
  height: 100px;
  margin: 10px;
  border: 1px dashed rgba(0, 0, 255, 0.1);

  > p {
    margin: 0;
  }
}
.timeline__block--active {
}
.timeline__notes {
  height: 50px;
}
.timeline__event {

}
.timeline__event--poo {
  background: brown;
  color: white;
}
.timeline__event--wee {
  background: yellow;
  color: black;
}
.timeline__event--meal {
  background: blue;
  color: white;
}
.tag {
  padding: 3px;
  margin: 5px;
  background: white;
}
</style>
