<template>
  <div class="homePage">
    <h1>Welcome to Car-Dealership</h1>
    <p>
      Hello, in our website here you can upload your car for sale for FREE.
      Without any limits.
    </p>
    <p>In out website car dealer available cars {{ cars.length }}</p>
  </div>
  <section class="pictures">
    <img src="../src/assets/first.jpg" alt="" />
    <img src="../src/assets/second.jpg" alt="" />
    <img src="../src/assets/third.jpg" alt="" />
  </section>
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
.homePage {
  padding: 1.5rem;
}
.homePage h1 {
  font-size: 2.1rem;
  padding-bottom: 10px;
}
.homePage p {
  font-size: 1.4rem;
}
.pictures {
  padding: 1rem;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.pictures img {
  width: 600px;
}
</style>
