import monitor from './core';
import { WEB_LOCATION, JS_ERROR } from './var/constant';
import JavaScriptErrorInfo from './modules/javaScriptErrorInfo';
monitor.extend({
  recordJavaScriptError: function() {
    function siftAndMakeUpMessage(
      infoType,
      origin_errorMsg,
      origin_url,
      origin_lineNumber,
      origin_columnNumber,
      origin_errorObj,
    ) {
      // 记录js错误前，检查一下url记录是否变化
      monitor.checkUrlChange();
      var errorMsg = origin_errorMsg ? origin_errorMsg : '';
      var errorObj = origin_errorObj ? origin_errorObj : '';
      var errorType = '';
      if (errorMsg) {
        if (typeof errorObj === 'string') {
          errorType = errorObj.split(': ')[0].replace('"', '');
        } else {
          var errorStackStr = JSON.stringify(errorObj);
          errorType = errorStackStr.split(': ')[0].replace('"', '');
        }
      }
      var javaScriptErrorInfo = new JavaScriptErrorInfo(
        JS_ERROR,
        infoType,
        errorType + ': ' + errorMsg,
        errorObj,
      );
      console.log(javaScriptErrorInfo);
      javaScriptErrorInfo.handleLogInfo(JS_ERROR, javaScriptErrorInfo);
    }
    // 重写console.error, 可以捕获更全面的报错信息
    var oldError = console.error;
    console.error = function(tempErrorMsg) {
      var errorMsg = (arguments[0] && arguments[0].message) || tempErrorMsg;
      var lineNumber = 0;
      var columnNumber = 0;
      var errorObj = arguments[0] && arguments[0].stack;
      if (!errorObj) {
        if (typeof errorMsg == 'object') {
          try {
            errorMsg = JSON.stringify(errorMsg);
          } catch (e) {
            errorMsg = '错误无法解析';
          }
        }
        siftAndMakeUpMessage(
          'console_error',
          errorMsg,
          WEB_LOCATION,
          lineNumber,
          columnNumber,
          'CustomizeError: ' + errorMsg,
        );
      } else {
        // 如果报错中包含错误堆栈，可以认为是JS报错，而非自定义报错
        siftAndMakeUpMessage(
          'on_error',
          errorMsg,
          WEB_LOCATION,
          lineNumber,
          columnNumber,
          errorObj,
        );
      }
      return oldError.apply(console, arguments);
    };
    // 重写 onerror 进行jsError的监听
    window.onerror = function(errorMsg, url, lineNumber, columnNumber, errorObj) {
      monitor.jsMonitorStarted = true;
      var errorStack = errorObj ? errorObj.stack : null;
      siftAndMakeUpMessage('on_error', errorMsg, url, lineNumber, columnNumber, errorStack);
    };
    window.onunhandledrejection = function(e) {
      var errorMsg = '';
      var errorStack = '';
      if (typeof e.reason === 'object') {
        errorMsg = e.reason.message;
        errorStack = e.reason.stack;
      } else {
        errorMsg = e.reason;
        errorStack = '';
      }
      siftAndMakeUpMessage(
        'on_error',
        errorMsg,
        WEB_LOCATION,
        0,
        0,
        'UncaughtInPromiseError: ' + errorStack,
      );
    };
  },
});

export default monitor;
