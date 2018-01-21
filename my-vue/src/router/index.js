import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import session from '@/plugins/session'

import login from '@/components/login/login'


import container from '@/components/container/container'
import showAdmin from '@/components/container/showAdmin'
import addAdmin from '@/components/container/addAdmin'
import updatePass from '@/components/container/updatePass'

import showlevel from '@/components/container/showlevel'
import addlevel from '@/components/container/addlevel'
import editlevel from '@/components/container/editlevel'

import showrole from '@/components/container/showrole'
import addrole from '@/components/container/addrole'
import editrole from '@/components/container/editrole'


import showUser from '@/components/container/showUser'
import addUser from '@/components/container/addUser'
import updateUser from '@/components/container/updateUser'


import addPart from '@/components/container/addPart'
import showPart from '@/components/container/showPart'
import updatePart from '@/components/container/updatePart'


 Vue.use(Router)


var obj = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
      {
          path: '/login',
          name: 'login',
          component: login
      },
      // {
      //     path: '*',
      //     component: login
      // },
      {
        path:'/container',
          name:'container',
          component:container,
          children:[
              {
                path:"/showAdmin",
                component:showAdmin
              },
              {
                  path:"/addAdmin",
                  component:addAdmin
              },
              {
                  path:"/updatePass",
                  component:updatePass
              },




              {
                  path:"/showrole",
                  component:showrole
              },
              {
                  path:"/addrole",
                  component:addrole
              },
              {
                  path:"/editrole",
                  component:editrole
              },



              {
                  path:"/showlevel",
                  component:showlevel
              },
              {
                  path:"/addlevel",
                  component:addlevel
              },
              {
                  path:"/editlevel",
                  component:editlevel
              },



              {
                  path:"/showUser",
                  component:showUser
              },
              {
                  path:"/addUser",
                  component:addUser
              },
              {
                  path:"/updateUser",
                  component:updateUser
              },


              {
                  path:"/showPart",
                  component:showPart
              },
              {
                  path:"/addPart",
                  component:addPart
              },
              {
                  path:"/updatePart",
                  component:updatePart
              },

          ]
      }
  ]
})
obj.beforeEach(function(to,from,next){
  if(to.path=="/login"){
    next();
  }else{
      if(sessionStorage.getItem("login")){
        next()
      }else{
        next("/login")
      }
  }
  })

export default obj;
