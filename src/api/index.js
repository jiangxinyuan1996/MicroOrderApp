import  request  from '@/utils/request'
//首页数据
export function HomeData(){
    return request({
        url:'/tlwdd/index.php?controller/index/getMerchantInfo',
    })
}
//请求商品分类
export function getProductCategoryInfo(){
    return request({
        url:'/tlwdd/index.php?controller/category/getProductCategoryList',
    })
}
//删除商品分类
export function delProductCategoryInfo(data){
    return request({
        url:'/tlwdd/index.php?controller/category/delProductCategory',
        method:'POST',
        data
    })
}
//获取商品列表
export function getProductList(data){
    return request({
        url:'/tlwdd/index.php?controller/product/getProductList',
        data
    })
}
//新建商品接口
export function addProduct(data){
    return request({
        url:'/tlwdd/index.php?controller/product/addProduct',
        method:'POST',
        headers:{
            'Content-type': 'application/json'
          },
        data
    })
}
//修改商品接口
export function updateProduct(data){
    return request({
        url:'/tlwdd/index.php?controller/product/updateProduct',
        method:'POST',
        headers:{
            'Content-type': 'application/json'
          },
        data
    })
}
//删除商品接口
export function delProductList(data){
    return request({
        url:'/tlwdd/index.php?controller/product/delProduct',
        method:'POST',
        headers:{
            'Content-type': 'application/json'
          },
        data
    })
}
//新增分类
export function addCategoryList(data){
    return request({
        url:'/tlwdd/index.php?controller/category/addProductCategory',
        method:'POST',
        data
    })
}
//修改分类
export function updateCategoryList(data){
    return request({
        url:'/tlwdd/index.php?controller/category/updateProductCategory',
        method:'POST',
        data
    })
}
//删除分类
export function delCategoryList(data){
    return request({
        url:'/tlwdd/index.php?controller/category/delProductCategory',
        method:'POST',
        data
    })
}
//查询订单
export function getOrderList(data){
    return request({
        url:'/tlwdd/index.php?controller/order/getOrderList',
        data
    })
}
//绑定商户
export function bindMerchant(data){
    return request({
        url:'/tlwdd/index.php?controller/merchant/bindMerchant',
        method:'POST',
        data
    })
}
//生成海报
export function createqr(data){
    return request({
        url:'/tlwdd/index.php?controller/product/createTempQR',
        method:'POST',
        data
    })
}
