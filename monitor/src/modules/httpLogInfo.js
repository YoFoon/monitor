import MonitorBaseInfo from './monitorBaseInfo';
import b64EncodeUnicode from '../utils/b64EncodeUnicode';

class HttpLogInfo extends MonitorBaseInfo {
  constructor(
    uploadType,
    httpSimpleUrl,
    url,
    status,
    statusText,
    statusResult,
    responseText,
    currentTime,
    loadTime,
  ) {
    super();
    this.uploadType = uploadType; // 上传类型
    this.httpSimpleUrl = httpSimpleUrl;
    this.httpUrl = b64EncodeUnicode(encodeURIComponent(url)); // 请求地址
    this.status = status; // 接口状态
    this.statusText = statusText; // 状态描述
    this.statusResult = statusResult; // 区分发起和返回状态
    this.requestText = ''; // 请求参数的JSON字符串
    this.responseText = b64EncodeUnicode(responseText); // 返回的结果JSON字符串
    this.happenTime = currentTime; // 客户端发送时间
    this.loadTime = loadTime; // 接口请求耗时
  }
}

export default HttpLogInfo;
