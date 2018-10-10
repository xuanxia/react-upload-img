

> react-uplod-img 是一个基于 React antd组件的图片上传组件 支持oss qiniu等服务端签名 web直传
**需要 react 版本大于 v16.1.0**
<h2 align="center">演示</h2>


<h2 align="center">安装</h2>

```bash
npm i react-uplod-img --save
```


<h2 align="center">使用</h2>


**引入**
```js
import UpImage from 'react-uplod-img'


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

const ossUploadConfig = {
            type:'oss',
            imageUploadServerHost: 'https://hp-file-lf.oss-cn-hangzhou.aliyuncs.com', //图片上传服务地址
            imageShowServiceHost: 'https://hp-file-lf.oss-cn-hangzhou.aliyuncs.com', // 图片查看地址前缀
            totalNum: 5,
            supportSort: true,
            value:'avatar/2018-10-10/f2b3ace0-cc33-11e8-8ad4-3550e70cc242_220_138.jpg;avatar/2018-10-10/f2b42210-cc33-11e8-8ad4-3550e70cc242_1080_1920.jpg;avatar/2018-10-10/f2b44920-cc33-11e8-8ad4-3550e70cc242_1280_719.jpg'
        };

<ReactUpload getSign={getOSSSign}  {...ossUploadConfig} extraParam={{bizName:"avatar"}}/>

```


|配置项|类型|默认值|描述|
|:--:|:--:|:-----:|:-----|
| **`type`** | `String` | oss | 类型 目前支持 oss qiniu |
| **`imageUploadServerHost`** | `String` |  | 图片上传服务地址前缀 |
| **`imageShowServiceHost`** | `String` |  | 图片查看服务地址前缀 |
| **`maxSize`** | `Number` | 2048 |  图片大小限制 单位KB |
| **`totalNum`** | `Number` | 1 |  图片大小限制 单位KB |
| **`supportSort`** | `Bool` | false |  是否支持拖拽排序 |
| **`extraParam`** | `Object` |  |  获取签名getSign方法 的第四个参数 供获取签名时 自定义入参 |
| **`getSign`** | `Func` | （）=>{} |  获取签名的方法  Promise |
| **`onChange`** | `Func` | （）=>{} |  图片上传成功时的回调 参数为图片的半路径;分隔的一个字符串   |
| **`value`** | `String` |  |  回显图片的路径 半路径 |


### `getSign`
```js
    // oss
    const getSign = (suffix,width,height, extraParam) => {
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

    // qiniu

    const getSign = (suffix,width,height, extraParam) => {
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


```

