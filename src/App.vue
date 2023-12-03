<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
//import { useUserStore } from './store/userStore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// const auth = getAuth();

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
