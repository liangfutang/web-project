import request from '../utils/request'

//登录
export const login = (data) =>{
    return request.post('/login/simple',data)
}
// 新增用户
export const userAdd = (data) =>{
    return request.post('/user/save',data)
}