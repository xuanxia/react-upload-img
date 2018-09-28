/**
 * 应用主入口
 **/

// React Libs
import React, { Fragment,  PureComponent} from 'react'
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

        return <Fragment>
            这是一个demo组件
            {type}
        </Fragment>
    }
}