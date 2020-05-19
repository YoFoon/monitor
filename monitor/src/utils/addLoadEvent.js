export default function(func) {
  var oldOnload = window.onload; //把现在有window.onload事件处理函数的值存入变量oldonload。
  if (typeof window.onload != 'function') {
    //如果这个处理函数还没有绑定任何函数，就像平时那样把新函数添加给它
    window.onload = func;
  } else {
    //如果在这个处理函数上已经绑定了一些函数。就把新函数追加到现有指令的末尾
    window.onload = function() {
      oldOnload();
      func();
    };
  }
}
