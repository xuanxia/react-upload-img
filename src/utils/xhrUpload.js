
export default  (option) => {
    const {
        file,
        imageUploadServerHost,
        signatureInfo,
        onProgress
    } = option;

    return new Promise((resolve,reject) => {

        const progressFunction = (evt) => {
            console.log('progressFunction');
            console.log(evt);
        };

        const uploadComplete = (evt) => {
            console.log('uploadComplete');

            if(evt && evt.target && evt.target.status === 200){
                try {
                    resolve(JSON.parse(evt.target.response));
                }catch (e){
                    reject(evt.target);
                }
            }else {
                reject(evt.target);
            }

        };

        const uploadFailed = (evt) => {
            reject(evt.target);
        };

        const form = new FormData(); // FormData 对象

        // 签名信息
        for(let key in signatureInfo){
            form.append(key, signatureInfo[key]);
        }
        console.log(imageUploadServerHost);
        form.append("file", file); // 文件对象

        const xhr = new XMLHttpRequest();  // XMLHttpRequest 对象

        xhr.open("post", imageUploadServerHost, true); // post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        xhr.onload = uploadComplete; // 请求完成
        xhr.onerror =  uploadFailed; // 请求失败
        xhr.upload.onprogress = progressFunction;// 上传进度调用方法实现
        xhr.upload.onloadstart = () => {
            // 上传开始执行方法
            console.log('start');
        };
        xhr.send(form); // 开始上传，发送form数据
    });
};