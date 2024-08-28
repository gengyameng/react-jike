// 封装文章相关的接口函数

import { request } from '@/utils'

// 1. 获取所有频道
export function getChannelApi () {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

// 2. 新增文章
export function createArticleApi (data) {
  return request({
    url: '/v1_0/mp/articles?draft=false',
    method: 'POST',
    data
  })
}

// 3. 获取文章列表
export function getArticleListApi (params) {
  return request({
    url: '/v1_0/mp/articles',
    method: 'GET',
    params
  })
}

// 4. 文章详情
export function getArticleById (target) {
  return request({
    url: `/v1_0/mp/articles/${target}`,
    method: 'GET'
  })
}

// 5. 编辑文章
export function updateArticleApi(data){
  return request({
    url: `/v1_0/mp/articles/${data.id}?draft=false`,
    method: 'PUT',
    data
  })
}

// 6. 删除文章
export function delArticleApi(id) {
  return request({
    url: `/v1_0/mp/articles/${id}`,
    method: 'DELETE'
  })
}