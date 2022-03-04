var form = layui.form
var layer = layui.layer
form.verify({
    nickname:function (value) {
        if (value.length > 6) {
            return '用户昵称过长，请输入不多于6个字符的名字'
        }
    }
})
// 发起get请求得到用户信息--初始化
initUserInfo()
function initUserInfo() {
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        success:function (res) {
           //  console.log(res);
           if (res.status !== 0) {
               return layer.msg('请求用户信息失败')
           }
          // return layer.msg('请求用户信息成功')
          // 渲染页面--给表单赋值
          form.val('form_userInfo',res.data)
        }
    })
}
// 重置功能
$('#btn_reset').on('click',function (e) {
    // 阻止默认事件
    e.preventDefault()
    // 恢复服务器中的表单数据
    initUserInfo()
})
// 提交功能
// 收集数据--存入服务器--数据更新
$('.layui-form').on('submit',function (e) {
    e.preventDefault();
    $.ajax({
        method:'post',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('提交信息失败')
            }
            layer.msg('提交信息成功')
            // 调用index.js中的getUserInfo() 修改昵称
            // window指的当前的页面
            // window.parent指的同一个浏览器选项卡中的父页面
            window.parent.getUserInfo()
        }
    })
})