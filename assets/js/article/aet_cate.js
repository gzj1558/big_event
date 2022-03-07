// 封装函数获取文章类别的数据，渲染页面
var layer = layui.layer;
var form = layui.form;
initArtCateList()
function initArtCateList() {
    // 使用ajax获取后台数据
    $.ajax({
        method:'get',
        url:'/my/article/cates',
        success:function (res) {
           console.log(res);
           if (res.status !== 0) {
               return layer.msg('获取文字列表失败')
           }
          // layer.msg('获取文章列表成功')
           // 渲染页面
           var htmlStr = template('tpl-table',res);
           $('tbody').html(htmlStr)
        }
    })
}
// 点击按钮打开弹窗
// 初始化弹出层
var indexAdd = null;
var indexEdit = null;
$('#btnAddCate').on('click',function () {
   indexAdd = layer.open({
        type:1,
        title: '添加文章分类',
        area:['500px','250px'],
        content: $('#dialog-add').html()
      });     
        
})
// 点击确认添加 收集表单数据 上传服务器  渲染页面
// 因为表单是后添加的结构，所以添加事件使用事件委托

$('body').on('submit','#form-add',function (e) {
    e.preventDefault()
    $.ajax({
        method:'post',
        url:'/my/article/addcates',
        data:$(this).serialize(),
        success:function (res) {
            if (res.status !== 0) {
                return layer.msg('新增类别失败')
            }
            // 添加成功，调用函数重新获取文章列表--渲染页面
            initArtCateList()
            layer.msg('新增类别成功')
            // 通过索引号关闭弹出层
            layer.close(indexAdd)
        }
    })
})
// 事件委托，编辑文章分类
$('tbody').on('click','#btn-edit',function () {
    indexEdit = layer.open({
        type:1,
        title: '修改文章分类',
        area:['500px','250px'],
        content: $('#dialog-edit').html()
      }); 
    var id = $(this).attr('data-id')
    $.ajax({
        method:'get',
        url:'/my/article/cates/' + id,
        success:function (res) {
            if (res.status !== 0) {
                return layer.msg('获取文章分类失败')
            }
            form.val('form-edit',res.data)
        }
    })
})
// 更新文章列表
$('body').on('submit','#form-edit',function (e) {
    e.preventDefault()
    $.ajax({
        method:'post',
        url:'/my/article/updatecate',
        data:$(this).serialize(),
        success:function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('更新失败')
            }
            // 如果成功，则渲染页面，关闭弹出层，提示
            layer.close(indexEdit)
            layer.msg('更新成功')
            initArtCateList()
        }
    })
})
// 删除文章类别
$('tbody').on('click','#btn-delete',function () {
    var id = $(this).attr('data-id')
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            method:'get',
            url:'/my/article/deletecate/' + id,
            success:function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除失败')
                }
                layer.msg('删除成功')
                initArtCateList()
            }
        })
        layer.close(index);
      });
})
