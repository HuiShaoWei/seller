const project = {
  state: {
    step: 1, // 步骤条
    userInfo: {}, // 用户基本信息
  },
  mutations: {
    getStep(state, v) {
      state.step = v
    },
    // 存储基本用户信息
    getUserInfo(state, v) {
      state.userInfo = v
    }
  }
}

export default project
