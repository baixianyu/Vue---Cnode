import miaov from './miaov/miaov.vue'
import modal from './modal/modal.vue'

let components = {
  miaov,
  modal
}

let useObj = {
  install(Vue){
    Object.keys(components).forEach(item => {
      Vue.component(item, components[item])
    });
  }
}

export default useObj;