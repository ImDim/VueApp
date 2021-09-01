import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vueBemCn from 'vue-bem-cn'
import PortalVue from 'portal-vue'

import uiDialog from '@/components/UI/ui-dialog.vue'
import dialogPlugin from '@/plugins/dialog.plugin'

// Components
Vue.component('uiDialog', uiDialog)

// Plugins
Vue.use(dialogPlugin)

Vue.use(PortalVue)
Vue.use(vueBemCn)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')