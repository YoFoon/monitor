import MonitorBaseInfo from './monitorBaseInfo';
import b64EncodeUnicode from '../utils/b64EncodeUnicode';
import getPageKey from '../utils/getPageKey';
import { DEVICE_INFO, USER_INFO } from '../var/constant';

class CustomerPV extends MonitorBaseInfo {
  constructor(uploadType, loadType, loadTime, newStatus) {
    super();
    this.uploadType = uploadType;
    this.projectVersion = b64EncodeUnicode(USER_INFO.projectVersion || ''); // 版本号， 用来区分监控应用的版本，更有利于排查问题
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
    this.loadType = loadType; // 用以区分首次加载
    this.loadTime = loadTime; // 加载时间
    this.newStatus = newStatus; // 是否为新用户
  }
}

export default CustomerPV;
