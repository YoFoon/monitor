import monitor from './core';
import { LOAD_PAGE, TIMING, RESOURCES } from './var/constant';
import LoadPageInfo from './modules/loadPageInfo';
monitor.extend({
  recordLoadPage: function() {
    console.log('recordLoadPage');
    monitor.addLoadEvent(function() {
      setTimeout(function() {
        if (RESOURCES) {
          var loadType = 'load';
          if (RESOURCES[0] && RESOURCES[0].type === 'navigate') {
            loadType = 'load';
          } else {
            loadType = 'reload';
          }

          var t = TIMING;
          var loadPageInfo = new LoadPageInfo(LOAD_PAGE);
          // 页面加载类型， 区分第一次load还是reload
          loadPageInfo.loadType = loadType;

          //【重要】页面加载完成的时间
          //【原因】这几乎代表了用户等待页面可用的时间
          loadPageInfo.loadPage = t.loadEventEnd - t.navigationStart;

          //【重要】解析 DOM 树结构的时间
          //【原因】反省下你的 DOM 树嵌套是不是太多了！
          loadPageInfo.domReady = t.domComplete - t.responseEnd;

          //【重要】重定向的时间
          //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
          loadPageInfo.redirect = t.redirectEnd - t.redirectStart;

          //【重要】DNS 查询时间
          //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
          // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
          loadPageInfo.lookupDomain = t.domainLookupEnd - t.domainLookupStart;

          //【重要】读取页面第一个字节的时间
          //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
          // TTFB 即 Time To First Byte 的意思
          // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
          loadPageInfo.ttfb = t.responseStart - t.navigationStart;

          //【重要】内容加载完成的时间
          //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
          loadPageInfo.request = t.responseEnd - t.requestStart;

          //【重要】执行 onload 回调函数的时间
          //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
          loadPageInfo.loadEvent = t.loadEventEnd - t.loadEventStart;

          // DNS 缓存时间
          loadPageInfo.appcache = t.domainLookupStart - t.fetchStart;

          // 卸载页面的时间
          loadPageInfo.unloadEvent = t.unloadEventEnd - t.unloadEventStart;

          // TCP 建立连接完成握手的时间
          loadPageInfo.connect = t.connectEnd - t.connectStart;
          console.log(loadPageInfo);
          loadPageInfo.handleLogInfo(LOAD_PAGE, loadPageInfo);
        }
        // 此方法有漏洞，暂时先注释掉
        // monitor.performanceGetEntries();

        // 页面加载完成后，检查是否需要录屏，因为这个时候userId才有可能被设置进来
        // checkTheVideo();
      }, 1000);
    });
  },
});

export default monitor;
