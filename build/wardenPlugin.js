const jsdom = require('jsdom');
//操作DOM要在这引入找个包
const { JSDOM } = jsdom;
var timer = Date.now();

function Warden(options) {
  this.options = options;
}

Warden.prototype.apply = function(compiler) {
  compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-before-html-processing', data => {
      //这里的data是打包要生成的文件，可进行修改操作
      const dom = new JSDOM(data.html, {
        features: {
          FetchExternalResources: ['script', 'css'],
          QuerySelector: true,
        },
      });
      const body = dom.window.document.getElementsByTagName('body')[0];
      scriptDom = dom.window.document.createElement('script');
      scriptDom.type = 'text/javascript';
      scriptDom.src = `${this.options.url || 'http://www.hunliji.com/ssss.js'}?t=${this.options
        .timer || timer}`;
      scriptDom.async = true;
      body.appendChild(scriptDom);
      data.html = dom.serialize(); //把修改的DOM树附上去，然后返回出去
      // cb(null, data);
    });
  });
};

module.exports = Warden;
