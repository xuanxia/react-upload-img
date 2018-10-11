(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["react-upload"] = factory();
	else
		root["react-upload"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/Upload.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = __webpack_require__("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _upload = __webpack_require__("antd/lib/upload");

var _upload2 = _interopRequireDefault(_upload);

__webpack_require__("antd/lib/upload/style/css");

var _icon = __webpack_require__("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

__webpack_require__("antd/lib/icon/style/css");

var _message = __webpack_require__("antd/lib/message");

var _message2 = _interopRequireDefault(_message);

__webpack_require__("antd/lib/message/style/css");

var _modal = __webpack_require__("antd/lib/modal");

var _modal2 = _interopRequireDefault(_modal);

__webpack_require__("antd/lib/modal/style/css");

var _reactBeautifulDnd = __webpack_require__("react-beautiful-dnd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// a little function to help us with reordering the result
var reorder = function reorder(list, startIndex, endIndex) {
    var result = Array.from(list);

    var _result$splice = result.splice(startIndex, 1),
        _result$splice2 = _slicedToArray(_result$splice, 1),
        removed = _result$splice2[0];

    result.splice(endIndex, 0, removed);

    return result;
};

var getItemStyle = function getItemStyle(isDragging, draggableStyle) {
    return _extends({
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: 4,
        margin: '0 8px 0 0',

        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'grey'

    }, draggableStyle);
};

var getListStyle = function getListStyle(isDraggingOver) {
    return {
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        display: 'flex',
        padding: 8,
        overflow: 'auto'
    };
};

var PictureUploader = function (_Component) {
    _inherits(PictureUploader, _Component);

    function PictureUploader(props) {
        var _this2 = this;

        _classCallCheck(this, PictureUploader);

        var _this = _possibleConstructorReturn(this, (PictureUploader.__proto__ || Object.getPrototypeOf(PictureUploader)).call(this, props));

        _this.onDragEnd = function (result) {
            var fileList = _this.state.fileList;

            // dropped outside the list

            if (!result.destination) {
                return;
            }

            var items = reorder(fileList, result.source.index, result.destination.index);

            _this.setState({
                fileList: items
            }, function () {
                _this.getImages();
            });
        };

        _this.getImages = function (deleteFileName) {
            var onChange = _this.props.onChange;
            var fileList = _this.state.fileList;

            var result = [];
            fileList.map(function (item) {
                if (item.name) {
                    result.push(item.name);
                }
                return null;
            });
            if (deleteFileName) {
                result = _this.ArrayRemoveByValue(result, deleteFileName);
            }
            onChange(result.join(';'));
        };

        _this.getData = function () {
            var formData = _this.state.formData;

            return formData;
        };

        _this.getPreNextInfo = function (fileName) {
            var fileList = _this.state.fileList;

            var currentIndex = 0;
            var needPre = true;
            var needNext = true;

            fileList.map(function (item, index) {
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
                currentIndex: currentIndex,
                needPre: needPre,
                needNext: needNext
            };
        };

        _this.handleRemove = function (file) {
            var deleteFileName = '';
            if (file && file.response) {
                deleteFileName = file.response.data;
            } else if (file && file.name) {
                deleteFileName = file.name;
            }
            _this.getImages(deleteFileName);
            return true;
        };

        _this.ArrayRemoveByValue = function (arr, val) {
            for (var i = 0; i < arr.length; i += 1) {
                if (arr[i] === val) {
                    arr.splice(i, 1);
                    break;
                }
            }
            return arr;
        };

        _this.mergeFileList = function (upFileList) {
            var fileList = _this.state.fileList;


            var result = [];

            var isInResult = function isInResult(file) {
                var flag = false;
                result.map(function (item) {
                    if (item.uid === file.uid) {
                        flag = true;
                    }
                    return null;
                });
                return flag;
            };

            fileList.map(function (item) {
                if (!isInResult(item)) {
                    if (item.status === 'done') {
                        result.push(item);
                    }
                }
                return null;
            });
            upFileList.map(function (item) {
                if (!isInResult(item)) {
                    result.push(item);
                }
                return null;
            });

            return result;
        };

        _this.beforeUpload = function (file, fileList) {
            var state = _this.state;

            var _ref = _this.props || {},
                maxSize = _ref.maxSize,
                getSign = _ref.getSign,
                extraParam = _ref.extraParam,
                totalNum = _ref.totalNum;

            var defaultMaxSize = 2048; // 默认最大文件大
            var suffixMap = {
                'image/jpg': 'jpg',
                'image/jpeg': 'jpg',
                'image/png': 'png',
                'image/gif': 'gif',
                'image/bmp': 'bmp',
                'image/webp': 'webp'
            };

            return new Promise(function (resolve, reject) {
                if (state.fileList.length + fileList.length > totalNum) {
                    _message2.default.warn('\u6700\u591A\u4E0A\u4F20' + totalNum + '\u5F20\u56FE\u7247 \u8FD8\u80FD\u4E0A\u4F20' + (totalNum - state.fileList.length) + '\u5F20');
                    reject();
                    return false;
                }

                if (!suffixMap[file.type]) {
                    _message2.default.error('只能上传图片文件，可以是jpg/png/gif/bmp/webp格式!');
                    reject();
                    return false;
                }

                if (file.size / 1024 > (maxSize || defaultMaxSize)) {
                    _message2.default.error('\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7' + (maxSize || defaultMaxSize) + 'kb!');
                    reject();
                    return false;
                }

                var imgBlobUrl = URL.createObjectURL(file);

                var img = document.createElement('img');

                img.onload = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                    var signData;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return getSign(suffixMap[file.type], img.width, img.height, extraParam);

                                case 2:
                                    signData = _context.sent;

                                    if (signData) {
                                        _context.next = 6;
                                        break;
                                    }

                                    reject();
                                    return _context.abrupt('return', false);

                                case 6:

                                    signData.fileName = file.name;

                                    _this.setState({ formData: signData }, resolve);

                                case 8:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this2);
                }));

                img.src = imgBlobUrl;
            });
        };

        _this.handlePreview = function (file) {
            var _this$getPreNextInfo = _this.getPreNextInfo(file.name),
                currentIndex = _this$getPreNextInfo.currentIndex,
                needPre = _this$getPreNextInfo.needPre,
                needNext = _this$getPreNextInfo.needNext;

            _this.setState({
                preview: true,
                previewImage: file.url || file.thumbUrl,
                currentIndex: currentIndex,
                needPre: needPre,
                needNext: needNext
            });
        };

        _this.handlePreviewClose = function () {
            _this.setState({
                preview: false
            });
        };

        _this.showNextImage = function (index) {
            var fileList = _this.state.fileList;

            var nextIndex = index + 1;
            var file = fileList[nextIndex];

            var _this$getPreNextInfo2 = _this.getPreNextInfo(file.name),
                currentIndex = _this$getPreNextInfo2.currentIndex,
                needPre = _this$getPreNextInfo2.needPre,
                needNext = _this$getPreNextInfo2.needNext;

            _this.setState({
                previewImage: file.url || file.thumbUrl,
                currentIndex: currentIndex,
                needPre: needPre,
                needNext: needNext
            });
        };

        _this.showPreImage = function (index) {
            var fileList = _this.state.fileList;

            var nextIndex = index - 1;
            var file = fileList[nextIndex];

            var _this$getPreNextInfo3 = _this.getPreNextInfo(file.name),
                currentIndex = _this$getPreNextInfo3.currentIndex,
                needPre = _this$getPreNextInfo3.needPre,
                needNext = _this$getPreNextInfo3.needNext;

            _this.setState({
                previewImage: file.url || file.thumbUrl,
                currentIndex: currentIndex,
                needPre: needPre,
                needNext: needNext
            });
        };

        _this.uploadButton = function () {
            var loading = _this.state.loading;

            return _react2.default.createElement(
                'div',
                { className: 'd-ib' },
                _react2.default.createElement(_icon2.default, { style: { fontSize: 28 }, type: loading ? 'loading' : 'plus' }),
                _react2.default.createElement(
                    'div',
                    { className: 'ant-upload-text' },
                    '\u4E0A\u4F20\u56FE\u7247'
                )
            );
        };

        _this.handleChange = function (info) {
            var type = _this.props.type;
            var file = info.file,
                fileList = info.fileList;


            _this.setState({
                fileList: _this.mergeFileList(fileList)
            });

            if (file.status === 'uploading') {
                _this.setState({ loading: true });
                return;
            }

            if (file.status === 'done') {

                var flag = true;

                if (type === 'oss') {
                    var responseData = file.response.data;
                    fileList.map(function (item, index) {
                        if (item.name === file.name) {
                            fileList[index].name = responseData.key;
                        }
                        if (item.status !== 'done') {
                            flag = false;
                        }
                        return null;
                    });
                }

                if (type === 'qiniu') {
                    var _responseData = file.response;
                    fileList.map(function (item, index) {
                        if (item.name === file.name) {
                            fileList[index].name = _responseData.key;
                        }
                        if (item.status !== 'done') {
                            flag = false;
                        }
                        return null;
                    });
                }

                _this.setState({
                    loading: false,
                    fileList: _this.mergeFileList(fileList)
                }, function () {
                    if (flag) {
                        _this.getImages();
                    }
                });
            }
        };

        var imageShowServiceHost = props.imageShowServiceHost,
            value = props.value;

        var values = value ? value.split(';') : [];
        var defaultFileList = [];
        var initValue = [];

        // 初始化预览
        if (values && values.length) {
            values.map(function (item, index) {
                defaultFileList.push({
                    uid: index,
                    name: item,
                    status: 'done',
                    thumbUrl: imageShowServiceHost + '/' + item,
                    url: imageShowServiceHost + '/' + item
                });

                initValue.push(item);
                return null;
            });
        }

        _this.state = {
            fileList: defaultFileList,
            loading: false,
            formData: {},
            preview: false,
            previewImage: null,
            needPre: true,
            needNext: true,
            currentIndex: 0
        };

        _this.onDragEnd = _this.onDragEnd.bind(_this);
        return _this;
    }

    _createClass(PictureUploader, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            document.removeEventListener('keyup', function () {});
            document.addEventListener('keyup', function (e) {
                var _state = _this3.state,
                    currentIndex = _state.currentIndex,
                    previewImage = _state.previewImage,
                    fileList = _state.fileList;
                var key = e.key,
                    code = e.code;

                if (key === 'ArrowLeft' && code === 'ArrowLeft' && previewImage && currentIndex > 0) {
                    _this3.showPreImage(currentIndex);
                }
                if (key === 'ArrowRight' && code === 'ArrowRight' && previewImage && currentIndex < fileList.length - 1) {
                    _this3.showNextImage(currentIndex);
                }
            });
        }

        // 获取批量图片路径 用;分隔


        /**
         * 获取formData 数据
         */


        // 移除图片的回调


        /**
         *  将正在上传的批量图片 与已经上传的图片进行数据合并
         *  1: 遍历state中的fileList 将status为done优先push结果集数组
         *  2: 遍历上传列表中的fileList 如果结果集数组中不存在 就push进结果集数组
         */


        /**
         * 上传前的回调
         * @param {} file
         * @param {*} fileList
         */


        /**
         * 预览的回调
         */


        /**
         * 关闭预览判断
         */


        /**
         * 查看下一张图
         */


        /**
         * 查看上一张图
         */

        /**
         * 获取上传按钮
         */


        // 上传动作的回调

    }, {
        key: 'render',
        value: function render() {
            var _state2 = this.state,
                previewImage = _state2.previewImage,
                fileList = _state2.fileList,
                currentIndex = _state2.currentIndex,
                needPre = _state2.needPre,
                needNext = _state2.needNext,
                preview = _state2.preview;
            var _props = this.props,
                supportSort = _props.supportSort,
                totalNum = _props.totalNum,
                imageUploadServerHost = _props.imageUploadServerHost;

            var uploadProps = {
                action: imageUploadServerHost,
                data: this.getData,
                beforeUpload: this.beforeUpload,
                onChange: this.handleChange,
                onRemove: this.handleRemove,
                fileList: fileList,
                listType: 'picture-card',
                onPreview: this.handlePreview,
                multiple: totalNum > 1,
                className: 'd-ib'
            };
            var modalConfig = {
                visible: preview,
                title: '\u56FE\u7247\u9884\u89C8' + fileList.length + '/' + (currentIndex + 1),
                footer: null,
                onCancel: this.handlePreviewClose
            };

            var iconStyle = {
                fontSize: 30
            };

            return [_react2.default.createElement(
                _upload2.default,
                _extends({ key: 'uploader' }, uploadProps),
                fileList.length >= totalNum ? null : this.uploadButton()
            ), _react2.default.createElement(
                _modal2.default,
                _extends({ key: 'modal' }, modalConfig),
                _react2.default.createElement(
                    'div',
                    { style: { marginTop: -20, padding: '10px 0' } },
                    needPre ? _react2.default.createElement(_icon2.default, { style: _extends({ float: 'left', color: '#40a9ff' }, iconStyle), onClick: this.showPreImage.bind(this, currentIndex), type: 'arrow-left' }) : _react2.default.createElement(_icon2.default, { style: _extends({ float: 'left', color: '#CDCDCD', cursor: 'default' }, iconStyle), type: 'arrow-left' }),
                    needNext ? _react2.default.createElement(_icon2.default, { style: _extends({ float: 'right', color: '#40a9ff' }, iconStyle), onClick: this.showNextImage.bind(this, currentIndex), type: 'arrow-right' }) : _react2.default.createElement(_icon2.default, { style: _extends({ float: 'right', color: '#CDCDCD', cursor: 'default' }, iconStyle), type: 'arrow-right' })
                ),
                _react2.default.createElement('img', { width: '100%', src: previewImage, alt: '' })
            ), supportSort && fileList.length > 1 ? _react2.default.createElement(
                _reactBeautifulDnd.DragDropContext,
                { key: 'DragDropContext', onDragEnd: this.onDragEnd },
                _react2.default.createElement(
                    _reactBeautifulDnd.Droppable,
                    { droppableId: 'droppable', direction: 'horizontal' },
                    function (provided, snapshot) {
                        return _react2.default.createElement(
                            'div',
                            _extends({
                                ref: provided.innerRef,
                                style: getListStyle(snapshot.isDraggingOver)
                            }, provided.droppableProps),
                            fileList.map(function (item, index) {
                                return _react2.default.createElement(
                                    _reactBeautifulDnd.Draggable,
                                    { key: item.uid, draggableId: item.uid, index: index },
                                    function (provided_, snapshot_) {
                                        return _react2.default.createElement(
                                            'div',
                                            _extends({
                                                ref: provided_.innerRef
                                            }, provided_.draggableProps, provided_.dragHandleProps, {
                                                style: getItemStyle(snapshot_.isDragging, provided_.draggableProps.style)
                                            }),
                                            _react2.default.createElement('img', { src: item.thumbUrl, width: 50, height: 50, alt: '' })
                                        );
                                    }
                                );
                            }),
                            provided.placeholder
                        );
                    }
                )
            ) : ''];
        }
    }]);

    return PictureUploader;
}(_react.Component);

PictureUploader.defaultProps = {
    totalNum: 1,
    value: '',
    onChange: function onChange() {},
    supportSort: false,
    maxSize: 2048,
    imageShowServiceHost: '',
    imageUploadServerHost: '',
    getSign: function getSign() {}
};
exports.default = PictureUploader;

/***/ }),

/***/ "./src/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("react");

var _react2 = _interopRequireDefault(_react);

var _Upload = __webpack_require__("./src/components/Upload.js");

var _Upload2 = _interopRequireDefault(_Upload);

var _propTypes = __webpack_require__("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 应用主入口
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

// React Libs


var ReactUpload = function (_PureComponent) {
    _inherits(ReactUpload, _PureComponent);

    function ReactUpload(props) {
        _classCallCheck(this, ReactUpload);

        return _possibleConstructorReturn(this, (ReactUpload.__proto__ || Object.getPrototypeOf(ReactUpload)).call(this, props));
    }

    _createClass(ReactUpload, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                type = _props.type,
                maxSize = _props.maxSize,
                totalNum = _props.totalNum,
                supportSort = _props.supportSort,
                imageUploadServerHost = _props.imageUploadServerHost,
                imageShowServiceHost = _props.imageShowServiceHost,
                extraParam = _props.extraParam,
                getSign = _props.getSign,
                value = _props.value,
                onChange = _props.onChange;


            return _react2.default.createElement(_Upload2.default, {
                type: type,
                value: value,
                maxSize: maxSize,
                totalNum: totalNum,
                supportSort: supportSort,
                getSign: getSign,
                extraParam: extraParam,
                imageUploadServerHost: imageUploadServerHost,
                imageShowServiceHost: imageShowServiceHost,
                onChange: onChange
            });
        }
    }]);

    return ReactUpload;
}(_react.PureComponent);

ReactUpload.defaultProps = {
    type: 'oss'
};
exports.default = ReactUpload;


ReactUpload.propTypes = {
    //类型 oss qiniu 默认 oss
    type: _propTypes2.default.string,
    // 图片大小限制 单位KB 默认 2048
    maxSize: _propTypes2.default.number,
    // 图片数量限制  默认 1
    totalNum: _propTypes2.default.number,
    // 是否支持拖拽排序   默认 false
    supportSort: _propTypes2.default.bool,
    // 图片上传服务地址前缀   默认 ''
    imageUploadServerHost: _propTypes2.default.string,
    // 图片查看服务地址前缀   默认 ''
    imageShowServiceHost: _propTypes2.default.string,
    // 获取签名getSign方法 的第四个参数 供获取签名时 自定义入参
    extraParam: _propTypes2.default.object,
    // 获取签名的方法  Promise
    getSign: _propTypes2.default.func.isRequired,
    // 图片上传成功时的回调 参数
    onChange: _propTypes2.default.func,
    // 回显图片的路径 半路径  根据imageShowServiceHost拼接成完整路径
    value: _propTypes2.default.string
};

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/index.js");


/***/ }),

/***/ "antd/lib/icon":
/***/ (function(module, exports) {

module.exports = require("antd/lib/icon");

/***/ }),

/***/ "antd/lib/icon/style/css":
/***/ (function(module, exports) {

module.exports = require("antd/lib/icon/style/css");

/***/ }),

/***/ "antd/lib/message":
/***/ (function(module, exports) {

module.exports = require("antd/lib/message");

/***/ }),

/***/ "antd/lib/message/style/css":
/***/ (function(module, exports) {

module.exports = require("antd/lib/message/style/css");

/***/ }),

/***/ "antd/lib/modal":
/***/ (function(module, exports) {

module.exports = require("antd/lib/modal");

/***/ }),

/***/ "antd/lib/modal/style/css":
/***/ (function(module, exports) {

module.exports = require("antd/lib/modal/style/css");

/***/ }),

/***/ "antd/lib/upload":
/***/ (function(module, exports) {

module.exports = require("antd/lib/upload");

/***/ }),

/***/ "antd/lib/upload/style/css":
/***/ (function(module, exports) {

module.exports = require("antd/lib/upload/style/css");

/***/ }),

/***/ "babel-runtime/regenerator":
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-beautiful-dnd":
/***/ (function(module, exports) {

module.exports = require("react-beautiful-dnd");

/***/ })

/******/ });
});