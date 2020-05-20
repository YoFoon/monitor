import {
  ELE_BEHAVIOR,
  JS_ERROR,
  HTTP_LOG,
  SCREEN_SHOT,
  CUSTOMER_PV,
  LOAD_PAGE,
  RESOURCE_LOAD,
  CUSTOMIZE_BEHAVIOR,
  VIDEOS_EVENT,
} from '../var/constant';
import b64EncodeUnicode from '../utils/b64EncodeUnicode';
import getCustomerKey from '../utils/getCustomerKey';

class MonitorBaseInfo {
  constructor() {
    this.happenTime = new Date().getTime(); // 日志发生时间
    this.webMonitorId = WEB_MONITOR_ID || ''; // 用于区分应用的唯一标识（一个项目对应一个）
    this.simpleUrl = window.location.href.split('?')[0].replace('#', ''); // 页面的url
    this.completeUrl = b64EncodeUnicode(encodeURIComponent(window.location.href)); // 页面的完整url
    this.customerKey = getCustomerKey(); // 用于区分用户，所对应唯一的标识，清理本地数据后失效，
    // 用户自定义信息， 由开发者主动传入， 便于对线上问题进行准确定位
    var wmUserInfo = localStorage.wmUserInfo ? JSON.parse(localStorage.wmUserInfo) : {};
    this.userId = wmUserInfo.userId;
    this.firstUserParam = b64EncodeUnicode(wmUserInfo.firstUserParam || '');
    this.secondUserParam = b64EncodeUnicode(wmUserInfo.secondUserParam || '');
  }
}

MonitorBaseInfo.prototype.handleLogInfo = function(type, logInfo) {
  var tempString = localStorage[type] ? localStorage[type] : '';
  switch (type) {
    case ELE_BEHAVIOR:
      localStorage[ELE_BEHAVIOR] = tempString + JSON.stringify(logInfo) + '$$$';
      break;
    case JS_ERROR:
      localStorage[JS_ERROR] = tempString + JSON.stringify(logInfo) + '$$$';
      break;
    case HTTP_LOG:
      localStorage[HTTP_LOG] = tempString + JSON.stringify(logInfo) + '$$$';
      break;
    case SCREEN_SHOT:
      localStorage[SCREEN_SHOT] = tempString + JSON.stringify(logInfo) + '$$$';
      break;
    case CUSTOMER_PV:
      localStorage[CUSTOMER_PV] = tempString + JSON.stringify(logInfo) + '$$$';
      break;
    case LOAD_PAGE:
      localStorage[LOAD_PAGE] = tempString + JSON.stringify(logInfo) + '$$$';
      break;
    case RESOURCE_LOAD:
      localStorage[RESOURCE_LOAD] = tempString + JSON.stringify(logInfo) + '$$$';
      break;
    case CUSTOMIZE_BEHAVIOR:
      localStorage[CUSTOMIZE_BEHAVIOR] = tempString + JSON.stringify(logInfo) + '$$$';
      break;
    case VIDEOS_EVENT:
      localStorage[VIDEOS_EVENT] = tempString + JSON.stringify(logInfo) + '$$$';
      break;
    default:
      break;
  }
};

export default MonitorBaseInfo;
