import { TYPE_LIST, HTTP_UPLOAD_DEBUG_LOG_INFO } from '../var/constant';
import b64EncodeUnicode from './b64EncodeUnicode';
import loadJs from './loadJs';
import monitor from '../core';
import ajax from './ajax';

export default function() {
  var wmUserInfo = localStorage.wmUserInfo ? JSON.parse(localStorage.wmUserInfo) : {};
  // 获取浏览器本地缓存（localStorage）信息
  var localInfo = {};
  for (key in localStorage) {
    if (
      typeof localStorage[key] == 'function' ||
      TYPE_LIST.indexOf(key) != -1 ||
      localStorage[key].length > 1000
    ) {
      continue;
    }
    localInfo[key] = localStorage[key];
  }
  try {
    localInfo = b64EncodeUnicode(JSON.stringify(localInfo));
  } catch (e) {
    localInfo = '';
  }
  // 获取浏览器本地缓存（sessionStorage）信息
  var sessionInfo = {};
  for (key in sessionStorage) {
    if (
      typeof sessionStorage[key] == 'function' ||
      TYPE_LIST.indexOf(key) != -1 ||
      sessionStorage[key].length > 1000
    ) {
      continue;
    }
    sessionInfo[key] = sessionStorage[key];
  }
  try {
    sessionInfo = b64EncodeUnicode(JSON.stringify(sessionInfo));
  } catch (e) {
    sessionInfo = '';
  }
  // 获取浏览器Cookie里的信息
  var cookieInfo = b64EncodeUnicode(document.cookie);
  ajax(
    'POST',
    HTTP_UPLOAD_DEBUG_LOG_INFO,
    { localInfo: localInfo, sessionInfo: sessionInfo, cookieInfo: cookieInfo },
    function() {},
  );

  // 重写console.log, console.warn 方法，获取打印信息
  function reWriteConsole(params) {
    var arr = [];
    var len = params.length;
    for (var i = 0; i < len; i++) {
      arr.push(params[i]);
    }
    var tempObj = {};
    tempObj.log = arr;
    tempObj.userId = wmUserInfo.userId;
    tempObj.happenTime = new Date().getTime();
    var consoleInfo = b64EncodeUnicode(encodeURIComponent(JSON.stringify(tempObj)));
    return consoleInfo;
  }
  var oldLog = console.log;
  var oldWarn = console.warn;
  console.log = function() {
    var consoleInfo = reWriteConsole(arguments);
    ajax('POST', HTTP_UPLOAD_DEBUG_LOG_INFO, { consoleInfo: consoleInfo }, function() {});
    return oldLog.apply(console, arguments);
  };
  console.warn = function() {
    var warnInfo = reWriteConsole(arguments);
    ajax('POST', HTTP_UPLOAD_DEBUG_LOG_INFO, { warnInfo: warnInfo }, function() {});
    return oldWarn.apply(console, arguments);
  };
  // 加载js压缩工具
  loadJs('//cdn.bootcss.com/lz-string/1.4.4/lz-string.js', function() {
    // 加载录屏机制
    loadJs('//cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js', function() {
      monitor.stopTheVideo = rrweb.record({
        emit: function(event) {
          var videosInfo = { event: event, userId: wmUserInfo.userId };
          videosInfo = JSON.stringify(videosInfo);
          ajax('POST', HTTP_UPLOAD_DEBUG_LOG_INFO, { videosInfo: videosInfo }, function() {});
        },
      });
    });
  });
}
