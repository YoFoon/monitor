window.WEB_MONITOR_ID = '111';

import monitor from './core';
import './polyfill';
import './common/index';
/**
 * 屏幕截图
 */
import './screenShot';
/**
 * 屏幕录制
 */
import './checkTheVideo';
/**
 * 用户加载页面信息监控
 */
import './recordLoadPage';
/**
 * 用户访问记录监控
 */
import './recordPV';
/**
 * 监控页面静态资源加载报错
 */
import './recordResourceError';
/**
 * 页面JS错误监控
 */
import './recordJavaScriptError';
/**
 * 页面接口请求监控
 */
import './recordHttpLog';
/**
 * 用户行为记录监控
 */
import './recordBehavior';

/**
 * 初始化
 */
import './init';
monitor.init();

export default monitor;
