import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import EditForm from '../views/EditForm.vue';
import Analytics from '../views/Analytics.vue';
import Users from '../views/Users.vue';
import Login from '../views/Login.vue';
import { authService } from '../services/authService';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { public: true }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAdmin: true }
  },
  {
    path: '/edit/:id',
    name: 'EditForm',
    component: EditForm,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();
  const isPublic = to.matched.some(record => record.meta.public);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (!isPublic && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/');
  } else if (requiresAdmin && (!user || user.admin !== true)) {
    next('/');
  } else {
    next();
  }
});

export default router;
