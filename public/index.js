// React Libs
import React, {Component} from 'react';
import ReactUpload from '@/index';

const apiServerUrl = 'https://hp.bncry.cn/util/getAliyunSignature';
const qiniuApiServerUrl = 'https://hp.bncry.cn/util/getQiniuSignature';



const getOSSSign = (suffix,width,height, extraParam) => {

    const url = `${apiServerUrl}?${[
        `bizName=${extraParam.bizName}`,
        `suffix=${suffix}`,
        `width=${width}`,
        `height=${height}`,
    ].join('&')}`;

    return new Promise((resolve,reject)=>{
        fetch(url).then(async (response)=>{
            const res = await response.json();
            resolve(res.data);
        })
    })
};


const getQiNiuSign = (suffix,width,height, extraParam) => {

    const url = `${qiniuApiServerUrl}?${[
        `suffix=${suffix}`,
        `width=${width}`,
        `height=${height}`,
    ].join('&')}`;

    return new Promise((resolve,reject)=>{
        fetch(url).then(async (response)=>{
            resolve(await response.json());
        })
    })
};



export default  class Demo extends Component{

    render(){
        const ossUploadConfig = {
            type:'oss',
            imageUploadServerHost: 'https://hp-file-lf.oss-cn-hangzhou.aliyuncs.com', //图片上传服务地址
            imageShowServiceHost: 'https://hp-file-lf.oss-cn-hangzhou.aliyuncs.com', // 图片查看地址前缀
            totalNum: 5
        };

        const qiniuUploadConfig = {
            type:'qiniu',
            imageUploadServerHost: 'http://up.qiniu.com', //图片上传服务地址
            imageShowServiceHost: 'http://pemcxwlvm.bkt.clouddn.com', // 图片查看地址前缀
            totalNum: 3
        };

        return <div>
            <ReactUpload getSign={getOSSSign}  {...ossUploadConfig} extraParam={{bizName:"avatar"}}/>
            <ReactUpload getSign={getQiNiuSign}  {...qiniuUploadConfig} extraParam={{bizName:"avatar"}}/>
        </div>
    }
}