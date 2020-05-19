export default function(name) {
  var arr;
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (document.cookie.match(reg)) {
    arr = document.cookie.match(reg);
    return unescape(arr[2]);
  }
  return '';
}
