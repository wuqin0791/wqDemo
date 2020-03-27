

/*
 * @Description: This is a XX file
 * @Author: JeanneWu
 * @Date: 2020-03-20 17:03:02
 */
// js文件头部注释之后的内容
const express = require('express')
const http = require('http')
const url = require('url')
const queryString = require('querystring')
let data = {'data':111}
http.createServer((req, res) => {
    console.log(req)
    let params = url.parse(req.url)
    if(params.query && queryString.parse(params.query).callback) {
        console.log(111);
        const str = queryString.parse(params.query).callback + '(' + JSON.stringify(data) + ')';
        console.log(str)
        return res.end(str)
      }
      res.end(JSON.stringify(data));
}).listen(8888)
