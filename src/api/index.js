// index.js 调用接口的方法
// 引入封装的get/post请求方法
import { get, post } from "@/api/http"

export const convertToCamel = (data) => post("Tool/ConvertToCamel", data)