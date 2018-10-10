/**
 * 应用主入口
 **/

// React Libs
import React, { Fragment,  PureComponent} from 'react'
import Upload from './components/Upload';
import PropTypes from 'prop-types'

export default class ReactUpload extends PureComponent{

    static defaultProps = {
        type: 'oss',
    };

    constructor(props){
        super(props);
    }

    render(){

        const {
            type,
            maxSize,
            totalNum,
            supportSort,
            imageUploadServerHost,
            imageShowServiceHost,
            extraParam,
            getSign,
            value
        } = this.props;

        return  <Upload
            type={type}
            value={value}
            maxSize={maxSize}
            totalNum={totalNum}
            supportSort={supportSort}
            getSign={getSign}
            extraParam={extraParam}
            imageUploadServerHost={imageUploadServerHost}
            imageShowServiceHost={imageShowServiceHost}
            onChange={value => {
                console.log(value)
            }}
        />
    }
}

ReactUpload.propTypes = {
    //类型 oss qiniu 默认 oss
    type: PropTypes.string,
    // 图片大小限制 单位KB 默认 2048
    maxSize: PropTypes.number,
    // 图片数量限制  默认 1
    totalNum: PropTypes.number,
    // 是否支持拖拽排序   默认 false
    supportSort: PropTypes.bool,
    // 图片上传服务地址前缀   默认 ''
    imageUploadServerHost: PropTypes.string,
    // 图片查看服务地址前缀   默认 ''
    imageShowServiceHost: PropTypes.string,
    // 获取签名getSign方法 的第四个参数 供获取签名时 自定义入参
    extraParam: PropTypes.object,
    // 获取签名的方法  Promise
    getSign: PropTypes.func.isRequired,
    // 图片上传成功时的回调 参数
    onChange: PropTypes.func,
    // 回显图片的路径 半路径  根据imageShowServiceHost拼接成完整路径
    value: PropTypes.string
};