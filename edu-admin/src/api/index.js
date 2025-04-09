import request from '../utils/request'

//登录
export const login = (data) =>{
    console.log(data, '登录的参数');
    
    return request.post('/login',data)
}