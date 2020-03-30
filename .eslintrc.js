module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    //可以在元素或者属性末尾添加拖尾逗号
    'comma-dangle': ["error", "only-multiline"],
    //箭头函数参数使用()
    'arrow-parens': 0,
    //要求function前有空格
    'space-before-function-paren': 0,
    //注释后强制空格
    'spaced-comment': 0,
    //debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //禁止在语句末尾使用分号
    'semi': ['error', 'never'],
    //禁止定义未使用的变量
    'no-unused-vars': 0,
    //强制使用单引号
    'quotes': 0,
    //强制使用 === 或者!==
    'eqeqeq': 0,
    //强制操作符使用一致的换行符风格
    'operator-linebreak': 0,
    //缩进风格
    'indent': 0,
    //禁用console.log
    "no-console": "off",
    //限制属性多行显示
    "vue/max-attributes-per-line": 0,
    //标签限制
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/html-closing-bracket-spacing": 0,
    "vue/html-closing-bracket-newline": 0,
    "vue/mustache-interpolation-spacing": 0,
    "vue/html-self-closing": 0,
    "vue/order-in-components": 0
  }
}
