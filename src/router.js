import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/views/Landing.vue'
import Dashboard from '@/views/Dashboard.vue'
import Grades from '@/views/Grades.vue'
import Notes from '@/views/Notes.vue'
import Profile from '@/views/Profile.vue'
import Register from '@/views/Register.vue'
import Access from '@/views/Access.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('isStudentLoggedIn') === 'false') {
          next()
        } else {
          next('/banco')
        }
      }
    },
    {
      path: '/banco',
      name: 'banco',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('isStudentLoggedIn') === 'true') {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/voti',
      name: 'voti',
      component: Grades,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('isStudentLoggedIn') === 'true') {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/agenda',
      name: 'agenda',
      component: Notes,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('isStudentLoggedIn') === 'true') {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/profilo',
      name: 'profilo',
      component: Profile,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('isStudentLoggedIn') === 'true') {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/registrazione',
      name: 'registrazione',
      component: Register,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('isStudentLoggedIn') === 'false') {
          next()
        } else {
          next('/banco')
        }
      }
    },
    {
      path: '/accesso',
      name: 'accesso',
      component: Access,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('isStudentLoggedIn') === 'false') {
          next()
        } else {
          next('/banco')
        }
      }
    },
    {
      path: '*',
      name: 'errore',
      beforeEnter: (to, from, next) => {
        next('/')
      }
    }
  ]
})
