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
            totalNum: 1,
            onChange: (value)=>{
                console.log(value);
            }
        };

        const ossUploadConfig1 = {
            type:'oss',
            imageUploadServerHost: 'https://hp-file-lf.oss-cn-hangzhou.aliyuncs.com', //图片上传服务地址
            imageShowServiceHost: 'https://hp-file-lf.oss-cn-hangzhou.aliyuncs.com', // 图片查看地址前缀
            totalNum: 5,
            supportSort: true,
            value:'test/1.jpg;test/2.jpg'
        };

        const qiniuUploadConfig = {
            type:'qiniu',
            imageUploadServerHost: 'http://up.qiniu.com', //图片上传服务地址
            imageShowServiceHost: 'http://pemcxwlvm.bkt.clouddn.com', // 图片查看地址前缀
            totalNum: 3
        };

        return <div style={{padding:20}}>
            <div className='h-150'>
                <p>OSS 单张</p>
                <ReactUpload getSign={getOSSSign}  {...ossUploadConfig} extraParam={{bizName:"test"}}/>
            </div>

            <div className='h-250'>
                <p>OSS 5张 带回显数据 支持排序</p>
                <ReactUpload getSign={getOSSSign}  {...ossUploadConfig1} extraParam={{bizName:"test"}}/>
            </div>

            <div className='h-150' style={{marginTop:30}}>
                <p>七牛云 3张 不支持排序</p>
                <ReactUpload getSign={getQiNiuSign}  {...qiniuUploadConfig} extraParam={{bizName:"test"}}/>
            </div>

            <p>
                更多信息 请参考 <a href="https://github.com/xuanxia/react-upload-img">https://github.com/xuanxia/react-upload-img</a>
            </p>
        </div>
    }
}