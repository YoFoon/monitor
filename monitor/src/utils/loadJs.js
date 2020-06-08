export default function(url, callback) {
  var script = document.createElement('script');
  script.async = 1;
  script.src = url;
  script.onload = callback;
  var dom = document.getElementsByTagName('script')[0];
  dom.parentNode.insertBefore(script, dom);
  return dom;
}
