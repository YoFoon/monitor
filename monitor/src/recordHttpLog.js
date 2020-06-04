import monitor from './core';
import HttpLogInfo from './modules/httpLogInfo';
import { HTTP_LOG, HTTP_UPLOAD_LOG_API, HTTP_UPLOAD_DEBUG_LOG_API } from './var/constant';

monitor.extend({
  recordHttpLog: function() {
    // 监听ajax的状态
    function ajaxEventTrigger(event) {
      var ajaxEvent = new CustomEvent(event, { detail: this });
      window.dispatchEvent(ajaxEvent);
    }
    var oldXHR = window.XMLHttpRequest;
    function newXHR() {
      var realXHR = new oldXHR();
      realXHR.addEventListener(
        'abort',
        function() {
          ajaxEventTrigger.call(this, 'ajaxAbort');
        },
        false,
      );
      realXHR.addEventListener(
        'error',
        function() {
          ajaxEventTrigger.call(this, 'ajaxError');
        },
        false,
      );
      realXHR.addEventListener(
        'load',
        function() {
          ajaxEventTrigger.call(this, 'ajaxLoad');
        },
        false,
      );
      realXHR.addEventListener(
        'loadstart',
        function() {
          ajaxEventTrigger.call(this, 'ajaxLoadStart');
        },
        false,
      );
      realXHR.addEventListener(
        'progress',
        function() {
          ajaxEventTrigger.call(this, 'ajaxProgress');
        },
        false,
      );
      realXHR.addEventListener(
        'timeout',
        function() {
          ajaxEventTrigger.call(this, 'ajaxTimeout');
        },
        false,
      );
      realXHR.addEventListener(
        'loadend',
        function() {
          ajaxEventTrigger.call(this, 'ajaxLoadEnd');
        },
        false,
      );
      realXHR.addEventListener(
        'readystatechange',
        function() {
          ajaxEventTrigger.call(this, 'ajaxReadyStateChange');
        },
        false,
      );
      // 此处的捕获的异常会连日志接口也一起捕获，如果日志上报接口异常了，就会导致死循环了。
      // realXHR.onerror = function () {
      //   siftAndMakeUpMessage("Uncaught FetchError: Failed to ajax", WEB_LOCATION, 0, 0, {});
      // }
      return realXHR;
    }
    function handleHttpResult(i, tempResponseText) {
      if (!timeRecordArray[i] || timeRecordArray[i].uploadFlag === true) {
        return;
      }
      var responseText = '';
      if (tempResponseText && responseText.length < 500) {
        try {
          responseText = tempResponseText
            ? JSON.stringify(encryptObj(JSON.parse(tempResponseText)))
            : '';
        } catch (e) {
          responseText = '';
        }
      } else {
        responseText = 'data is too long';
      }
      var simpleUrl = timeRecordArray[i].simpleUrl;
      var currentTime = new Date().getTime();
      var url = timeRecordArray[i].event.detail.responseURL;
      var status = timeRecordArray[i].event.detail.status;
      var statusText = timeRecordArray[i].event.detail.statusText;
      var loadTime = currentTime - timeRecordArray[i].timeStamp;
      if (
        !url ||
        url.indexOf(HTTP_UPLOAD_LOG_API) != -1 ||
        url.indexOf(HTTP_UPLOAD_DEBUG_LOG_API) != -1
      )
        return;
      var httpLogInfoStart = new HttpLogInfo(
        HTTP_LOG,
        simpleUrl,
        url,
        status,
        statusText,
        '发起请求',
        '',
        timeRecordArray[i].timeStamp,
        0,
      );
      httpLogInfoStart.handleLogInfo(HTTP_LOG, httpLogInfoStart);
      var httpLogInfoEnd = new HttpLogInfo(
        HTTP_LOG,
        simpleUrl,
        url,
        status,
        statusText,
        '请求返回',
        responseText,
        currentTime,
        loadTime,
      );
      httpLogInfoEnd.handleLogInfo(HTTP_LOG, httpLogInfoEnd);
      // 当前请求成功后就，就将该对象的uploadFlag设置为true, 代表已经上传了
      timeRecordArray[i].uploadFlag = true;
    }

    var timeRecordArray = [];
    window.XMLHttpRequest = newXHR;
    window.addEventListener('ajaxLoadStart', function(e) {
      var tempObj = {
        timeStamp: new Date().getTime(),
        event: e,
        simpleUrl: window.location.href.split('?')[0].replace('#', ''),
        uploadFlag: false,
      };
      timeRecordArray.push(tempObj);
    });

    window.addEventListener('ajaxLoadEnd', function() {
      for (var i = 0; i < timeRecordArray.length; i++) {
        // uploadFlag == true 代表这个请求已经被上传过了
        if (timeRecordArray[i].uploadFlag === true) continue;
        if (timeRecordArray[i].event.detail.status > 0) {
          var rType = (timeRecordArray[i].event.detail.responseType + '').toLowerCase();
          if (rType === 'blob') {
            (function(index) {
              var reader = new FileReader();
              reader.onload = function() {
                var responseText = reader.result; //内容就在这里
                handleHttpResult(index, responseText);
              };
              try {
                reader.readAsText(timeRecordArray[i].event.detail.response, 'utf-8');
              } catch (e) {
                handleHttpResult(index, timeRecordArray[i].event.detail.response + '');
              }
            })(i);
          } else {
            try {
              var xhr =
                timeRecordArray[i] && timeRecordArray[i].event && timeRecordArray[i].event.detail;
              if (!xhr) return;
              var resType = xhr.responseType;
              var resTxt = '';
              if (resType === '' || resType === 'text') resTxt = xhr.responseText;
              if (resType === 'json') resTxt = JSON.stringify(xhr.response);
              handleHttpResult(i, resTxt);
            } catch (e) {}
          }
        }
      }
    });
  },
});
