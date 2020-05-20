import MonitorBaseInfo from './monitorBaseInfo';
import b64EncodeUnicode from '../utils/b64EncodeUnicode';

class ResourceLoadInfo extends MonitorBaseInfo {
  constructor(uploadType, url, elementType, status) {
    super();
    this.uploadType = uploadType;
    this.elementType = elementType;
    this.sourceUrl = b64EncodeUnicode(encodeURIComponent(url));
    this.status = status; // 资源加载状态： 0/失败、1/成功
  }
}

export default ResourceLoadInfo;
