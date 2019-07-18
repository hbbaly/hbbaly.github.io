module.exports = {
  title: 'hbbaly',
  description: 'Vue, React, node, TypeScript, Python及数据库基本知识',
  head: [
    ['link', { rel: 'icon', href: 'https://avatars1.githubusercontent.com/u/34227573?s=460&v=4' }]
  ],
  markdown:{
    lineNumbers:true
  },
  themeConfig: {
    repo: 'https://github.com/hbbaly/hbbaly.github.io',

    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    docsRepo: 'https://github.com/hbbaly/hbbaly.github.io',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    docsBranch: 'docs',
    repoLabel: 'GitHub',
    lastUpdated: '最后更新 ',// string | boolean
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助改善此页面！',
    nav: [
      { text: 'Vue', link:'/vue/vue'},
      { text: 'React',link:'/react/react'},
      { text: 'NodeJs',link:'/nodeJs/express'},
      { text: 'TypeScript',link:'/typescript/base'},
      { text: 'Python',link:'/python/basicTypes'},
      { text: 'DataBase',link:'/database/mongodb'},
      { text: 'Tools',link:'/tools/markdown'},
    ],
    sidebar: {
      '/vue/': getVueSidebar(),
      '/react/':getReactSidebar(),
      '/nodeJs/':getNodeSidebar(),
      '/tools/':getToolSidebar(),
      '/typescript/':getTypescriptSidebar(),
      '/python/':getPythonSidebar(),
      '/database/':getDataBaseSidebar()
    },
    serviceWorker: {
      updatePopup: true, // Boolean | Object, 默认值是 undefined.
      // 如果设置为 true, 默认的文本配置将是: 
      updatePopup: { 
         message: "New content is available.", 
         buttonText: "Refresh" 
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': 'public/img'
      }
    }
  }
}
function getNodeSidebar () {
  return [{
    title: 'NodeJs知识',
    collapsable: false,
    children: [
      'express',
      'express-example',
      'koa2',
      'koa-example'
    ]
  }]
}
function getDataBaseSidebar () {
  return [{
    title: '数据库',
    collapsable: false,
    children: [
     'mongodb',
     'mongoose',
     'example',
     'mysql',
     'mysql-pro'
    ]
  }]
}
function getVueSidebar () {
      return [{
        title: 'Vue知识',
        collapsable: false,
        children: [
         'vue',
         'vue-example'
        ]
      }]
}
function getTypescriptSidebar () {
  return [{
    title: 'TypeScript',
    collapsable: false,
    children: [
      'base',
      'interfaces',
      'class',
      'function',
      'generics',
      'typeInference',
      'advanceTypes',
      'modules',
      'namespaces',
      'declarationMerging',
      'decorators',
      'tsconfig'
    ]
  }]
}
function getReactSidebar () {
  return [{
    title: 'React知识',
    collapsable: false,
    children: [
      'react',
      'react-router',
      'redux'
    ]
  }]
}
function getToolSidebar () {
  return [{
    title: 'tools',
    collapsable: false,
    children: [
      'markdown',
      'git',
      'webpack',
      'gulp',
      'jest'
    ]
  }]
}
function getPythonSidebar () {
  return [{
    title: 'Python',
    collapsable: false,
    children: [
      'basicTypes',
      'variable',
      'function',
      'slice',
      'class',
      'regular',
      'catch',
      'file',
      'tool'
    ]
  }]
}