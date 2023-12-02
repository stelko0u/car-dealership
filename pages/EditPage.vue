<template>
  <div class="container">
    <form @submit.prevent="addCar" class="formBox" v-if="carDataLoaded">
      <h1>Edit Car</h1>
      <span>
        <label for="model">Brand:</label>
        <input type="text" id="brand" v-model="car.brand" required />
      </span>

      <span>
        <label for="model">Model:</label>
        <input type="text" id="model" v-model="car.model" required />
      </span>
      <span>
        <label for="year">Year:</label>
        <input type="number" id="year" v-model="car.year" required />
      </span>
      <span>
        <label for="color">Color:</label>
        <input type="text" id="color" v-model="car.color" required />
      </span>
      <span>
        <label for="engine">Engine:</label>
        <input type="text" id="engine" v-model="car.engine" required />
      </span>
      <span>
        <label for="price">Gearbox:</label>
        <input type="text" id="gearbox" v-model="car.gearbox" required />
      </span>
      <span>
        <label for="price">Price:</label>
        <input type="number" id="price" v-model="car.price" required />
      </span>

      <button type="submit" :disabled="!isFormValid()" @click="updateCar">
        Edit Car
      </button>
    </form>
    <div v-else>loading..</div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';

const auth = getAuth();
const user = auth.currentUser;
const db = getDatabase();

export default {
  data() {
    return {
      car: {
        brand: '',
        model: '',
        year: null,
        color: '',
        engine: '',
        price: null,
        gearbox: '',
      },
      isLoadingCar: false,
      carDataLoaded: false,
    };
  },
  created() {
    const url = window.location.href;
    const carId = url.split('/').slice(-1)[0];
    const carRef = ref(db, `cars/${carId}`);
    this.carId = carId;

    onAuthStateChanged(auth, (newUser) => {
      this.user = newUser;
    });

    get(carRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.car.brand = snapshot.val().brand;
          this.car.model = snapshot.val().model;
          this.car.year = snapshot.val().year;
          this.car.color = snapshot.val().color;
          this.car.engine = snapshot.val().engine;
          this.car.price = snapshot.val().price;
          this.car.gearbox = snapshot.val().gearbox;
          this.carDataLoaded = true;
        } else {
          this.hasCarError = true;
        }
      })
      .catch(() => {
        this.hasCarError = true;
      })
      .finally(() => {
        this.isLoadingCar = false;
      });
  },

  methods: {
    async updateCar() {
      try {
        if (!user) {
          console.error('User not logged in!');
          return;
        }
        const carId = this.carId;
        const carRef = ref(db, `cars/${carId}`);
        const carData = {
          brand: this.car.brand,
          model: this.car.model,
          year: this.car.year,
          color: this.car.color,
          engine: this.car.engine,
          price: this.car.price,
          gearbox: this.car.gearbox,
          owner: user.email,
        };
        await set(carRef, carData);

        console.log('Car updated successfully!');
        this.$router.push('/');
      } catch (error) {
        console.error('Error updating car', error);
      }
    },
    isFormValid() {
      return Object.values(this.car).every(
        (value) => value !== null && value !== ''
      );
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

.formBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1.25rem;
  box-shadow: #000 1px 1px 10px;
  border-radius: 6px;
}
.formBox h2 {
  font-size: 36px;
  padding-bottom: 15px;
}
.formBox span {
  display: flex;
  flex-direction: column;
  font-size: 20px;
  padding-bottom: 10px;
  justify-content: start;
}
.formBox span label {
  text-align: left;
}
.formBox input {
  font-size: 24px;
  padding: 0.15rem 0.25rem;
}
.formBox button {
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
.formBox button:hover {
  background-color: #992943;
}
.formBox button:disabled {
  background-color: #ca798c;
  cursor: not-allowed;
}
</style>
