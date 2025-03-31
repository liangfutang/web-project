class Utils {
    // 获取用户信息
    getUserInfo() {
        uni.login({
          success: (result) => {console.log(result);},
          fail: (err) => {console.log(err);},
          complete: (res) => {},
        })
    }
}

export default new Utils();