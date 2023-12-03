<template>
  <div class="container">
    <div v-if="!user">Loading...</div>

    <div class="user-info" v-else>
      <h2>User information</h2>
      <p>Email: {{ user.email }}</p>
      <p>Created at: {{ user.metadata.creationTime }}</p>
      <p>Last sign at: {{ user.metadata.lastSignInTime }}</p>
      <p></p>
    </div>

    <div class="user-cars">
      <h2>Your Cars</h2>
      <div v-if="cars.length > 0">
        <div v-for="car in cars" :key="car.id" class="car-item">
          <p>Brand: {{ car.brand }}</p>
          <p>Model: {{ car.model }}</p>
          <p>Year: {{ car.year }}</p>
        </div>
      </div>
      <div v-else>
        <p>You don't have cars. :(</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';

const auth = getAuth();
const db = getDatabase();

export default {
  data() {
    return {
      user: undefined,
      cars: [],
    };
  },
  mounted() {
    onAuthStateChanged(auth, (newUser) => {
      this.user = newUser;
      console.log(newUser);

      if (this.user) {
        this.loadUserCars(this.user.email);
      }
    });
  },
  computed: {
    isLoggedIn: function () {
      return !!this.user;
    },
  },
  methods: {
    loadUserCars(userId) {
      const carsRef = dbRef(db, `cars`);
      onValue(carsRef, (snapshot) => {
        const cars = [];
        snapshot.forEach((childSnapshot) => {
          const car = childSnapshot.val();
          if (car.owner === userId) {
            cars.push({ id: childSnapshot.key, ...car });
          }
        });
        this.cars = cars;
      });
    },
  },
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: auto;
}

.user-info,
.user-cars {
  margin-bottom: 20px;
}

.car-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
