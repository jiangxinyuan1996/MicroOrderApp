import axios from 'axios'
function request(params){
    let { url,headers,data,method } = params
    let reqheaders={
        'Content-type': 'application/x-www-form-urlencoded'
      }
    if(method){
        return new Promise((resolve,reject)=>{
            axios({
                url,
                method:method || 'GET',
                headers:headers || reqheaders,
                data
            }).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }else{
        return new Promise((resolve,reject)=>{
            axios({
                url,
                method:method || 'GET',
                headers:headers || reqheaders,
                params:data
            }).then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}
export default request