<template>
  <div class="homePage">
    <h1>Welcome to Car-Dealership</h1>
    <p>
      We are your place for the best cars. Check out our wide assortment of new
      and used cars from leading manufacturers.
    </p>
    <p>Available cars now {{ cars.length }}</p>
  </div>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';

export default {
  data() {
    return {
      cars: [],
    };
  },

  created() {
    const db = getDatabase();
    const starCountRef = ref(db, 'cars');
    onValue(starCountRef, (snapshot) => {
      if (snapshot.val() != null) {
        const data = Object.entries(snapshot.val());
        this.cars = data;
      }
    });
  },
};
</script>

<style scoped>
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
