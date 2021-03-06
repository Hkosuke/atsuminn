import Vue from 'vue'
import Router from 'vue-router'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Appform from '@/components/Appform'
import Createform from '@/components/Createform'
import hoge from '@/components/hoge'
import Teacher from '@/components/Teacher'
import Top from '@/components/Top'
import firebase from 'firebase'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/Top',
      name: Top,
      component: Top
    },
  	{
  		path: '/',
  		name: 'Appform',
  		component: Appform,
      children: [
        {
          path: '',
          component: Createform
        }
      ],
  		meta: { requiresAuth: true }
  	},
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})
/*
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})
*/

/*
router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  if (requiresAuth) {
    if (!currentUser) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
*/
export default router