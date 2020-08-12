import  request  from '@/utils/request'
//本地存储数据
export function HomeData(){
    return request({
        url:'/wddtest/index.php/home/index/getMerchantInfo',
    })
}
//首页数据
export function reqData(data){
    return request({
        url:'/wddtest/index.php/home/index/getTotal',
        data
    })
}
//获取首页分类商品数量
export function reqAmount(){
    return request({
        url:'/wddtest/index.php/home/index/getProductCount',
    })
}
//请求商品分类
export function getProductCategoryInfo(){
    return request({
        url:'/wddtest/index.php/home/category/getProductCategoryList',
    })
}
//删除商品分类
export function delProductCategoryInfo(data){
    return request({
        url:'/wddtest/index.php/home/category/delProductCategory',
        method:'POST',
        data
    })
}
//获取商品列表
export function getProductList(data){
    return request({
        url:'/wddtest/index.php/home/product/getProductList',
        data
    })
}
//新建商品接口
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
//修改商品接口
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
//删除商品接口
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
//新增分类
export function addCategoryList(data){
    return request({
        url:'/wddtest/index.php/home/category/addProductCategory',
        method:'POST',
        data
    })
}
//修改分类
export function updateCategoryList(data){
    return request({
        url:'/wddtest/index.php/home/category/updateProductCategory',
        method:'POST',
        data
    })
}
//删除分类
export function delCategoryList(data){
    return request({
        url:'/wddtest/index.php/home/category/delProductCategory',
        method:'POST',
        data
    })
}
//查询订单
export function getOrderList(data){
    return request({
        url:'/wddtest/index.php/home/order/getOrderList',
        data
    })
}
//绑定商户
export function bindMerchant(data){
    return request({
        url:'/wddtest/index.php/home/merchant/bindMerchant',
        method:'POST',
        data
    })
}
//生成海报
export function createqr(data){
    return request({
        url:'/wddtest/index.php/home/product/createTempQR',
        method:'POST',
        data
    })
}
//快速生成海报
export function getPoster(data){
    return request({
        url:'/wddtest/index.php/home/product/getPoster',
        data
    })
}
//获取微信config配置
export function getConfig(data){
    return request({
        url:'/wddtest/index.php/api/wechat/getConfig',
        data
    })
}
//发货
export function send(data){
    return request({
        url:'/wddtest/index.php/home/order/send',
        method:'POST',
        data
    })
}
//选择海报模板
export function chooseMould(){
    return request({
        url:'/wddtest/index.php/home/mould/getMouldList',
    })
}
//获取品类列表
export function getPackageTypeList(){
    return request({
        url:'/wddtest/index.php/home/merchant/getPackageTypeList',
    })
}
//新增运费价目表
export function addPackage(data){
    return request({
        url:'/wddtest/index.php/home/merchant/addPackage',
        method:'POST',
        data
    })
}
//修改运费价目表
export function updatePackage(data){
    return request({
        url:'/wddtest/index.php/home/merchant/updatePackage',
        method:'POST',
        data
    })
}
//查询运费价目表
export function getPackageList(data){
    return request({
        url:'/wddtest/index.php/home/merchant/getPackageList',
        data
    })
}
//删除运费价目
export function delPackage(data){
    return request({
        url:'/wddtest/index.php/home/merchant/delPackage',
        method:'POST',
        data
    })
}
//获取用户微信头像
export function getUserAvatar(){
    return request({
        url:'/wddtest/index.php/home/user/getUserAvatar',
    })
}
//商品下架
export function stopSale(data){
    return request({
        url:'/wddtest/index.php/home/product/stopSale',
        method:'POST',
        data
    })
}
//商品上架
export function startSale(data){
    return request({
        url:'/wddtest/index.php/home/product/startSale',
        method:'POST',
        data
    })
}
//获取订单数量
export function getOrderCount(){
    return request({
        url:'/wddtest/index.php/home/order/getOrderCount',
    })
}
//物流信息
export function queryPackage(data){
    return request({
        url:'/wddtest/index.php/home/user/queryPackage',
        method:'POST',
        data
    })
}
//获取快递公司列表
export function getPackageCom(){
    return request({
        url:'/wddtest/index.php/api/index/getPackageCom',
    })
}
//自定义海报保存数据
export function addUserMould(data){
    return request({
        url:'/wddtest/index.php/home/mould/addUserMould',
        method:'POST',
        data
    })
}
//获取自定义海报模板数据
export function getUserMould(){
    return request({
        url:'/wddtest/index.php/home/mould/getUserMould',
    })
}
//获取素材图
export function getElement(){
    return request({
        url:'/wddtest/index.php/home/mould/getElement',
    })
}
//获取买家端订单
export function getUserOrderList(data){
    return request({
        url:'/wddtest/index.php/home/user/getOrderList',
        data
    })
}