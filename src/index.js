/**
 * 应用主入口
 **/

// React Libs
import React, { Fragment,  PureComponent} from 'react'
import Upload from './components/Upload';
import PropTypes from 'prop-types'

export default class ReactUpload extends PureComponent{

    static defaultProps = {
        type: 'oss'
    };

    constructor(props){
        super(props);
    }

    render(){

        const { type } = this.props;

        return  <Upload
            bizName="avatar"
            maxSize={1024 * 2}
            totalNum={9}
            supportSort={true}
            host={`https://hp.bncry.cn/util/getAliyunSignature`}
            onChange={value => {
                console.log(value)
            }}
        />
    }
}