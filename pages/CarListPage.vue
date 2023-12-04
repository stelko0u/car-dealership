<template>
  <div class="catalog-page">
    <h1>Car List</h1>
    <ul class="listing" v-if="cars.length > 0">
      <li v-for="car in cars" :key="car[0]">
        <p>Brand: {{ car[1].brand }}</p>
        <p>Model: {{ car[1].model }}</p>
        <p>Engine: {{ car[1].engine }}</p>
        <p>Price: {{ car[1].price }}$</p>
        <span class="details_btn">
          <router-link :to="`/catalog/${car[0]}`">Details</router-link>
        </span>
      </li>
    </ul>
    <h2 v-else>No cars available.</h2>
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
.catalog-page {
  padding: 1.75rem;
}
.listing {
  display: flex;
  flex-direction: row;
  gap: 20px;
  list-style: none;
  flex-wrap: wrap;
}
.listing li {
  padding: 1rem;
  box-shadow: 0px 0px 5px 1px #000;
  flex: 0 0 calc(20% - 20px);
}
.listing li p {
  font-size: 26px;
}
h1 {
  padding-bottom: 30px;
}
.details_btn {
  width: 100%;
  display: flex;
  justify-content: end;
  padding-top: 20px;
}
.details_btn a {
  text-decoration: none;
  padding: 5px 15px;
  background-color: #be3455;
  color: #fff;
  border-radius: 2px;
  font-size: 18px;
  transition: 0.5s;
}

.details_btn a:hover {
  background-color: #a02b46;
  transition: 0.5s;
  box-shadow: 0px 0px 5px 1px #000;
}
</style>
