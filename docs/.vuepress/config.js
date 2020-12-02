module.exports = {
  theme: 'reco',
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
    // nav: [
    //   { text: 'Vue', link:'/vue/vue'},
    //   { text: 'React',link:'/react/react'},
    //   { text: 'NodeJs',link:'/nodeJs/nodeJs'},
    //   { text: 'TypeScript',link:'/typescript/base'},
    //   { text: 'Python',link:'/python/basicTypes'},
    //   { text: 'DataBase',link:'/database/mongodb'},
    //   { text: 'Tools',link:'/tools/markdown'},
    //   { text: 'Gather',link:'/gather/yum'},
    // ],
    nav: [
      { text: 'categories', 
        items: [
          { text: 'Vue', link: '/vue/' },
          { text: 'React', link: '/react/' },
          { text: 'NodeJs', link: '/nodejs/' },
          { text: 'TypeScript', link: '/typescript/' },
          { text: 'Python', link: '/python/' },
          { text: 'DataBase', link: '/database/' },
          { text: 'Tools', link: '/tools/' },
          { text: 'Gather', link: '/gather/' },
          { text: 'TimeLine', link: '/timeLine/', icon: 'reco-date' }
        ]
      }
    ],
    // sidebar: {
    //   '/vue/': getVueSidebar(),
    //   '/react/':getReactSidebar(),
    //   '/nodeJs/':getNodeSidebar(),
    //   '/tools/':getToolSidebar(),
    //   '/typescript/':getTypescriptSidebar(),
    //   '/python/':getPythonSidebar(),
    //   '/database/':getDataBaseSidebar(),
    //   '/gather/':getDataGather()
    // },
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
    title: 'NodeJs案例',
    collapsable: true,
    children: [
      'node-1',
      'node-2',
      'node-3',
      'node-4',
      'node-5',
      'node-6',
      'node-7',
      'node-8',
      'node-9',
      'node-10',
      'node-11',
      'node-12',
      'node-13',
      'node-14',
      'node-15',
      'node-16'
    ]
  },
  {
    title: 'NodeJs基础知识',
    collapsable: true,
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
    collapsable: true,
    children: [
     'mongodb',
     'mongoose',
     'example',
     'mysql',
     'mysql-pro',
     'sequelize'
    ]
  }]
}
function getVueSidebar () {
      return [{
        title: 'Vue知识',
        collapsable: true,
        children: [
         'vue',
         'vue-example',
         'vue-cli3'
        ]
      }]
}
function getTypescriptSidebar () {
  return [{
    title: 'TypeScript',
    collapsable: true,
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
    collapsable: true,
    children: [
      'react-1',
      'react-2',
      'react-3',
      'react-4',
      'react-5',
      'react-6',
      'react-7',
      'react-8',
      'react-9',
      'react-10',
    ]
  },
  {
    title: 'redux',
    collapsable: true,
    children: [
      'redux',
    ]
  },
  {
    title: 'Next.js',
    collapsable: true,
    children: [
      'next-1',
      'next-2',
      'next-3',
      'next-4',
      'next-5',
      'next-6',
      'next-7',
      'next-8'
    ]
  },
  {
    title: 'cloud-music示例',
    collapsable: true,
    children: [
      'cloud-music'
    ]
  },
]
}
function getToolSidebar () {
  return [{
    title: 'tools',
    collapsable: true,
    children: [
      'markdown',
      'git',
      'webpack',
      'gulp',
      'jest',
      'moment'
    ]
  }]
}
function getPythonSidebar () {
  return [{
    title: 'Python',
    collapsable: true,
    children: [
      'basicTypes',
      'variable',
      'function',
      'slice',
      'class',
      'regular',
      'catch',
      'file',
      'tool',
      'pro',
      'mysql',
      'flask'
    ]
  }]
}
function getDataGather () {
  return [{
    title: 'Gather',
    collapsable: true,
    children: [
      'yum',
      'copy'
    ]
  },
  {
    title: 'js小知识',
    collapsable: true,
    children: [
      '1',
      '2',
      '3'
    ]
  },
  {
    title: 'css小知识',
    collapsable: true,
    children: [
      'css-1',
      'css-2',
      'css-3'
    ]
  }]
}