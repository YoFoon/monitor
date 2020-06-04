window.WEB_MONITOR_ID = '111';

import monitor from './core';
import './polyfill';
import './common/index';
/**
 * 用户加载页面信息监控
 */
import './recordLoadPage';
monitor.recordLoadPage();

/**
 * 用户访问记录监控
 */
import './recordPV';
monitor.customerPV();

/**
 * 监控页面静态资源加载报错
 */
import './recordResourceError';
monitor.recordResourceError();
/**
 * 页面JS错误监控
 */
import './recordJavaScriptError';
monitor.recordJavaScriptError();

/**
 * 页面接口请求监控
 */
import './recordHttpLog';
monitor.recordHttpLog();

export default monitor;
