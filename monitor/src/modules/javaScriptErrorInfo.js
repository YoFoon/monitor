import MonitorBaseInfo from './monitorBaseInfo';
import b64EncodeUnicode from '../utils/b64EncodeUnicode';
import getPageKey from '../utils/getPageKey';
import { DEVICE_INFO } from '../var/constant';

class JavaScriptErrorInfo extends MonitorBaseInfo {
  constructor(uploadType, infoType, errorMsg, errorStack) {
    super();
    this.uploadType = uploadType;
    this.infoType = infoType;
    this.pageKey = getPageKey(); // 用于区分页面，所对应唯一的标识，每个新页面对应一个值
    this.deviceName = DEVICE_INFO.deviceName;
    this.os = DEVICE_INFO.os + (DEVICE_INFO.osVersion ? ' ' + DEVICE_INFO.osVersion : '');
    this.browserName = DEVICE_INFO.browserName;
    this.browserVersion = DEVICE_INFO.browserVersion;
    // TODO 位置信息, 待处理
    this.monitorIp = ''; // 用户的IP地址
    this.country = 'china'; // 用户所在国家
    this.province = ''; // 用户所在省份
    this.city = ''; // 用户所在城市
    this.errorMessage = b64EncodeUnicode(errorMsg);
    this.errorStack = b64EncodeUnicode(errorStack);
    this.browserInfo = '';
  }
}

export default JavaScriptErrorInfo;
