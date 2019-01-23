

> react-uplod-img 是一个基于 React antd组件的图片上传组件 支持oss qiniu等服务端自定义获取签名,批量上传, 预览, 删除, 图片精确的尺寸限制 排序等功能

## 简单的文件上传可以参考 https://github.com/xuanxia/simpleUpload

**需要 react 版本大于 v16.1.0 支持async await**

<h2 align="center">[demo](http://hp-prod.oss-cn-hangzhou.aliyuncs.com/demo.html)</h2>



<h2 align="center">安装</h2>

```bash
npm i react-uplod-img --save
```


<h2 align="center">使用</h2>

**引入**
```js
import UpImage from 'react-uplod-img'
```
**调用**
```
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

<UpImage getSign={getOSSSign}  {...ossUploadConfig} extraParam={{bizName:"avatar"}}/>

```


|配置项|类型|默认值|描述|
|:--:|:--:|:-----:|:-----|
| **`type`** | `String` | oss | 类型 目前支持 oss qiniu |
| **`imageUploadServerHost`** | `String` |  | 图片上传服务地址前缀 |
| **`imageShowServiceHost`** | `String` |  | 图片查看服务地址前缀 |
| **`maxSize`** | `Number` | 2048 |  图片大小限制 单位KB |
| **`totalNum`** | `Number` | 1 |  图片数量限制 |
| **`minWidth`** | `Number` |  |  图片最小宽度限制 |
| **`maxWidth`** | `Number` |  |  图片最大宽度限制 |
| **`minHeight`** | `Number` |  |  图片最小高度限制 |
| **`maxHeight`** | `Number` |  |  图片最大高度限制 |
| **`supportSort`** | `Bool` | false |  是否支持拖拽排序 |
| **`extraParam`** | `Object` |  |  获取签名getSign方法 的第四个参数 供获取签名时 自定义入参 |
| **`getSign`** | `Func` | (suffix,width,height, extraPara)=>{} |  获取签名的方法  Promise |
| **`onChange`** | `Func` | （values）=>{} |  图片上传成功时的回调 参数为图片的半路径;分隔的一个字符串   |
| **`value`** | `String` |  |  回显图片的路径 半路径 ;分隔|


### `getSign`
> suffix 图片后缀  width 图片宽度 height 图片高度  extraParam 自定义的参数

width 和 height 参数是组件通过渲染获取的图片真实宽高,
推荐传递到服务器端参与签名 生成的URL key中能携带宽高信息 如
/avatar/2018-10-10/f2b3ace0-cc33-11e8-8ad4-3550e70cc242_`800`_`600`.jpg 图片路径中携带了宽高信息 后期前端页面图片懒加载时 可以通过链接中的宽高信息做优化


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

**注意事项**
> 获取签名采用的是async await的异步处理方式 需要你的项目支持async await 如果不支持 会报 `ReferenceError: regeneratorRuntime is not defined`

**解决方案**
  ```
  npm i --save-dev babel-plugin-transform-runtime
  在 .babelrc 文件中添加：
  "plugins": [[
      "transform-runtime",
      {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": "babel-runtime"
      }
    ]]
  ```



