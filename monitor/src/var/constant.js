import getDevice from '../utils/getDevice';

// 用户访问日志类型
export const CUSTOMER_PV = 'CUSTOMER_PV';
// 用户加载页面信息类型
export const LOAD_PAGE = 'LOAD_PAGE';
// 接口日志类型
export const HTTP_LOG = 'HTTP_LOG';
// 接口错误日志类型
export const HTTP_ERROR = 'HTTP_ERROR';
// js报错日志类型
export const JS_ERROR = 'JS_ERROR';
// 截屏类型
export const SCREEN_SHOT = 'SCREEN_SHOT';
// 用户的行为类型
export const ELE_BEHAVIOR = 'ELE_BEHAVIOR';
// 静态资源类型
export const RESOURCE_LOAD = 'RESOURCE_LOAD';
// 用户自定义行为类型
export const CUSTOMIZE_BEHAVIOR = 'CUSTOMIZE_BEHAVIOR';
// 用户录屏事件类型
export const VIDEOS_EVENT = 'VIDEOS_EVENT';
// 浏览器信息
export const BROWSER_INFO = window.navigator.userAgent;
// 页面加载对象属性
export const TIMING = performance && performance.timing;
// 监控平台地址
export const WEB_MONITOR_IP = '127.0.0.1:7001';
// 判断是http或是https的项目
export const WEB_HTTP_TYPE = window.location.href.indexOf('https') === -1 ? 'http://' : 'https://';
// 上传数据的uri 区分了本地和生产环境
export const HTTP_UPLOAD_URI = WEB_HTTP_TYPE + WEB_MONITOR_IP;
// 上传数据的接口API
export const HTTP_UPLOAD_LOG_API = '/server/upLog';
// 上传debug数据的接口API
export const HTTP_UPLOAD_DEBUG_LOG_API = '/server/upDLog';
// 上传数据时忽略的uri, 需要过滤掉上报接口
export const WEB_MONITOR_IGNORE_URL = HTTP_UPLOAD_URI + HTTP_UPLOAD_LOG_API;
// 上传数据的接口
export const HTTP_UPLOAD_LOG_INFO = HTTP_UPLOAD_URI + HTTP_UPLOAD_LOG_API;
// 上传debug数据的接口
export const HTTP_UPLOAD_DEBUG_LOG_INFO = HTTP_UPLOAD_URI + HTTP_UPLOAD_DEBUG_LOG_API;
// 获取当前项目的参数信息的接口
export const HTTP_PROJECT_INFO = HTTP_UPLOAD_URI + '/server/pf';
// 上传埋点数据接口
export const HTTP_UPLOAD_RECORD_DATA = HTTP_UPLOAD_URI + '';
// 获取页面加载的具体属性
let resources = null;
if (performance && typeof performance.getEntries === 'function') {
  resources = performance.getEntries();
}
export const RESOURCES = resources;
// 获取设备信息
export const DEVICE_INFO = getDevice();
//获取用户信息
export const USER_INFO = localStorage.wmUserInfo ? JSON.parse(localStorage.wmUserInfo) : {};
// 获取当前页面的URL
export const WEB_LOCATION = window.location.href;

export const TYPE_LIST = [
  'ELE_BEHAVIOR',
  'JS_ERROR',
  'HTTP_LOG',
  'SCREEN_SHOT',
  'CUSTOMER_PV',
  'LOAD_PAGE',
  'RESOURCE_LOAD',
  'CUSTOMIZE_BEHAVIOR',
  'VIDEOS_EVENT',
];
