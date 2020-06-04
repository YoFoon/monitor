export default encryptObj = function(o) {
  if (o instanceof Array) {
    var n = [];
    for (var i = 0; i < o.length; ++i) {
      n[i] = this.encryptObj(o[i]);
    }
    return n;
  } else if (o instanceof Object) {
    var n = {};
    for (var i in o) {
      n[i] = this.encryptObj(o[i]);
    }
    return n;
  }
  o = o + '';
  if (o.length > 50) {
    o = o.substring(0, 10) + '****' + o.substring(o.length - 9, o.length);
  }
  return o;
};
