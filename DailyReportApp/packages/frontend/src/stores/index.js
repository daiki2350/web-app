import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Auth from '../api/auth.js'

export const useReportStore = defineStore('myreport', {
 state: () => ({
    auth: {
      token: null,
      userId: null
    },
    Info: {
      id: null,
      name: null,
      amount: null,
      listId: null
    },
    InfoList: {
      name: null,
      items: []
    }
 }),
 getters: {

 },
 actions: {
  login: ({commit}) => {
    throw new Error('login action should be implemented')
  },
  async login (authInfo) {
    try {
      const response = await Auth.login(authInfo);
      this.token = response.token
      this.userId = response.userId
      console.log(this.token)
      console.log(this.userId)
      return this.userId
    } catch(err){
      throw err
    }
  },
  logout: ({commit}) => {
    throw new Error('logout action should be implemented')
  },
  async register (authInfo) {
    try{
      const response = await Auth.register(authInfo)
      const data = response.data
      console.log(data)
      return data
    } catch(err){
      throw err
    } 
  }
 }
})
