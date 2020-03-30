const state = {
  datas: ''
}

const mutations = {
  // 设置对象
  SET_DATAS: (state, payload) => {
    state.datas = payload
  },
}

const actions = {

}

export default {
  namespaced: false,
  state,
  mutations,
  actions
}
