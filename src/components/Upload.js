import React, { Component } from 'react';
import { Upload, Icon, message, Modal } from 'antd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './style.less';

const ossHost = 'https://hp-file-lf.oss-cn-hangzhou.aliyuncs.com';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 4,
    margin: `0 8px 0 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: 8,
    overflow: 'auto',
});

class PictureUploader extends Component {
    static defaultProps = {
        totalNum: 1,
        value: '',
        onChange: () => {},
        supportSort: false,
        maxSize: 2048,
        bizName: 'avatar',
    };

    constructor(props) {
        super(props);

        const { value, totalNum = 1 } = props;
        const values = value ? value.split(';') : [];
        const defaultFileList = [];
        const initValue = [];

        // 初始化预览
        if (values && values.length) {
            values.map((item, index) => {
                defaultFileList.push({
                    uid: index,
                    name: item,
                    status: 'done',
                    thumbUrl: `${ossHost}/${item}`,
                    url: `${ossHost}/${item}`,
                });

                initValue.push(item);
                return null;
            });
        }

        this.state = {
            fileList: defaultFileList,
            loading: false,
            ossOption: {},
            preview: false,
            previewImage: null,
            needPre: true,
            needNext: true,
            currentIndex: 0,
        };
        this.serverUrl = props.host
        this.totalNum = totalNum;

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    componentDidMount() {
        document.removeEventListener('keyup', () => {});
        document.addEventListener('keyup', e => {
            const { currentIndex, previewImage, fileList } = this.state;
            const { key, code } = e;
            if (key === 'ArrowLeft' && code === 'ArrowLeft' && previewImage && currentIndex > 0) {
                this.showPreImage(currentIndex);
            }
            if (
                key === 'ArrowRight' &&
                code === 'ArrowRight' &&
                previewImage &&
                currentIndex < fileList.length - 1
            ) {
                this.showNextImage(currentIndex);
            }
        });
    }

    onDragEnd(result) {
        const { fileList } = this.state;

        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(fileList, result.source.index, result.destination.index);

        this.setState(
            {
                fileList: items,
            },
            () => {
                this.getImages();
            }
        );
    }

    // 获取批量图片路径 用;分隔
    getImages(deleteFileName) {
        const { onChange } = this.props;
        const { fileList } = this.state;
        let result = [];
        fileList.map(item => {
            if (item.name) {
                result.push(item.name);
            }
            return null;
        });
        if (deleteFileName) {
            result = this.ArrayRemoveByValue(result, deleteFileName);
        }
        onChange(result.join(';'));
    }

    // 从服务器获取签名
    getSign(bizName, suffix, width, height) {
        const { serverUrl } = this;

        const url = `${serverUrl}?${[
            `bizName=${bizName}`,
            `suffix=${suffix}`,
            `width=${width}`,
            `height=${height}`,
        ].join('&')}`;

        try {
            const data = this.getRequestData(url);

            if (data.code === 200) {
                return data.data;
            } else {
                message.error('上传图片失败 请联系管理员');
                return false;
            }
        } catch (err) {
            message.error('上传图片失败 请联系管理员');
            return false;
        }
    }

    // 发情原生HTTP请求
    getRequestData = url => {
        let xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xmlhttp = new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        if (xmlhttp != null) {
            xmlhttp.open('GET', url, false);
            xmlhttp.send(null);

            return JSON.parse(xmlhttp.responseText);
        } else {
            alert('Your browser does not support XMLHTTP.');
        }
    };

    /**
     * 获取服务器上传签名
     */
    getData = () => {
        const { ossOption } = this.state;
        return {
            key: ossOption.dirPath,
            policy: ossOption.policy,
            OSSAccessKeyId: ossOption.OSSAccessKeyId,
            success_action_status: '200',
            callback: ossOption.callback,
            signature: ossOption.signature,
        };
    };

    getPreNextInfo(fileName) {
        const { fileList } = this.state;
        let currentIndex = 0;
        let needPre = true;
        let needNext = true;

        fileList.map((item, index) => {
            if (item.name === fileName) {
                currentIndex = index;
            }
            return null;
        });
        if (currentIndex === 0) {
            needPre = false;
        }
        if (currentIndex === fileList.length - 1) {
            needNext = false;
        }

        return {
            currentIndex,
            needPre,
            needNext,
        };
    }

    // 移除图片的回调
    handleRemove = file => {
        let deleteFileName = '';
        if (file && file.response) {
            deleteFileName = file.response.data;
        } else if (file && file.name) {
            deleteFileName = file.name;
        }
        this.getImages(deleteFileName);
        return true;
    };

    ArrayRemoveByValue = (arr, val) => {
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i] === val) {
                arr.splice(i, 1);
                break;
            }
        }
        return arr;
    };

    /**
     *  将正在上传的批量图片 与已经上传的图片进行数据合并
     *  1: 遍历state中的fileList 将status为done优先push结果集数组
     *  2: 遍历上传列表中的fileList 如果结果集数组中不存在 就push进结果集数组
     */
    mergeFileList = upFileList => {
        const { fileList } = this.state;

        const result = [];

        const isInResult = file => {
            let flag = false;
            result.map(item => {
                if (item.uid === file.uid) {
                    flag = true;
                }
                return null;
            });
            return flag;
        };

        fileList.map(item => {
            if (!isInResult(item)) {
                if (item.status === 'done') {
                    result.push(item);
                }
            }
            return null;
        });
        upFileList.map(item => {
            if (!isInResult(item)) {
                result.push(item);
            }
            return null;
        });

        return result;
    };

    /**
     * 上传前的回调
     * @param {} file
     * @param {*} fileList
     */
    beforeUpload = (file, fileList) => {
        const { state } = this;
        const { maxSize, bizName } = this.props || {};
        const defaultMaxSize = 2048; // 默认最大文件大
        const suffixMap = {
            'image/jpg': 'jpg',
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/gif': 'gif',
            'image/bmp': 'bmp',
            'image/webp': 'webp',
        };

        return new Promise((resolve, reject) => {
            if (state.fileList.length + fileList.length > this.totalNum) {
                message.warn(
                    `最多上传${this.totalNum}张图片 还能上传${this.totalNum - state.fileList.length}张`
                );
                reject();
                return false;
            }

            if (!suffixMap[file.type]) {
                message.error('只能上传图片文件，可以是jpg/png/gif/bmp/webp格式!');
                reject();
                return false;
            }

            if (file.size / 1024 > (maxSize || defaultMaxSize)) {
                message.error(`图片大小不能超过${maxSize || defaultMaxSize}kb!`);
                reject();
                return false;
            }

            const imgBlobUrl = URL.createObjectURL(file);

            const img = document.createElement('img');
            img.onload = () => {
                const signData = this.getSign(bizName, suffixMap[file.type], img.width, img.height);

                if (!signData) {
                    reject();
                    return false;
                }

                this.setState({ ossOption: signData }, resolve);
            };
            img.src = imgBlobUrl;
        });
    };

    /**
     * 预览的回调
     */
    handlePreview = file => {
        const { currentIndex, needPre, needNext } = this.getPreNextInfo(file.name);

        this.setState({
            preview: true,
            previewImage: file.url || file.thumbUrl,
            currentIndex,
            needPre,
            needNext,
        });
    };

    /**
     * 关闭预览判断
     */
    handlePreviewClose = () => {
        this.setState({
            preview: false,
        });
    };

    /**
     * 查看下一张图
     */
    showNextImage = index => {
        const { fileList } = this.state;
        const nextIndex = index + 1;
        const file = fileList[nextIndex];
        const { currentIndex, needPre, needNext } = this.getPreNextInfo(file.name);
        this.setState({
            previewImage: file.url || file.thumbUrl,
            currentIndex,
            needPre,
            needNext,
        });
    };

    /**
     * 查看上一张图
     */

    showPreImage(index) {
        const { fileList } = this.state;
        const nextIndex = index - 1;
        const file = fileList[nextIndex];
        const { currentIndex, needPre, needNext } = this.getPreNextInfo(file.name);
        this.setState({
            previewImage: file.url || file.thumbUrl,
            currentIndex,
            needPre,
            needNext,
        });
    }

    /**
     * 获取上传按钮
     */
    uploadButton() {
        const { loading } = this.state;
        return (
            <div className="d-ib">
                <Icon style={{ fontSize: 28 }} type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
    }

    // 上传动作的回调
    handleChange(info) {
        const { file, fileList } = info;

        this.setState({
            fileList: this.mergeFileList(fileList),
        });

        if (file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (file.status === 'done') {
            const responseData = file.response.data;
            let flag = true;
            fileList.map((item, index) => {
                if (item.name === file.name) {
                    fileList[index].name = responseData.key;
                }
                if (item.status !== 'done') {
                    flag = false;
                }
                return null;
            });

            this.setState(
                {
                    loading: false,
                    fileList: this.mergeFileList(fileList),
                },
                () => {
                    if (flag) {
                        this.getImages();
                    }
                }
            );
        }
    }

    render() {
        const { previewImage, fileList, currentIndex, needPre, needNext, preview } = this.state;
        const { supportSort, listType } = this.props;
        const uploadProps = {
            action: ossHost,
            data: this.getData,
            beforeUpload: this.beforeUpload.bind(this),
            onChange: this.handleChange.bind(this),
            onRemove: this.handleRemove.bind(this),
            fileList,
            listType: listType || 'picture-card',
            onPreview: this.handlePreview.bind(this),
            multiple: !!(this.totalNum > 1),
            className: 'd-ib',
        };
        const modalConfig = {
            visible: preview,
            title: `图片预览${fileList.length}/${currentIndex + 1}`,
            footer: null,
            onCancel: this.handlePreviewClose.bind(this),
        };
        return [
            <Upload key="uploader" {...uploadProps}>
                {fileList.length >= this.totalNum ? null : this.uploadButton()}
            </Upload>,

            <Modal key="modal" {...modalConfig}>
                <div className="pre-next-wrapper">
                    {needPre ? (
                        <Icon onClick={this.showPreImage.bind(this, currentIndex)} type="arrow-left" />
                    ) : (
                        <Icon style={{ color: '#CDCDCD', cursor: 'default' }} type="arrow-left" />
                    )}
                    {needNext ? (
                        <Icon onClick={this.showNextImage.bind(this, currentIndex)} type="arrow-right" />
                    ) : (
                        <Icon style={{ color: '#CDCDCD', cursor: 'default' }} type="arrow-right" />
                    )}
                </div>
                <img width="100%" src={previewImage} alt="" />
            </Modal>,

            supportSort && fileList.length > 1 ? (
                <DragDropContext key="DragDropContext" onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {fileList.map((item, index) => (
                                    <Draggable key={item.uid} draggableId={item.uid} index={index}>
                                        {(provided_, snapshot_) => (
                                            <div
                                                ref={provided_.innerRef}
                                                {...provided_.draggableProps}
                                                {...provided_.dragHandleProps}
                                                style={getItemStyle(snapshot_.isDragging, provided_.draggableProps.style)}
                                            >
                                                <img src={item.thumbUrl} width={50} height={50} alt="" />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            ) : (
                ''
            ),
        ];
    }
}

export default PictureUploader;
