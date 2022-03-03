// JQ提供的ajax方法 
$.ajaxPrefilter(function (options) {
    //  console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // 优化请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers={
            Authorization:localStorage.getItem('token') || ''
        }
    }
    // 权限管理的优化
   options.complete = function (res) {
    if (res.responseJSON.status === 1 &&res.responseJSON.message === '身份认证失败！') {
        location.href = '/login.html'
    }
   }
})
