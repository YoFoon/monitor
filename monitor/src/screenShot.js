import monitor from './core';
import ScreenShotInfo from './modules/screenShotInfo';
import { SCREEN_SHOT } from './var/constant';

monitor.extend({
  screenShot: function(cntElem, description) {
    var shareContent = cntElem; //需要截图的包裹的（原生的）DOM 对象
    var width = shareContent.offsetWidth; //获取dom 宽度
    var height = shareContent.offsetHeight; //获取dom 高度
    var canvas = document.createElement('canvas'); //创建一个canvas节点
    var scale = 0.3; //定义任意放大倍数 支持小数
    canvas.style.display = 'none';
    canvas.width = width * scale; //定义canvas 宽度 * 缩放
    canvas.height = height * scale; //定义canvas高度 *缩放
    canvas.getContext('2d').scale(scale, scale); //获取context,设置scale
    var opts = {
      scale: scale, // 添加的scale 参数
      canvas: canvas, //自定义 canvas
      logging: false, //日志开关，便于查看html2canvas的内部执行流程
      width: width, //dom 原始宽度
      height: height,
      useCORS: true, // 【重要】开启跨域配置
    };

    window.html2canvas &&
      window.html2canvas(cntElem, opts).then(function(canvas) {
        var dataURL = canvas.toDataURL('image/webp');
        var tempCompress = dataURL.replace('data:image/webp;base64,', '');
        var compressedDataURL = utils.b64EncodeUnicode(tempCompress);
        var screenShotInfo = new ScreenShotInfo(SCREEN_SHOT, description, compressedDataURL);
        screenShotInfo.handleLogInfo(SCREEN_SHOT, screenShotInfo);
      });
  },
});
