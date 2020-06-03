import React, { Component } from 'react';
import '../../monitor/src/index';
class App extends Component {
  componentDidMount() {
    var tag = document.createElement('script');
    tag.type = 'text/javascript';
    tag.async = true;
    tag.src = 'http://www.hunliji.com/sf.js';
    document.body.appendChild(tag);
    console.error('console error');
    console.log(aa);
  }
  render() {
    return <div>1</div>;
  }
}

export default App;
