/**
 * 拥有react-app的所有配置项，并加入自己的约定规范，方便后期多应用使用
 */

'use strict';
var restrictedGlobals = [
    'addEventListener',
    'blur',
    'close',
    'closed',
    'confirm',
    'defaultStatus',
    'defaultstatus',
    'event',
    'external',
    'find',
    'focus',
    'frameElement',
    'frames',
    'history',
    'innerHeight',
    'innerWidth',
    'length',
    'location',
    'locationbar',
    'menubar',
    'moveBy',
    'moveTo',
    'name',
    'onblur',
    'onerror',
    'onfocus',
    'onload',
    'onresize',
    'onunload',
    'open',
    'opener',
    'opera',
    'outerHeight',
    'outerWidth',
    'pageXOffset',
    'pageYOffset',
    'parent',
    'print',
    'removeEventListener',
    'resizeBy',
    'resizeTo',
    'screen',
    'screenLeft',
    'screenTop',
    'screenX',
    'screenY',
    'scroll',
    'scrollbars',
    'scrollBy',
    'scrollTo',
    'scrollX',
    'scrollY',
    'self',
    'status',
    'statusbar',
    'stop',
    'toolbar',
    'top',
];

module.exports = {
    root: true,
    
    parser: 'babel-eslint',
    
    plugins: ['import', 'flowtype', 'jsx-a11y', 'react'],
    
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true,
    },
    
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            generators: true,
            experimentalObjectRestSpread: true,
        },
    },
    
    rules: {
        // http://eslint.org/docs/rules/ warn：1 error：2
        'arrow-spacing': 1, // 箭头函数箭头前后加空格
        'array-callback-return': 'warn',
        'array-bracket-spacing': [1, 'never'], // 是否允许非空数组里面有多余的空格
        'brace-style': [0, '1tbs'], // 大括号风格
        'camelcase': 0, // 强制驼峰法命名
        'complexity': [0, 11], // 循环复杂度
        'block-spacing': 0, // 块级{}前后空格
        'default-case': ['warn', { commentPattern: '^no default$' }],
        'dot-location': ['warn', 'property'],
        'eqeqeq': 1, // 必须使用全等
        'indent': [1, 4, {'SwitchCase': 1}], // 缩进风格
        'new-cap': 1, // 函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
        'new-parens': 'warn',
        'max-len': [1, { "ignoreComments": true, "code": 140, "comments":300 }],
        'max-lines': [1, {'max': 500,'skipBlankLines': true,  'skipComments': true}],
        'max-lines-per-function': [1, {'max': 50, 'skipBlankLines': true,  'skipComments': true}],
        'no-var': 0, // 是否能使用var
        'no-array-constructor': 1,// 禁止使用数组构造器
        'no-caller': 'warn', // 禁止使用arguments.caller或arguments.callee
        'no-cond-assign': ['warn', 'always'], // 禁止在条件表达式中使用赋值语句
        'no-catch-shadow': 1,// 禁止catch子句参数与外部作用域变量同名
        'no-class-assign': 1,// 禁止给类赋值
        'no-const-assign': 'warn', // 禁止修改const声明的变量
        'no-control-regex': 'warn',
        'no-delete-var': 'warn',
        'no-dupe-args': 'warn', // 函数参数不能重复
        'no-dupe-class-members': 'warn',
        'no-constant-condition': 1,// 禁止在条件中使用常量表达式
        'no-debugger': 1, // 禁debugger
        'no-dupe-keys': 'warn', // 在创建对象字面量时不允许键重复
        'no-duplicate-case': 'warn',
        'no-empty-character-class': 'warn',
        'no-empty-pattern': 'warn',
        'no-eval': 'warn',
        'no-ex-assign': 'warn', // 禁止给catch语句中的异常参数赋值
        'no-else-return': 1, // 如果if语句里面有return,后面不能跟else语句
        'no-eq-null': 1, // 禁止对null使用==或!=运算符
        'no-extend-native': 'warn', // 禁止扩展native对象
        'no-extra-bind': 'warn',
        'no-extra-label': 'warn',
        'no-fallthrough': 'warn',
        'no-extra-parens': [1, 'all', { 'nestedBinaryExpressions': false }], // 禁止非必要的括号
        'no-extra-semi': 1, // 禁止多余的冒号
        'no-func-assign': 'warn', // 禁止重复的函数声明
        'no-duplicate-imports': 1, // 禁止重复模块导入
        'no-implied-eval': 'warn', // 禁止使用隐式eval
        'no-invalid-regexp': 'warn',
        'no-iterator': 'warn',
        'no-label-var': 'warn',
        'no-labels': ['warn', { allowLoop: true, allowSwitch: false }],
        'no-invalid-this': 0, // 禁止无效的this，只能用在构造器，类，对象字面量
        'no-lone-blocks': 'warn', // 禁止不必要的嵌套块
        'no-loop-func': 'warn',
        'no-mixed-operators': [
            'warn',
            {
                groups: [
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof'],
                ],
                allowSamePrecedence: false,
            },
        ],
        'no-multi-str': 'warn',
        'no-native-reassign': 'warn',
        'no-negated-in-lhs': 'warn',
        'no-new-func': 'warn',
        'no-mixed-spaces-and-tabs': [1, false], // 禁止混用tab和空格
        'no-multiple-empty-lines': [1, {'max': 2}], // 空行最多不能超过1行
        'no-new-object': 'warn', // 禁止使用new Object()
        'no-new-symbol': 'warn',
        'no-new-require': 1, // 禁止使用new require
        'no-new-wrappers': 'warn',
        'no-obj-calls': 'warn',
        'no-octal': 'warn',
        'no-octal-escape': 'warn',
        'no-redeclare': 'warn',
        'no-regex-spaces': 'warn',
        'no-restricted-syntax': ['warn', 'WithStatement'],
        'no-script-url': 'warn',
        'no-self-assign': 'warn',
        'no-self-compare': 'warn',
        'no-sequences': 'warn',
        'no-shadow-restricted-names': 'warn',
        'no-spaced-func': 1, // 函数调用时 函数名与()之间不能有空格
        'no-sparse-arrays': 'warn',
        'no-template-curly-in-string': 'warn',
        'no-this-before-super': 'warn',
        'no-throw-literal': 'warn',
        'no-undef': 'error',
        'no-restricted-globals': ['error'].concat(restrictedGlobals),
        'no-unexpected-multiline': 'warn',
        'no-trailing-spaces': 0, // 一行结束后面不要有空格
        'no-undef-init': 1, // 变量初始化时不能直接给它赋值为undefined
        'no-unreachable': 'warn',
        'no-unused-expressions': [
            'warn',
            {
                allowShortCircuit: true,
                allowTernary: true,
            },
        ],
        'no-unused-labels': 'warn',
        'no-unused-vars': [
            'warn',
            {
                args: 'none',
                ignoreRestSiblings: true,
            },
        ],
        'no-use-before-define': [
            'warn',
            {
                functions: false,
                classes: false,
                variables: false,
            },
        ],
        'no-useless-computed-key': 'warn',
        'no-useless-concat': 'warn',
        'no-useless-constructor': 'warn',
        'no-useless-escape': 'warn',
        'no-useless-rename': [
            'warn',
            {
                ignoreDestructuring: false,
                ignoreImport: false,
                ignoreExport: false,
            },
        ],
        'no-void': 1, // 禁用void操作符
        'no-with': 'warn',
        'no-whitespace-before-property': 'warn',
        'newline-after-var': 1, // 变量声明后是否需要空一行
        'operator-linebreak': [1, 'after'], // 换行时运算符在行尾还是行首
        radix: 'warn',
        'require-yield': 'warn',
        'rest-spread-spacing': ['warn', 'never'],
        strict: ['warn', 'never'],
        'unicode-bom': ['warn', 'never'],
        'semi': [1, 'always'], // 语句强制分号结尾
        'semi-spacing': [0, {'before': false, 'after': true}], // 分号前后空格
        'space-infix-ops': 1, // 中缀操作符周围要不要有空格
        'spaced-comment': [1, 'always', {
            'line': {
                'markers': ['/'],
                'exceptions': ['-', '+']
            },
            'block': {
                'markers': ['!'],
                'exceptions': ['*'],
                'balanced': true
            }
        }],  // 注释风格要不要有空格什么的
        'use-isnan': 'warn',
        'valid-typeof': 'warn',
        'no-restricted-properties': [
            'error',
            {
                object: 'System',
                property: 'import',
                message:
                    'Please use import() instead. More info: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#code-splitting',
            },
        ],
        
        'import/first': 'error',
        'import/no-amd': 'error',
        'import/no-webpack-loader-syntax': 'error',
        
        // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
        'react/jsx-no-comment-textnodes': 'warn',
        'react/jsx-no-duplicate-props': ['warn', { ignoreCase: true }],
        'react/jsx-no-target-blank': 'warn',
        'react/jsx-no-undef': 'error',
        'react/jsx-pascal-case': [
            'warn',
            {
                allowAllCaps: true,
                ignore: [],
            },
        ],
        'react/jsx-uses-react': 'warn',
        'react/jsx-uses-vars': 'warn',
        'react/no-danger-with-children': 'warn',
        'react/no-deprecated': 'warn',
        'react/no-direct-mutation-state': 'warn',
        'react/no-is-mounted': 'warn',
        'react/react-in-jsx-scope': 'error',
        'react/require-render-return': 'error',
        'react/style-prop-object': 'warn',
        
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
        'jsx-a11y/accessible-emoji': 'warn',
        'jsx-a11y/alt-text': 'warn',
        'jsx-a11y/anchor-has-content': 'warn',
        'jsx-a11y/aria-activedescendant-has-tabindex': 'warn',
        'jsx-a11y/aria-props': 'warn',
        'jsx-a11y/aria-proptypes': 'warn',
        'jsx-a11y/aria-role': 'warn',
        'jsx-a11y/aria-unsupported-elements': 'warn',
        'jsx-a11y/heading-has-content': 'warn',
        'jsx-a11y/href-no-hash': 'warn',
        'jsx-a11y/iframe-has-title': 'warn',
        'jsx-a11y/img-redundant-alt': 'warn',
        'jsx-a11y/no-access-key': 'warn',
        'jsx-a11y/no-distracting-elements': 'warn',
        'jsx-a11y/no-redundant-roles': 'warn',
        'jsx-a11y/role-has-required-aria-props': 'warn',
        'jsx-a11y/role-supports-aria-props': 'warn',
        'jsx-a11y/scope': 'warn',
        'flowtype/define-flow-type': 'warn',
        'flowtype/use-flow-type': 'warn',
        'vars-on-top': 1, // var必须放在作用域顶部
    },
};

