import monitor from '../core';
monitor.extend({
  checkUrlChange: function() {
    // 如果是单页应用， 只更改url
    var webLocation = window.location.href.split('?')[0].replace('#', '');
    // 如果url变化了， 就把更新的url记录为 defaultLocation, 重新设置pageKey
    if (monitor.defaultLocation != webLocation) {
      monitor.recordPV();
      monitor.defaultLocation = webLocation;
    }
  },
});

export default monitor;
