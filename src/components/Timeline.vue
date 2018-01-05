<template>
  <div class='timeline'>
    <div class='timeline__day' v-for='d in data' :key='d.day'>
      <h2>day {{ d.day }}</h2>
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
        <p class='timeline__time' v-if='l.events.length'>{{ formatDate(l.time) }}</p>
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
      return moment(dateStr).format('HH:mm');
    }
  }
}
</script>

<style scoped lang="scss">
.timeline {
  display: flex;
  align-items: flex-start;
  margin: 20px auto;
}
.timeline__day {
  width: 100%;
  margin: 0 10px;
}
.timeline__block {
  height: 80px;
  margin: 10px;
  border: 1px dashed rgba(0, 0, 255, 0.1);
  border-radius: 5px;

  > p {
    margin: 0;
  }
}
.timeline__block--active {
  border-color: transparent;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}
.timeline__notes {
  height: 50px;
}
.timeline__event {
  display: inline-block;
  padding: 5px 7px;
}
.timeline__event--poo,
.timeline__event--poo-outside {
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
.timeline__time {
  background: white;
  padding: 5px;
  border-radius: 5px 5px 0 0;
}
.tag {
  padding: 3px 5px;
  margin: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
</style>
