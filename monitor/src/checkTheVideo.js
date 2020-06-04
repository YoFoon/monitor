import monitor from './core';
import initDebugTool from './utils/initDebugTool';
import { HTTP_PROJECT_INFO } from './var/constant';

monitor.extend({
  checkTheVideo: function() {
    /**
     * 如果localStorage里边没有debug的连接状态，则发送一条请求获取连线状态
     * 如果localStorage里边有debug的连接状态，则无需发送请求获取连线状态，
     * 后续根据upLog的返回值来获取连线状态
     */
    var debugConnectStatus = localStorage.ds;
    if (!debugConnectStatus) {
      // 如果没有这个值，发送一条请求，确定连线状态, 并确定是否启动
      var wmUserInfo = localStorage.wmUserInfo ? JSON.parse(localStorage.wmUserInfo) : {};
      utils.ajax(
        'GET',
        HTTP_PROJECT_INFO + '?webMonitorId=' + WEB_MONITOR_ID + '&userId=' + wmUserInfo.userId,
        {},
        function(res) {
          localStorage.ds = (res && res.data && res.data.d) || 'disconnect';
          localStorage.sl = (res && res.data && res.data.s) || '012345';
          if (localStorage.ds == 'connected') {
            if (monitor.stopTheVideo) return;
            initDebugTool();
          }
        },
      );
    } else if (debugConnectStatus === 'connected') {
      // debug连线状态，允许上传录屏信息
      if (monitor.stopTheVideo) return;
      initDebugTool();
    } else if (debugConnectStatus === 'disconnect') {
      // debug连线状态断开，停止上传录屏信息
      if (monitor.stopTheVideo) {
        monitor.stopTheVideo();
        monitor.stopTheVideo = null;
      }
    }
  },
});
