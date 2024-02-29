const {createProxyMiddleware} = require('http-proxy-middleware')
const path = require('path')
const express = require('express')
const app = express()

app.use(
    '/auth',
    createProxyMiddleware({
        target: 'http://localhost:3000'
    })
)