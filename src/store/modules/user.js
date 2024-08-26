// 用户相关 状态管理
import { createSlice } from "@reduxjs/toolkit";

import { getToken, setToken as _setToken, removeToken } from '@/utils'
import { loginApi, profileApi } from '@/api/user'

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: getToken() || '',
    userInfo: {}
  },
  reducers: {
    setToken (state, action) {
      state.token = action.payload
      // Redux是基于浏览器内存的存储方式，刷新状态恢复为原始值
      // token持久化 - localStorage
      _setToken( action.payload)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo(state) {
      // token
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})

// 解构出 actionCreator
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// 异步方法 完成登录获取 token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送异步请求
    const res = await loginApi(loginForm)
    // 同步提交action进行token存入
    dispatch(setToken(res.data.token))
  }
}

// 获取过个人用户信息异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await profileApi()
    dispatch(setUserInfo(res.data))
  }
}

// 获取reducer函数
const userReducer = userStore.reducer

export { setToken, fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer