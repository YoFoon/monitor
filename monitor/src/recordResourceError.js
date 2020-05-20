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
});

export default monitor;
