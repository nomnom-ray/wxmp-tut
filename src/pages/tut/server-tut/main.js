import Vue from 'vue'
import App from './tut'

// a child-child communication method called "Bus"
export const serverBus = new Vue()

const app = new Vue(App)
app.$mount()
