/**
 * 封装简易的ajax请求, 只用于上传日志
 * @param method  请求类型(大写)  GET/POST
 * @param url     请求URL
 * @param param   请求参数
 * @param successCallback  成功回调方法
 * @param failCallback   失败回调方法
 */
export default function(method, url, param, successCallback, failCallback) {
  try {
    var xmlHttp = window.XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4) {
        var response = {};
        try {
          response = xmlHttp.responseText ? JSON.parse(xmlHttp.responseText) : {};
        } catch (e) {
          console.error(xmlHttp.responseText);
          response = {};
        }
        typeof successCallback == 'function' && successCallback(response);
      } else {
        typeof failCallback == 'function' && failCallback();
      }
    };
    var resultStr = JSON.stringify(param || {});
    xmlHttp.send(resultStr);
  } catch (e) {
    console.warn(e);
  }
}
