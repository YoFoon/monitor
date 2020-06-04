// JS错误截图
import MonitorBaseInfo from './monitorBaseInfo';
import b64EncodeUnicode from '../utils/b64EncodeUnicode';

class ScreenShotInfo extends MonitorBaseInfo {
  constructor(uploadType, des, screenInfo, imgType) {
    super();
    this.uploadType = uploadType;
    this.description = b64EncodeUnicode(des);
    this.screenInfo = screenInfo;
    this.imgType = imgType || 'jpeg';
  }
}

export default ScreenShotInfo;
