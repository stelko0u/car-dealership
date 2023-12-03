<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <h1>Car-Dealership</h1>
    </div>
    <div class="navbar-start">
      <router-link class="navbar-item" to="/">Home</router-link>
      <router-link class="navbar-item" to="/about">About</router-link>
      <router-link class="navbar-item" to="/contact">Contact</router-link>
      <router-link class="navbar-item" to="/catalog">Catalog</router-link>

      <router-link v-if="!isLoggedIn" class="navbar-item" to="/login"
        >Login</router-link
      >
      <router-link v-if="!isLoggedIn" class="navbar-item" to="/register"
        >Register</router-link
      >
      <a class="navbar-item" v-if="isLoggedIn" @click="logout"> Logout </a>
      <router-link v-if="isLoggedIn" class="navbar-item" to="/add-car"
        >Add car</router-link
      >
      <router-link v-if="isLoggedIn" class="navbar-item" to="/profile"
        >My profile</router-link
      >
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.$router.push('/');
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user;
    });
  },
};
</script>

<style scoped>
.hide {
  display: none;
}
.show {
  display: block;
}

.navbar {
  background-color: #be3455;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar-brand {
  color: #fff;
  padding: 0 10px;
  font-size: 20px;
}
.navbar-start {
  display: flex;
}
.navbar-item {
  font-size: 24px;
  text-decoration: none;
  padding: 0.75rem;
  color: #fff;
}
.navbar-item:hover {
  background-color: #ad2f4c;
}
</style>
