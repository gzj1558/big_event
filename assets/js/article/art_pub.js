var layer = layui.layer
var form = layui.form
// 初始化富文本编辑器
initEditor()
// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
}
// 3. 初始化裁剪区域
$image.cropper(options)
//------------------------------------
// 获取文章分类列表
function initCate() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取分类失败')
            }
            layer.msg('获取文章分类成功')
            var htmlStr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlStr)
            form.render()
        }
    })
}
initCate()


// 给选择封面的按钮绑定点击事件
$('#btnChooseImage').on('click', function () {
    $('#coverFile').click()
})
// 更换裁剪封面图片
$('#coverFile').on('change', function (e) {
    var files = e.target.files
    if (files.length === 0) {
        return
    }
    // 创建一个对应的 URL 地址
    var newImgURL = URL.createObjectURL(files[0])
    // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', newImgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

// 发布文章功能实现
// 需要得到五个参数---先确定第一个 state(状态)
// 设置state默认值是已发布
var art_state = '已发布';
// 当点击了草稿按钮把变量变为‘草稿’
$('#btnSave2').on('click', function () {
    art_state = '草稿'
})
// 收集表单数据，上传服务器
$('#form-pub').on('submit', function (e) {
    e.preventDefault()
    // 创建FormData对象收集数据
    var fd = new FormData($(this)[0])
    // 打印一下fd中的数据
    // fd.forEach(function (v,k) {
    //     console.log(k,v);
    //     // 此时formdata中存入的是三个参数
    //     // title cate_id  content
    // })
    fd.append('state', art_state)
    // 此时formdata中存入的是四个参数
    // title cate_id  content state
    $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            // 把封面对象文件存入formdata中
            fd.append('cover_img', blob)
            // fd.forEach(function (v, k) {
            //     console.log(k, v);
            //     // 此时formdata中存入的是五个参数
            //     // title cate_id  content  cover_img  state
            // })
            // 调用发布文章的函数
            pubArticle(fd)
        })

})
// 封装函数上传发布文章的数据到服务器
function pubArticle(fd) {
    $.ajax({
        method: 'post',
        url: '/my/article/add',
        data: fd,
        // JQ上传文件的请求，固定写法
        processData: false,
        contentType: false,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('发布文章失败')
            }
            layer.msg('发布成功')
            location.href="/article/art_llist.html"
        }
    })
}