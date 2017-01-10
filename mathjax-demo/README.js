// MathJax的优缺点：
// 缺点：
// 插入inline公式比较困难一点；
// 库比较大，经过精简应该可以解决；
// 生成公式过程中，如果输入latex，需要输入完成标签，比mathquill稍微差点，不过结合mathquill可以通过修改源码解决；


// 优点
// 可以生成svg公式；
// 通过配置，操作简单；
// 提供很多mathjax的CDN；
// 支持多种渲染方式，mathml, svg, html+css , latex, tex, 

// 解决方案：
// 使用mathquill进行公式编辑，使用mathjax将mathquill编辑之后的latex标签渲染成svg插入到topic中；

// 待解决问题：
// mathquill 依赖jquery，还有自己的css, 而mathjax库也比较大，进行公示编辑的话，会在页面中引入较多的外部文件
// 影响页面响应速度；
// 在group中插入svg图片后的定位问题；（目测较容易解决）；
// 渲染时机的选择，类似文字处理，当编辑窗失去焦点进行svg渲染；（容易解决）；
// inline问题；
// 字体问题；

// 尝试将mathjax裁剪，只选择渲染svg的部分；




// -----------------------------------------
/**
 * Mathquill 依赖：
 * "pjs": ">=3.1.0 <5.0.0",
    "mocha": ">=2.4.1",
    "uglify-js": "2.x",
    "less": ">=1.5.1
    MathQuill license：MPL-2.0,
 * 
 * Mathjax ： 原生库176M，没有依赖，
   Mathjax-node ：依赖库：
    "jsdom": "7.*",
    "mathjax": "*",
    "speech-rule-engine": "*",
    "yargs": "3.*"
   
   Mathjax license： Apache 2.0

 */