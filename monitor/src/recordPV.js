import monitor from './core';
import CustomerPV from './modules/customerPV';
import { CUSTOMER_PV, RESOURCES } from './var/constant';
import getCookie from './utils/getCookie';
import setPageKey from './utils/setPageKey';
monitor.extend({
  customerPV: function() {
    setPageKey();
    var loadType = 'load';
    if (RESOURCES) {
      if (RESOURCES[0] && RESOURCES[0].type === 'navigate') {
        loadType = 'load';
      } else {
        loadType = 'reload';
      }
    }
    // 判断是否是新用户  开始
    var customerKey = getCookie('monitorCustomerKey');
    if (customerKey) {
      var newStatus = '';
      var customerKeyArr = customerKey ? customerKey.match(/\d{13}/g) : [];
      if (customerKeyArr && customerKeyArr.length > 0) {
        var tempTime = parseInt(customerKeyArr[0], 10);
        var currentTime = new Date().getTime();
        if (currentTime - tempTime > 1000) {
          newStatus = 'old';
        } else {
          newStatus = 'new';
        }
      }
    }
    // 判断是否是新用户  结束
    var customerPv = new CustomerPV(CUSTOMER_PV, loadType, 0, newStatus);
    console.log(customerPv);
    customerPv.handleLogInfo(CUSTOMER_PV, customerPv);
  },
});

export default monitor;
