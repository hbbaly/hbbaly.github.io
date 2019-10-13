---
title: axios封装
comments: true
description: axios封装， 这里的需求是在特定的请求的时候需要携带`token`， 并且检测`token`是否过期，过期刷新，或者直接请求，
封装了一些`axios`常用的状态
tags: "Vue"
categories: "Vue"
keywords: vue, Vue.js 
date: 2017-08-13 14:38:40
---


这里的需求是在特定的请求的时候需要携带`token`， 并且检测`token`是否过期，过期刷新，或者直接请求

封装了一些`axios`常用的状态

直接上代码

首先需要熟悉`axios`用法 [axiosAPI](https://github.com/axios/axios)

```js
'use strict'
// 引入依赖
import axios from 'axios'
import qs from 'qs'
import config from '../config'
import Token from './token'
import store from './store'
import base from './base'
// 默认一些配置
axios.defaults.withCredentials = true

// axios请求前拦截器
axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

// axios相应拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

// 检查服务器返回的状态码的状态
function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    if (response.data.code === 200) {
      return response
      // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    return response
  }
  // 异常状态下，把错误信息返回去
  return {
    'status': -404,
    'msg': '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {}
  if (res.data && (!res.data.success)) {}
  return res
}

// 携带cookie
const parseCookie = cookies => {
  let cookie = ''
  Object.keys(cookies).forEach(item => {
    cookie += item + '=' + cookies[item] + '; '
  })
  return cookie
}

// post操作
function postByToken (url, data, token, cookies = {}) {
  let cookie = parseCookie(cookies)
  let headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'authorization': token
  }
  if (cookie && !base.isClient()) headers['cookie'] = cookie
  return axios({
    method: 'post',
    baseURL: url.indexOf('authentication/mobile') >= 0 || url.indexOf('oauth/token') >= 0 || url.indexOf('authentication/third') >= 0 ? config.API_SSO : config.API_SERVER,
    url,
    data: qs.stringify(data),
    timeout: 20000,
    headers
  })
    .then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
}

// token过期的操作
function redirectByToken (url, token, pathname) {
  if (base.isClient()) {
    // let href = window.location.href
    if (token === undefined || token === 'timeout' || token === 'notoken') {
      if (pathname === 'User') {
        Token.clearToken()
      } else {
        Token.clearToken()
        // window.location.href = `${base.Href()}/account/login?redirect=${href}`
      }
    }
  }
}
// 抛出
export default {
  post (url, data, isToken = false, pathname = '', cookies = {}) {
    return Token.getToken(isToken)
      .then((token) => {
        redirectByToken(url, token, pathname)
        if (pathname === 'User' && !store.getWithKey('localStorage', 'tokenMsg')) {

        } else {
          return postByToken(url, data, token, cookies)
        }
      })
  },
  get (url, params) {
    return axios({
      'method': 'get',
      'baseURL': config.API_SERVER,
      url,
      params, // get 请求时带的参数
      'timeout': 10000,
      'headers': {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    ).catch((err) => {
      if (err) {

      }
    })
  }
}
```

这里的需求是在特定的请求的时候需要携带`token`， 并且检测`token`是否过期，过期刷新，或者直接请求
