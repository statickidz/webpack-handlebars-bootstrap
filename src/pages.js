const pages = [
  {
    output: './index.html',
    content: {
      title: 'Home',
      description: 'Home Page'
    },
    template: './src/pages/home.hbs'
  },
  {
    output: './about/index.html',
    content: {
      title: 'About',
      description: 'About Page'
    },
    template: './src/pages/about.hbs'
  }
]

module.exports = pages
