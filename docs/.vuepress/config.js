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
    nav: [
      { text: 'Vue', link:'/vue/vue'},
      { text: 'React',link:'/react/react'},
      { text: 'Node',link:'/node/node'},
      { text: 'Python',link:'/python/python'},
      { text: 'Tool',link:'/tool/webpack'},
      { text: 'GitHub',link:'https://github.com/hbbaly'},
    ],
    sidebar: {
      '/vue/vue': getVueSidebar(),
      '/react/react':getReactSidebar(),
      '/node/node':getNodeSidebar(),
      '/tool/webpack':getToolSidebar(),
      '/python/python':getPythonSidebar()
    }
  }
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
  function getNodeSidebar () {
    return [{
      title: 'Node知识',
      collapsable: false,
      children: [
       'node',
       'express',
       'koa2'
      ]
    }]
  }
  function getToolSidebar () {
    return [{
      title: '工具',
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