// User模块API封装

import { request } from '@/utils'


// 登录接口
export function loginApi(data) {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 用户个人资料接口
export function profileApi() {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}