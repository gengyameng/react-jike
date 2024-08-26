// 统一中转工具模块函数 - 所有使用utils中的模块可以通过此导入

import { request } from './request'
import { getToken, setToken, removeToken } from './token'

export {
  request, 
  getToken,
  setToken,
  removeToken
}