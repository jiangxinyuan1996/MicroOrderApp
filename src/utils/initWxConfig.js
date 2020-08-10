export function initWxconfig(wxConfig){
        wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wxConfig.appId, // 必填，公众号的唯一标识
            timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
            nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
            signature: wxConfig.signature,// 必填，签名
            jsApiList: ['chooseImage','getLocalImgData','scanQRCode'] // 必填，需要使用的JS接口列表
        })
        wx.error(function(res){

        })
        wx.ready(function(){
            
        })
}
// export function getImage(){
//     wx.chooseImage({
//         count: 9, // 默认9
//         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//         success: function (res) {
//              localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//         }
//         })
//         wx.scanQRCode({
//             needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
//             scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
//             success: cb
//           });
// }