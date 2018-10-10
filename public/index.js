// React Libs
import React, {Component} from 'react';
import ReactUpload from '@/index';




const getOSSSign = (suffix,width,height, extraParam) => {
    const apiServerUrl = 'https://hp.bncry.cn/util/getAliyunSignature';
    const url = `${apiServerUrl}?${[
        `bizName=${extraParam.bizName}`,
        `suffix=${suffix}`,
        `width=${width}`,
        `height=${height}`,
    ].join('&')}`;

    return new Promise((resolve,reject)=>{
        fetch(url).then(async (response)=>{
            const res = await response.json();
            const formData = res.data;
            resolve({
                key: formData.dirPath,
                policy: formData.policy,
                OSSAccessKeyId: formData.OSSAccessKeyId,
                success_action_status: '200',
                callback: formData.callback,
                signature: formData.signature,
            });
        })
    })
};


const getQiNiuSign = (suffix,width,height, extraParam) => {
    const qiniuApiServerUrl = 'https://hp.bncry.cn/util/getQiniuSignature';
    const url = `${qiniuApiServerUrl}?${[
        `suffix=${suffix}`,
        `width=${width}`,
        `height=${height}`,
    ].join('&')}`;

    return new Promise((resolve,reject)=>{
        fetch(url).then(async (response)=>{
            const formData = await response.json();
            resolve({
                token: formData.uptoken,
            });
        })
    })
};



export default  class Demo extends Component{

    render(){
        const ossUploadConfig = {
            type:'oss',
            imageUploadServerHost: 'https://hp-file-lf.oss-cn-hangzhou.aliyuncs.com', //图片上传服务地址
            imageShowServiceHost: 'https://hp-file-lf.oss-cn-hangzhou.aliyuncs.com', // 图片查看地址前缀
            totalNum: 5,
            supportSort: true,
            value:'avatar/2018-10-10/f2b3ace0-cc33-11e8-8ad4-3550e70cc242_220_138.jpg;avatar/2018-10-10/f2b42210-cc33-11e8-8ad4-3550e70cc242_1080_1920.jpg;avatar/2018-10-10/f2b44920-cc33-11e8-8ad4-3550e70cc242_1280_719.jpg'
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