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
            getSign
        } = this.props;

        return  <Upload
            type={type}
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