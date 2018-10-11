import React, { Component } from 'react';
import Upload from 'antd/lib/upload';
import 'antd/lib/upload/style/css';
import Icon from 'antd/lib/icon';
import 'antd/lib/icon/style/css';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


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
        imageShowServiceHost: '',
        imageUploadServerHost: '',
        getSign: () => {},
    };

    constructor(props) {
        super(props);

        const { imageShowServiceHost, value, } = props;
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
                    thumbUrl: `${imageShowServiceHost}/${item}`,
                    url: `${imageShowServiceHost}/${item}`,
                });

                initValue.push(item);
                return null;
            });
        }

        this.state = {
            fileList: defaultFileList,
            loading: false,
            formData: {},
            preview: false,
            previewImage: null,
            needPre: true,
            needNext: true,
            currentIndex: 0,
        };

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

    onDragEnd = (result) => {
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
    getImages = (deleteFileName) => {
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

    /**
     * 获取formData 数据
     */
    getData = () => {
        const { formData } = this.state;
        return formData
    };

    getPreNextInfo = (fileName) => {
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
    handleRemove = file =>  {
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
        const { maxSize, getSign, extraParam, totalNum } = this.props || {};
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
            if (state.fileList.length + fileList.length > totalNum) {
                message.warn(
                    `最多上传${totalNum}张图片 还能上传${totalNum - state.fileList.length}张`
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

            img.onload = async () => {

                const signData = await getSign(suffixMap[file.type], img.width, img.height,extraParam);

                if (!signData) {
                    reject();
                    return false;
                }

                signData.fileName = file.name;

                this.setState({ formData: signData }, resolve);
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

    showPreImage = (index) => {
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
    uploadButton = () => {
        const { loading } = this.state;
        return (
            <div className="d-ib">
                <Icon style={{ fontSize: 28 }} type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
    }

    // 上传动作的回调
    handleChange = (info) =>{
        const { type } = this.props;
        const { file, fileList } = info;

        this.setState({
            fileList: this.mergeFileList(fileList),
        });

        if (file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        if (file.status === 'done') {

            let flag = true;

            if(type === 'oss' ){
                const responseData = file.response.data;
                fileList.map((item, index) => {
                    if (item.name === file.name) {
                        fileList[index].name = responseData.key;
                    }
                    if (item.status !== 'done') {
                        flag = false;
                    }
                    return null;
                });
            }

            if(type === 'qiniu'){
                const responseData = file.response;
                fileList.map((item, index) => {
                    if (item.name === file.name) {
                        fileList[index].name = responseData.key;
                    }
                    if (item.status !== 'done') {
                        flag = false;
                    }
                    return null;
                });
            }

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
        const { supportSort, totalNum, imageUploadServerHost } = this.props;
        const uploadProps = {
            action: imageUploadServerHost,
            data: this.getData,
            beforeUpload: this.beforeUpload,
            onChange: this.handleChange,
            onRemove: this.handleRemove,
            fileList,
            listType: 'picture-card',
            onPreview: this.handlePreview,
            multiple: (totalNum > 1),
            className: 'd-ib',
        };
        const modalConfig = {
            visible: preview,
            title: `图片预览${fileList.length}/${currentIndex + 1}`,
            footer: null,
            onCancel: this.handlePreviewClose,
        };

        const iconStyle = {
            fontSize:30,
        };

        return [
            <Upload key="uploader" {...uploadProps}>
                {fileList.length >= totalNum ? null : this.uploadButton()}
            </Upload>,

            <Modal key="modal" {...modalConfig}>
                <div style={{marginTop:-20,padding:'10px 0'}}>
                    {needPre ? (
                        <Icon style={{float:'left',color:'#40a9ff',...iconStyle}} onClick={this.showPreImage.bind(this, currentIndex)} type="arrow-left" />
                    ) : (
                        <Icon style={{ float:'left',color: '#CDCDCD', cursor: 'default',...iconStyle }} type="arrow-left" />
                    )}
                    {needNext ? (
                        <Icon style={{float:'right',color:'#40a9ff',...iconStyle}} onClick={this.showNextImage.bind(this, currentIndex)} type="arrow-right" />
                    ) : (
                        <Icon style={{float:'right', color: '#CDCDCD', cursor: 'default',...iconStyle }} type="arrow-right" />
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
