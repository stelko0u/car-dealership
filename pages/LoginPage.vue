<template>
  <div class="container">
    <div class="login-form">
      <form @submit.prevent="login">
        <h2>Login</h2>
        <span>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Email"
            class="effect-4"
          />
          <span class="focus-border"></span>
        </span>
        <span>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Password"
          />
        </span>
        <div class="message">
          <p>Not a member?</p>
          <router-link to="/register">Register</router-link>
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error" style="color: red">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { signIn } from '../firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        await signIn(this.email, this.password);
        this.$router.push('/');
      } catch (error) {
        console.error('Error:', error.message);
        this.error = 'Error!';
      }
    },
    applyBorder() {
      this.$refs.emailInput.classList.add('focused');
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1.25rem;
  box-shadow: #000 1px 2px 15px;
  border-radius: 10px;
}
.login-form h2 {
  font-size: 36px;
  padding-bottom: 15px;
}
.login-form span {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  padding-bottom: 10px;
}
.login-form input {
  font-size: 24px;
  padding: 0.15rem 0.25rem;
  border: none;
  outline: none;
  border-bottom: 2px solid transparent; 
  transition: border-bottom 0.3s ease; 
}

.login-form input:focus {
  border-bottom: 2px solid #be3455; 
}

.login-form button {
  background-color: #be3455;
  font-size: 24px;
  color: #fff;
  padding: 0.25rem 1rem;
  border: 0;
  outline: none;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;
}
.login-form button:hover {
  background-color: #992943;
}

.login-form .message {
  display: flex;
  justify-content: center;
  gap: 10px;
  font-weight: 900;
}
.login-form .message p {
  font-size: 20px;
}
.login-form .message a {
  text-decoration: none;
  font-size: 20px;
  color: #be3455;
}
</style>
