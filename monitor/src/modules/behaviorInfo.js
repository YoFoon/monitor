import MonitorBaseInfo from './monitorBaseInfo';
import b64EncodeUnicode from '../utils/b64EncodeUnicode';

class BehaviorInfo extends MonitorBaseInfo {
  constructor(uploadType, behaviorType, className, placeholder, inputValue, tagName, innerText) {
    super();
    this.uploadType = uploadType;
    this.behaviorType = behaviorType;
    this.className = b64EncodeUnicode(className);
    this.placeholder = b64EncodeUnicode(placeholder);
    this.inputValue = b64EncodeUnicode(inputValue);
    this.tagName = tagName;
    this.innerText = b64EncodeUnicode(encodeURIComponent(innerText));
  }
}

export default BehaviorInfo;
