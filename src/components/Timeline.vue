<template>
  <div class='timeline'>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
    ])
  }
}
</script>

<style scoped>
.timeline {}
</style>
