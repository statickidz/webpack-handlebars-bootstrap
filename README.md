<a href="https://raw.githubusercontent.com/statickidz/webpack-handlebars-bootstrap/master/LICENSE">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License" />
</a>

# Webpack 4 + Bootstrap 4 + Handlebars

Static site generator built with Webpack, Bootstrap and Handlebars.

![Webpack 4 + Bootstrap 4 + Handlebars](src/assets/images/screenshot.png?raw=true)

### Demo
[https://webpack-handlebars-bootstrap.netlify.com/](https://webpack-handlebars-bootstrap.netlify.com/)

### Installation

```
git clone https://github.com/statickidz/webpack-handlebars-bootstrap.git your-app-name
cd your-app-name
yarn install
```

### Run development

```
yarn start
```

### Build Static site for production

```
yarn build
```

### Netlify Deploy Build settings

* Add your repository normally
* Build command: webpack --config webpack-prod.config.js --colors --optimize-minimize
* Publish directory: dist

### Features:

* Static-site
* SEO friendly
* Webpack 4
* Bootstrap 4
* FontAwesome 5
* BrowserSync with localtunnel, xip.io, ...
* Hot Module Replacement
* ES6 Support via [babel-loader](https://github.com/babel/babel-loader)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
* Linting via [eslint-loader](https://github.com/MoOx/eslint-loader)
