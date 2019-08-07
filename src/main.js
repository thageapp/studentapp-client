import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Tabs, Tab } from 'vue-tabs-component'
import vmodal from 'vue-js-modal'
import vSelect from 'vselect-component'
import moment from 'moment'

// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Global methods
Vue.mixin({
  methods: {
    // Returns the date in international ISO format
    toIsoDate: date => moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    // Format a date to 'Mmm DD, YYYY'
    formatDate: date => {
      const momentDate = moment(date, 'YYYY-MM-DD')
      return `${monthNames[momentDate.month()].slice(0, 3)} ${momentDate.date()}, ${momentDate.year()}`
    },
    // Validate an email address
    validateEmail: email => re.test(String(email).toLowerCase())
  }
})

Vue.use(vmodal)
Vue.component('v-select', vSelect)

Vue.config.productionTip = false

Vue.component('tabs', Tabs)
Vue.component('tab', Tab)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
