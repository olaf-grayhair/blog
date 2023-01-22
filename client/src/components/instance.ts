import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://blog.oleh-oskin.shop/api/',
    // baseURL: 'http://localhost:5000/api/',
    headers: {Authorization: `Bearer ${localStorage.getItem('token_blog')}`}
  })

export const baseURL = 'https://blog.oleh-oskin.shop/api/'