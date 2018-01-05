<template>
  <div id='app'>
    <h1>Ted's Poop Diary</h1>
    <a href="https://docs.google.com/spreadsheets/d/1o7AiX8nPx9RT5ihuDEZSAdwKHaiABS0ivui3mjd2ng0/edit#gid=0" target="_blank">Edit the sheet</a> <a href='#now'>Jump to now</a>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
