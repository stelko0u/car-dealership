<template>
  <div class="container">
    <div v-if="!user">Loading...</div>

    <div class="user-info" v-else>
      <h1>User information</h1>
      <h4>Email: {{ user.email }}</h4>
      <h4>Created at: {{ user.metadata.creationTime }}</h4>
      <h4>Last sign at: {{ user.metadata.lastSignInTime }}</h4>
      <p></p>
    </div>

    <div class="user-cars">
      <h1>Your Cars</h1>
      <div v-if="cars.length > 0">
        <ul class="car-listing">
          <li v-for="car in cars" :key="car.id">
            <h3>Brand: {{ car.brand }}</h3>
            <h3>Model: {{ car.model }}</h3>
            <h3>Engine: {{ car.enginge }}</h3>

            <h3>Year: {{ car.year }}</h3>
            <router-link :to="`/catalog/${car.id}`">Details</router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <h4>You don't have cars. :(</h4>
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
  width: 100%;
  padding: 2rem;
}

.user-info,
.user-cars {
  margin-bottom: 20px;
}

.car-listing {
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin-bottom: 10px;
  list-style: none;

  flex-wrap: wrap;
  gap: 20px;
}
.car-listing li {
  padding: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 0 10px 2px #ccc;
  border-radius: 6px;
  flex: 0 0 calc(20% - 20px);
}
.car-listing li a {
  padding: 5px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #000;
  width: 100%;
  display: inline-block;
  text-align: center;
  background-color: #ccc;
  border-radius: 4px;
  transition: 0.5s;
  margin-top: 20px;
}
.car-listing li a:hover {
  background-color: #7a7a7a;
  color: #fff;
  transition: 0.5s;
}
</style>
