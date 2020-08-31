import  request  from '@/utils/request'
//本地存储数据1
export function HomeData(){
    return request({
        url:'/wddtest/index.php/home/index/getMerchantInfo',
    })
}
//首页数据2
export function reqData(data){
    return request({
        url:'/wddtest/index.php/home/index/getTotal',
        data
    })
}
//获取首页分类商品数量3
export function reqAmount(){
    return request({
        url:'/wddtest/index.php/home/index/getProductCount',
    })
}
//请求商品分类4
export function getProductCategoryInfo(){
    return request({
        url:'/wddtest/index.php/home/category/getProductCategoryList',
    })
}
//删除商品分类5
export function delProductCategoryInfo(data){
    return request({
        url:'/wddtest/index.php/home/category/delProductCategory',
        method:'POST',
        data
    })
}
//获取商品列表6
export function getProductList(data){
    return request({
        url:'/wddtest/index.php/home/product/getProductList',
        data
    })
}
//新建商品接口7
export function addProduct(data){
    return request({
        url:'/wddtest/index.php/home/product/addProduct',
        method:'POST',
        headers:{
            'Content-type': 'application/json'
          },
        data
    })
}
//修改商品接口8
export function updateProduct(data){
    return request({
        url:'/wddtest/index.php/home/product/updateProduct',
        method:'POST',
        headers:{
            'Content-type': 'application/json'
          },
        data
    })
}
//删除商品接口9
export function delProductList(data){
    return request({
        url:'/wddtest/index.php/home/product/delProduct',
        method:'POST',
        headers:{
            'Content-type': 'application/json'
          },
        data
    })
}
//新增分类10
export function addCategoryList(data){
    return request({
        url:'/wddtest/index.php/home/category/addProductCategory',
        method:'POST',
        data
    })
}
//修改分类11
export function updateCategoryList(data){
    return request({
        url:'/wddtest/index.php/home/category/updateProductCategory',
        method:'POST',
        data
    })
}
//删除分类12
export function delCategoryList(data){
    return request({
        url:'/wddtest/index.php/home/category/delProductCategory',
        method:'POST',
        data
    })
}
//查询订单13
export function getOrderList(data){
    return request({
        url:'/wddtest/index.php/home/order/getOrderList',
        data
    })
}
//绑定商户14
export function bindMerchant(data){
    return request({
        url:'/wddtest/index.php/home/merchant/bindMerchant',
        method:'POST',
        data
    })
}
//生成海报15
export function createqr(data){
    return request({
        url:'/wddtest/index.php/home/product/createTempQR',
        method:'POST',
        data
    })
}
//生成海报16
export function savePoster(data){
    return request({
        url:'/wddtest/index.php/home/product/savePoster',
        method:'POST',
        data
    })
}
//默认海报17
export function getDefaultMould(){
    return request({
        url:'/wddtest/index.php/home/mould/getDefaultMould',
    })
}
//编辑自定义模板18
export function saveProduct(data){
    return request({
        url:'/wddtest/index.php/home/product/saveProduct',
        method:'POST',
        data
    })
}
//快速生成海报19
export function getPoster(data){
    return request({
        url:'/wddtest/index.php/home/product/getPoster',
        data
    })
}
//获取微信config配置20
export function getConfig(data){
    return request({
        url:'/wddtest/index.php/api/wechat/getConfig',
        data
    })
}
//发货21
export function send(data){
    return request({
        url:'/wddtest/index.php/home/order/send',
        method:'POST',
        data
    })
}
//选择海报模板22
export function chooseMould(){
    return request({
        url:'/wddtest/index.php/home/mould/getMouldList',
    })
}
//获取品类列表23
export function getPackageTypeList(){
    return request({
        url:'/wddtest/index.php/home/merchant/getPackageTypeList',
    })
}
//新增运费价目表24
export function addPackage(data){
    return request({
        url:'/wddtest/index.php/home/merchant/addPackage',
        method:'POST',
        data
    })
}
//修改运费价目表25
export function updatePackage(data){
    return request({
        url:'/wddtest/index.php/home/merchant/updatePackage',
        method:'POST',
        data
    })
}
//查询运费价目表26
export function getPackageList(data){
    return request({
        url:'/wddtest/index.php/home/merchant/getPackageList',
        data
    })
}
//删除运费价目27
export function delPackage(data){
    return request({
        url:'/wddtest/index.php/home/merchant/delPackage',
        method:'POST',
        data
    })
}
//获取用户微信头像28
export function getUserAvatar(){
    return request({
        url:'/wddtest/index.php/home/user/getUserInfo',
    })
}
//商品下架29
export function stopSale(data){
    return request({
        url:'/wddtest/index.php/home/product/stopSale',
        method:'POST',
        data
    })
}
//商品上架30
export function startSale(data){
    return request({
        url:'/wddtest/index.php/home/product/startSale',
        method:'POST',
        data
    })
}
//获取订单数量31
export function getOrderCount(){
    return request({
        url:'/wddtest/index.php/home/order/getOrderCount',
    })
}
//物流信息32
export function queryPackage(data){
    return request({
        url:'/wddtest/index.php/home/user/queryPackage',
        method:'POST',
        data
    })
}
//获取快递公司列表33
export function getPackageCom(){
    return request({
        url:'/wddtest/index.php/api/index/getPackageCom',
    })
}
//自定义海报保存数据34
export function addUserMould(data){
    return request({
        url:'/wddtest/index.php/home/mould/addUserMould',
        method:'POST',
        data
    })
}
//获取自定义海报模板数据35
export function getUserMould(){
    return request({
        url:'/wddtest/index.php/home/mould/getUserMould',
    })
}
//删除自定义海报模板36
export function deleteUserMould(data){
    return request({
        url:'/wddtest/index.php/home/mould/deleteUserMould',
        method:'POST',
        data
    })
}
//获取素材图37
export function getElement(){
    return request({
        url:'/wddtest/index.php/home/mould/getElement',
    })
}
//获取买家端订单38
export function getUserOrderList(data){
    return request({
        url:'/wddtest/index.php/home/user/getOrderList',
        data
    })
}