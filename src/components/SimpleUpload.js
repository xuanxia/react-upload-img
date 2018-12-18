import React, { Component } from 'react';
import {httpFetch,xhrUpload} from '../utils';


class SimpleUpload extends Component{

    static defaultProps = {
        imageUploadServerHost:'https://hp-file-lf.oss-cn-hangzhou.aliyuncs.com',
        multiple: true, // 是否批量上传  //
    };

    constructor(props){
        super(props);
        this.state = {
            fileList: []
        };
    }

    handleOnChange = async (files) => {

        const {imageUploadServerHost} = this.props;

        for(let index = 0; index < files.length; index++){
            const file = files[index];
            const signatureInfo = await httpFetch('jpg',400,400);
            const result = await xhrUpload({
                file,imageUploadServerHost,signatureInfo
            });

            console.log(result);
            this.setState({
                fileList: this.state.fileList.concat([Object.assign({},file,result)])
            });

        }

    };

    render(){

        const { multiple, imageUploadServerHost } = this.props;

        const {fileList} = this.state;

        console.log(fileList);
        return <div>
            <input type="file" accept="image/*" onChange={(event) => {
                console.log(event);
                console.log(event.target);
                console.log(event.target.files);
                this.handleOnChange(event.target.files);
            }} multiple={multiple} />
            {
                fileList.length ? <div>{
                    fileList.map((item) =>  <img key={item.data.key} src={`${imageUploadServerHost}/${item.data.key}`} alt=""/>)
                }</div> : ''
            }

        </div>;
    }

}

export default SimpleUpload;