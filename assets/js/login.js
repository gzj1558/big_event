// 点击a切换登录注册盒子
$('#link_reg').on('click', function () {
    $('.reg_box').show()
    $('.login_box').hide()
})
$('#link_login').on('click', function () {
    $('.reg_box').hide()
    $('.login_box').show()
})

// 登录页面的验证
var form = layui.form
var layer = layui.layer;
// 通过类UI设置验证格式
form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    }

)
// 注册页面验证
form.verify({
    reg_pwd: function (value) {
        // 此时的value就是确认密码中的值，应该和输入的密码保持一致
        // 使用jq得到密码框中的值
        if (value !== $('#pwd').val()) {
            return "两次输入的不一致"
        }
    }
})
// 注册页面发起请求
$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    $.post('/api/reguser', {
        username: $('.reg_box [name=username]').val(),
        password: $('.reg_box [name=password]').val()
    }, function (res) {
        // console.log(res);
        if (res.status !== 0) {
           //  return console.log('注册失败');
           return layer.msg(res.message, {icon: 5})
        }
        // 注册成功跳转页面
        // console.log('注册成功');
        layer.msg('注册成功，请登录')
        $('#link_login').click()
    })
})


// 登录功能实现
$('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax(
        {
            method:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                //  console.log(res.token);
                // 把res.token存入本地 localstrage中，以便后面验证的时候使用
                localStorage.setItem('token',res.token)
                // layer.msg('登录成功')
                location.href = '/index.html'
            }
        }
    )
})