<template>
  <div class="container">
    <div class="register-form">
      <form @submit.prevent="register">
        <h2>Register</h2>
        <span>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Email"
          />
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
        <span>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            placeholder="Repeat password"
          />
        </span>
        <button type="submit">Register</button>
      </form>

      <div class="message" v-if="error" style="color: red">
        <p>{{ error }}</p>
      </div>

      <div class="message">
        <p>Already a member?</p>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
    };
  },
  methods: {
    async register() {
      const auth = getAuth();

      // Check if passwords match
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords don't match!";
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        console.log('User registered:', user);
        this.$router.push('/');
      } catch (error) {
        console.error('Error registering user:', error.message);
        this.error = error.message;
      }
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
.register-form {
  box-shadow: #000 1px 2px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 10px;
  padding: 1.25rem;
}
.register-form h2 {
  font-size: 36px;
  padding-bottom: 15px;
}
.register-form span {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  padding-bottom: 10px;
}
.register-form input {
  font-size: 24px;
  padding: 0.15rem 0.25rem;
  border: none;
  outline: none;
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.3s ease;
}

.register-form input:focus {
  border-bottom: 2px solid #be3455;
}
.register-form button {
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
.register-form button:hover {
  background-color: #992943;
}
.register-form .message {
  display: flex;
  justify-content: center;
  gap: 10px;
  font-weight: 900;
}
.register-form button:disabled {
  background-color: #ca798c;
  cursor: not-allowed;
}
.register-form .message p {
  font-size: 20px;
}
.register-form .message a {
  text-decoration: none;
  font-size: 20px;
  color: #be3455;
}
</style>
