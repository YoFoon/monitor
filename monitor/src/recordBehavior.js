import monitor from './core';
import HttpLogInfo from './modules/httpLogInfo';
import { HTTP_LOG, HTTP_UPLOAD_LOG_API, HTTP_UPLOAD_DEBUG_LOG_API } from './var/constant';

monitor.extend({
  recordBehavior: function() {
    // 记录行为前，检查一下url记录是否变化
    checkUrlChange();
    // 记录用户点击元素的行为数据
    utils.addOnclickForDocument(function(e) {
      var className = '';
      var placeholder = '';
      var inputValue = '';
      var tagName = e.target.tagName;
      var innerText = '';
      if (e.target.tagName != 'svg' && e.target.tagName != 'use') {
        className = e.target.className;
        placeholder = e.target.placeholder || '';
        inputValue = e.target.value || '';
        innerText = e.target.innerText ? e.target.innerText.replace(/\s*/g, '') : '';
        // 如果点击的内容过长，就截取上传
        if (innerText.length > 200)
          innerText =
            innerText.substring(0, 100) +
            '... ...' +
            innerText.substring(innerText.length - 99, innerText.length - 1);
        innerText = innerText.replace(/\s/g, '');
      }
      var behaviorInfo = new BehaviorInfo(
        ELE_BEHAVIOR,
        'click',
        className,
        placeholder,
        inputValue,
        tagName,
        innerText,
      );
      behaviorInfo.handleLogInfo(ELE_BEHAVIOR, behaviorInfo);
    });
  },
});
