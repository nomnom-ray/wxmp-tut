import Vue from 'vue'
import App from './tut'

export const quoteBus = new Vue()

const app = new Vue(App)
app.$mount()
