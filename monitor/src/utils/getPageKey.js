import getUuid from './getUuid';
export default function() {
  var pageKey = getUuid();
  var reg = /^[0-9a-z]{8}(-[0-9a-z]{4}){3}-[0-9a-z]{12}-\d{13}$/;
  if (!localStorage.monitorPageKey) {
    localStorage.monitorPageKey = pageKey;
  } else if (!reg.test(localStorage.monitorPageKey)) {
    localStorage.monitorPageKey = pageKey;
  }
  return localStorage.monitorPageKey;
}
