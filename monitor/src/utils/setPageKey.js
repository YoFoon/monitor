import getUuid from './getUuid';
export default function() {
  localStorage.monitorPageKey = getUuid();
}
