module.exports = {
  title: 'hbbaly',
  description: '前端知识，vue，react，webpack',
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
    repoLabel: 'GitHub',
    nav: [
      { text: 'Vue', link:'/vue/vue'},
      { text: 'React',link:'/react/react'},
      { text: 'NodeJs',link:'/nodeJs/nodeJs'},
      { text: 'Python',link:'/python/python'},
      { text: 'Tools',link:'/tools/webpack'},
    ],
    sidebar: {
      '/vue/': getVueSidebar(),
      '/react/react':getReactSidebar(),
      '/nodeJs/':getNodeSidebar(),
      '/tools/':getToolSidebar(),
      '/python/':getPythonSidebar()
    },
    serviceWorker:{

    }
  }
}
function getNodeSidebar () {
  return [{
    title: 'NodeJs知识',
    collapsable: false,
    children: [
      'nodeJs',
      'express',
      'koa2'
    ]
  }]
}
function getVueSidebar () {
      return [{
        title: 'Vue知识',
        collapsable: false,
        children: [
         'vue',
         'vue-router',
         'vue-vuex'
        ]
      }]
}
function getReactSidebar () {
  return [{
    title: 'React知识',
    collapsable: false,
    children: [
      'react',
      'react-router'
    ]
  }]
}

function getToolSidebar () {
  return [{
    title: 'tools',
    collapsable: false,
    children: [
      'webpack',
      'gulp'
    ]
  }]
}
function getPythonSidebar () {
  return [{
    title: 'Python',
    collapsable: false,
    children: [
      'python'
    ]
  }]
}