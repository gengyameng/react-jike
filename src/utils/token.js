// 封装 和token相关的方法 存 取 删

const TOKENKEY = 'token_key'

export function setToken (token) {
  localStorage.setItem(TOKENKEY, token)
}

export function getToken () {
  return localStorage.getItem(TOKENKEY)
}

export function removeToken () {
  localStorage.removeItem(TOKENKEY)
}
