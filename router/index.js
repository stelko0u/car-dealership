import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import AddCarPage from '../pages/AddCarPage.vue';
import CarListPage from '../pages/CarListPage.vue';
import CarDetails from '../pages/CarDetails.vue';
import EditPage from '../pages/EditPage.vue';
import DeletePage from '../pages/DeletePage.vue';
import ContactPage from '../pages/ContactPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import MyProfile from '../pages/MyProfile.vue';
import NotFound from '../pages/NotFound.vue';

import { createRouter, createWebHistory } from 'vue-router';
import { getDatabase, get, ref } from 'firebase/database';

const auth = getAuth();
let user = null;

const handleAuthStateChange = (newUser) => {
  user = newUser;
};

// Initialize authentication state
onAuthStateChanged(auth, handleAuthStateChange);

export const getCurrentUser = () => {
  return user;
};

const isAuthenticated = () => {
  const auth = getAuth();

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(!!user);
      unsubscribe();
    });
  });
};

const isOwner = async (carId) => {
  const auth = getAuth();
  const user = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      resolve(newUser);
      unsubscribe();
    });
  });

  if (!user) {
    return false;
  }

  const db = getDatabase();
  const carRef = ref(db, `cars/${carId}`);

  try {
    const snapshot = await get(carRef);
    if (snapshot.exists()) {
      const car = snapshot.val();
      return car.owner == user.currentUser.email;
    } else {
      return true;
    }
  } catch (error) {
    return true;
  }
};

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactPage,
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    beforeEnter: async (to, from, next) => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    beforeEnter: async (to, from, next) => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        next();
      } else {
        next('/');
      }
    },
  },

  {
    path: '/add-car',
    name: 'AddCarPage',
    component: AddCarPage,
    beforeEnter: async (to, from, next) => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/profile',
    name: 'MyProfile',
    component: MyProfile,
    beforeEnter: async (to, from, next) => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/catalog',
    name: 'CarListPage',
    component: CarListPage,
  },
  {
    path: '/catalog/:id',
    name: 'CarDetailsPage',
    component: CarDetails,
  },
  {
    path: '/catalog/edit/:id',
    name: 'EditPage',
    component: EditPage,
    beforeEnter: async (to, from, next) => {
      const carId = to.params.id;
      const carIsOwner = await isOwner(carId);
      if (carIsOwner) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/catalog/delete/:id',
    name: 'DeletePage',
    component: DeletePage,
    beforeEnter: async (to, from, next) => {
      const carId = to.params.id;
      const carIsOwner = await isOwner(carId);
      if (carIsOwner) {
        next();
      } else {
        next('/');
      }
    },
  },
];

// path: '/car-list', name: 'CarList', component: CarList },
//   { path: '/car-details/:id', name: 'CarDetails', component: CarDetails },

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
