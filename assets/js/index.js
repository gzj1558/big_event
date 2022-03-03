// 获取用户的信息  封装函数
// 
getUserInfo()

function getUserInfo() {
    $.ajax({
        method: "get",
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res.data);
            // res.data
            if (res.status !== 0) {
                return layer.msg('认证信息失败')
            }
            // 如果成功，渲染用户头像
            renderAvatar(res.data)
        },
        // 权限管理：JQuery中发起ajax请求，无论成功还是失败都会调用complete函数
//          在complete函数中进行权限管理，
//          如果返回值中是失败，则页面直接跳转回登录页面
        // complete:function (res) {
        //      console.log(res);
        //     if (res.responseJSON.status === 1 &&res.responseJSON.message === '身份认证失败！') {
        //         location.href = '/login.html'
        //     }
        // }
    });
}
// 封装函数，渲染用户头像
function renderAvatar(data) {
    // 获取用户名
    var name = data.nickname || data.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染头像
    if (data.user_pic !== null) {
        // 如果数据中图片有路径，把路径传给img的src属性，并且文字头像隐藏
        $('.layui-nav-img').prop('src', data.user_pic).show()
        $('.text_avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text_avatar').html(name[0].toUpperCase()).show()
    }
}
// 退出功能：
// 点击弹窗，提示是否退出，点取消没有效果
// 点确定返回登录页面  login
// 到layui的内置模块---弹出层---中找confirm
$('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录', {
        icon: 3,
        title: '提示'
    }, function (index) {
        // 1、清除掉本地的token值
        // 2、返回登录页面
        localStorage.removeItem('token')
        location.href = "/login.html"
        layer.close(index);
    });
})

