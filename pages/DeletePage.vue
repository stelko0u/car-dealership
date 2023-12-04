<template>
  <div class="container">
    <div class="deleteContainer">
      <div v-if="isLoadingCar">Loading</div>
      <div v-else-if="hasCarError">Has car error</div>
      <div v-else-if="!car">Car Not Found</div>
      <div v-else class="data">
        <h1>Are you sure you want to delete this car?</h1>
        <p>Brand: {{ car.brand }}</p>
        <p>Model: {{ car.model }}</p>
        <p>Year: {{ car.year }}</p>
        <p>Color: {{ car.color }}</p>
        <p>Engine: {{ car.engine }}</p>
        <p>Gearbox: {{ car.gearbox }}</p>
        <p>Price: {{ car.price }}$</p>
        <span class="btns">
          <button type="submit" @click="back" class="back btn">Back</button>
          <button type="submit" @click="deleteCar" class="delete btn">
            Delete
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, remove, get } from 'firebase/database';

const auth = getAuth();
const user = auth.currentUser;
const db = getDatabase();

export default {
  data() {
    return {
      car: undefined,
      isLoadingCar: false,
      carDataLoaded: false,
    };
  },
  mounted() {
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
          console.log(snapshot.val());
          this.car = snapshot.val();

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
    back() {
      this.$router.push(`/catalog/${this.carId}`);
    },
    async deleteCar() {
      try {
        if (!user) {
          console.log(user);
          console.error('User not logged in!');
          return;
        }
        const carId = this.carId;
        const carRef = ref(db, `cars/${carId}`);
        await remove(carRef);

        console.log('Car deleted successfully!');
        this.$router.push('/');
      } catch (error) {
        console.error('Error deleting car', error);
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
.deleteContainer {
  padding: 1.5rem;
  box-shadow: 0 0 10px 2px #000;
  border-radius: 6px;
}
.deleteContainer p {
  font-size: 20px;
}
.data {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.btn {
  outline: none;
  border: none;
  padding: 10px;
  font-size: 16px;
  letter-spacing: 1px;
  transition: 0.5s;
}
.btns {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 10px;
}
.btn:hover {
  filter: brightness(0.8);
  transition: 0.5s;
}
.delete {
  color: #fff;
  background-color: #c72222;
}
.back {
  background-color: #ccc;
}
</style>
