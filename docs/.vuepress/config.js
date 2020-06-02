module.exports = {
  port: '5000',
  dest: 'public',
  base: '/zto-share/',
  title: 'ZTO Share',
  themeConfig: {
    // logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' }
    ],
    sidebar: {
      '/': [
        { title: '关于Git', path: '/git/', collapsable: false }
      ]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        
        '@assets': '/assets'
      }
    }
  }
}
