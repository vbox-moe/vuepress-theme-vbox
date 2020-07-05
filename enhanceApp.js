import '@theme/styles/element/index.css'
import axios from 'axios'
import ElementUI from 'element-ui'
import qs from 'qs'
import VueAxios from 'vue-axios'

export default ({ Vue }) => {
  Vue.use(ElementUI)
  Vue.use(VueAxios, axios)
  Vue.prototype.$qs = qs
}
