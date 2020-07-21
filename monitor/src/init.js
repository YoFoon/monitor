import monitor from './core';
import ajax from './utils/ajax';
import { TYPE_LIST, HTTP_UPLOAD_LOG_INFO } from './var/constant';
monitor.extend({
  init: function() {
    try {
      monitor.customerPV();
      monitor.recordResourceError();
      monitor.recordJavaScriptError();
      monitor.recordHttpLog();
      monitor.recordLoadPage();
      monitor.recordBehavior();
      /**
       * 添加一个定时器，进行数据的上传
       * 200毫秒钟进行一次URL是否变化的检测
       * 8秒钟进行一次数据的检查并上传; PS: 这个时间有可能跟后台服务的并发量有着直接关系，谨慎设置
       */
      var timeCount = 0;
      var waitTimes = 0;
      var typeList = TYPE_LIST;
      setInterval(function() {
        monitor.checkUrlChange();
        // 进行一次上传
        if (timeCount >= 0) {
          // 如果是本地的localhost, 就忽略，不进行上传
          // if (window.location.href.indexOf("localhost") != -1) return;
          var logInfo = '';
          for (var i = 0; i < typeList.length; i++) {
            logInfo += localStorage[typeList[i]] || '';
          }
          // 收集到日志的数量如果小于10，则不进行上传，减少后台服务短时间内的并发量。
          // 如果，经过3次判断还没有收集到10个日志，则进行上传
          // 风险：有可能会丢失掉用户最后一段时间的操作信息，如果，最后几步操作信息很重要，可以选择删除这段逻辑
          var logInfoCount = logInfo.split('$$$').length;
          if (logInfoCount < 10 && waitTimes < 1) {
            waitTimes++;
            timeCount = 0;
            return;
          }
          waitTimes = 0;
          console.log(logInfo)
          logInfo.length > 0 &&
            ajax(
              'POST',
              HTTP_UPLOAD_LOG_INFO,
              { data: logInfo },
              function(res) {
                for (var i = 0; i < typeList.length; i++) {
                  localStorage[typeList[i]] = '';
                }
                if (res && res.data && res.data.d) {
                  localStorage.ds = res.data.d == 'c' ? 'connected' : 'disconnect';
                  localStorage.sl = res.data.s || '012345';
                }
              },
              function() {
                // 如果失败了， 也需要清理掉本地缓存， 否则会积累太多
                for (var i = 0; i < typeList.length; i++) {
                  localStorage[typeList[i]] = '';
                }
              },
            );
          timeCount = 0;
        }
        timeCount++;
      }, 200);
    } catch (e) {
      console.error('监控代码异常，捕获', e);
    }
  },
});

export default monitor;
