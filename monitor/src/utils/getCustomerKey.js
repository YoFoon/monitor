import getCookie from './getCookie';
import getUuid from './getUuid';
import monitor from '../core';
export default function() {
  var customerKey = getUuid();
  var monitorCustomerKey = getCookie('monitorCustomerKey');
  if (!monitorCustomerKey) {
    var extraTime = 60 * 30 * 24 * 3600 * 1000; // cookie 30天后过期时间
    var exp = new Date();
    exp.setTime(exp.getTime() + extraTime);
    if (monitor.MAIN_DOMAIN) {
      document.cookie =
        'monitorCustomerKey=' +
        customerKey +
        ';Path=/;domain=' +
        monitor.MAIN_DOMAIN +
        ';expires=' +
        exp.toGMTString();
    } else {
      document.cookie =
        'monitorCustomerKey=' + customerKey + ';Path=/;expires=' + exp.toGMTString();
    }
    monitorCustomerKey = customerKey;
  }
  return monitorCustomerKey;
}
