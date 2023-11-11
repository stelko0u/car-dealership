<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <h1>Car-Dealership</h1>
    </div>
    <div class="navbar-start">
      <router-link class="navbar-item" to="/">Home</router-link>
      <router-link class="navbar-item" to="/about">About</router-link>
      <router-link class="navbar-item" to="/contact">Contact</router-link>

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
        // Redirect or handle logout success
      } catch (error) {
        console.error('Error:', error.message);
        // Handle logout error
      }
    },
  },
  created() {
    // Listen for authentication state changes
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // Update isLoggedIn based on whether a user is logged in or not
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
  background-color: #3498db;
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
