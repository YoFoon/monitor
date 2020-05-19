window.WEB_MONITOR_ID = '111';

import monitor from './core';
import './recordLoadPage';
monitor.recordLoadPage();
import './recordPV';
monitor.customerPV();

export default monitor;
