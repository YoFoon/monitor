import monitor from './core';
import ResourceLoadInfo from './modules/ResourceLoadInfo';
import { RESOURCE_LOAD } from './var/constant';
monitor.extend({
  recordResourceError: function() {
    // 当浏览器不支持 window.performance.getEntries 的时候，用下边这种方式
    window.addEventListener(
      'error',
      function(e) {
        var typeName = e.target.localName;
        var sourceUrl = '';
        if (typeName === 'link') {
          sourceUrl = e.target.href;
        } else if (typeName === 'script') {
          sourceUrl = e.target.src;
        }
        var resourceLoadInfo = new ResourceLoadInfo(RESOURCE_LOAD, sourceUrl, typeName, '0');
        console.log(resourceLoadInfo);
        resourceLoadInfo.handleLogInfo(RESOURCE_LOAD, resourceLoadInfo);
      },
      true,
    );
  },
  /**
   * 利用window.performance.getEntries来对比静态资源是否加载成功
   */
  performanceGetEntries: function() {
    /**
     * 判断静态资源是否加载成功, 将没有成功加载的资源文件作为js错误上报
     */
    if (window.performance && typeof window.performance.getEntries === 'function') {
      // 获取所有的静态资源文件加载列表
      var entries = window.performance.getEntries();
      var scriptArray = entries.filter(function(entry) {
        return entry.initiatorType === 'script';
      });
      var linkArray = entries.filter(function(entry) {
        return entry.initiatorType === 'link';
      });

      // 获取页面上所有的script标签, 并筛选出没有成功加载的静态资源
      var scripts = [];
      var scriptObjects = document.getElementsByTagName('script');
      for (var i = 0; i < scriptObjects.length; i++) {
        if (scriptObjects[i].src) {
          scripts.push(scriptObjects[i].src);
        }
      }
      var errorScripts = scripts.filter(function(script) {
        var flag = true;
        for (var i = 0; i < scriptArray.length; i++) {
          if (scriptArray[i].name === script) {
            flag = false;
            break;
          }
        }
        return flag;
      });

      // 获取所有的link标签
      var links = [];
      var linkObjects = document.getElementsByTagName('link');
      for (var i = 0; i < linkObjects.length; i++) {
        if (linkObjects[i].href) {
          links.push(linkObjects[i].href);
        }
      }
      var errorLinks = links.filter(function(link) {
        var flag = true;
        for (var i = 0; i < linkArray.length; i++) {
          if (linkArray[i].name === link) {
            flag = false;
            break;
          }
        }
        return flag;
      });
      for (var m = 0; m < errorScripts.length; m++) {
        var resourceLoadInfo = new ResourceLoadInfo(RESOURCE_LOAD, errorScripts[m], 'script', '0');
        resourceLoadInfo.handleLogInfo(RESOURCE_LOAD, resourceLoadInfo);
      }
      for (var m = 0; m < errorLinks.length; m++) {
        var resourceLoadInfo = new ResourceLoadInfo(RESOURCE_LOAD, errorLinks[m], 'link', '0');
        resourceLoadInfo.handleLogInfo(RESOURCE_LOAD, resourceLoadInfo);
      }
    }
  },
});

export default monitor;
