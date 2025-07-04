import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Admin from '../views/Admin.vue'
import AdminProducts from '../views/AdminProducts.vue'
import AdminCategories from '../views/AdminCategories.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/produtos',
    name: 'Products',
    component: Products
  },
  {
    path: '/produto/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/sobre',
    name: 'About',
    component: About
  },
  {
    path: '/contato',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/produtos',
    name: 'AdminProducts',
    component: AdminProducts
  },
  {
    path: '/admin/categorias',
    name: 'AdminCategories',
    component: AdminCategories
  }
]

const router = createRouter({
  history: createWebHistory('/bazar/'),
  routes
})

export default router
