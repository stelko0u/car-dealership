<template>
  <div v-if="isLoadingCar">Loading</div>
  <div v-else-if="hasCarError">Has car error</div>
  <div v-else-if="!car">No car</div>
  <div class="detailsPage" v-else>
    <h1>{{ car.brand }} {{ car.model }}</h1>
    <h2>Year: {{ car.year }}</h2>
    <h2>Color: {{ car.color }}</h2>
    <h2>Engine: {{ car.engine }}</h2>
    <h2>Gearbox: {{ car.gearbox }}</h2>
    <h2>Price: {{ car.price }}$</h2>
    <span v-if="isUserOwner" class="operationBtns">
      <router-link class="edit" :to="`/catalog/edit/${carId}`"
        >Edit</router-link
      >
      <router-link class="delete" :to="`/catalog/delete/${carId}`"
        >Delete</router-link
      >
    </span>
  </div>
</template>

<script>
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

export default {
  data() {
    return {
      car: undefined,
      isLoadingCar: false,
      hasCarError: false,
      user: undefined,
      carId: undefined,
    };
  },

  mounted() {
    const url = window.location.href;
    const carId = url.split('/').slice(-1)[0];
    const db = getDatabase();
    const carRef = ref(db, `cars/${carId}`);
    this.carId = carId;
    

    onAuthStateChanged(auth, (newUser) => {
      this.user = newUser;
    });

    this.isLoadingCar = true;
    get(carRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.car = snapshot.val();
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

  computed: {
    isUserOwner: function () {
      if (!this.user) {
        return false;
      }

      if (!this.car) {
        return false;
      }

      return this.user.email === this.car.owner;
    },
  },
};
</script>

<style scoped>
.detailsPage {
  padding: 2rem;
}
.operationBtns {
  display: flex;
  padding-top: 30px;
  gap: 20px;
}
.operationBtns a {
  text-decoration: none;
  color: #fff;
  padding: 5px 20px;
  font-size: 18px;
  border-radius: 2px;
  box-shadow: 0 0 10px 0px #000;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.edit {
  background-color: orange;
}
.delete {
  background-color: rgb(212, 85, 85);
}
</style>
