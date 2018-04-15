import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Add from '@/components/Add'
import Browse from '@/components/Browse'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Vocab from '@/components/Vocab'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/browse',
      name: 'Browse',
      component: Browse
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/vocabulary',
      name: 'Vocabulary',
      component: Vocab
    }
  ]
})
