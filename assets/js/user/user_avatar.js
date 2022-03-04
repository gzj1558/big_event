 // 1.1 获取裁剪区域的 DOM 元素
 var $image = $('#image')
 var layer = layui.layer
 // 1.2 配置选项
 const options = {
     // 纵横比
     aspectRatio: 1,
     // 指定预览区域
     preview: '.img-preview'
 }

 // 1.3 创建裁剪区域
 $image.cropper(options)
 // 1.4 给上传按钮添加点击事件
 $('#btn_upload').on('click', function () {
     $('#file').click()
 })
 // 1.5 图片上传和图片裁剪
 $('#file').on('change', function (e) {
     // console.log(e.target.files[0]);
     var file = e.target.files[0]
     var newImgURL = URL.createObjectURL(file)
     $image
         .cropper('destroy') // 销毁旧的裁剪区域
         .attr('src', newImgURL) // 重新设置图片路径
         .cropper(options) // 重新初始化裁剪区域
 })
 // 1.6 裁剪到的图片上传服务器
 $('#btnUpload').on('click', function () {
     var dataURL = $image
         .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
             width: 100,
             height: 100
         })
         .toDataURL('image/png,image/jpeg') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
         // 发起post请求，上传图片到服务器
         $.ajax({
             method:'post',
             url:'/my/update/avatar',
             data:{avatar:dataURL},
             success:function (res) {
                 // console.log(res);
                 if (res.status !== 0) {
                     return layer.msg('上传头像失败')
                 }
                 layer.msg('上传头像成功')
                 // 更改用户头像
                 window.parent.getUserInfo()
             }
         })
 })