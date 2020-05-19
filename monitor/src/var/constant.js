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
