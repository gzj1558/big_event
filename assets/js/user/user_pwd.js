// 确认表单的规则
var form = layui.form
var layer = layui.layer
form.verify({
    // 所有密码框都是6~12位
    pwd:[
        /^[\S]{6,12}$/, '请输入6-12位密码'
    ],
    // 新密码规则
    samepwd:function (value) {
        if (value === $('[name=oldPwd]').val()) {
            return layer.msg('新密码不能和旧密码相同')
        }
    },
    // 确认密码规则
    repwd:function (value) {
        if (value !== $('[name=newPwd]').val()) {
            return layer.msg('两次输入的密码不同')
        }
    }
})
// 修改密码按钮
$('.layui-form').on('submit',function (e) {
    e.preventDefault()
    $.ajax({
        method:'post',
        url:'/my/updatepwd',
        data:$(this).serialize(),
        success:function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('更新失败')
            }
            layer.msg('更新成功')
            // 清空输入框中的内容
            $('.layui-form')[0].reset()
        }
    })
})