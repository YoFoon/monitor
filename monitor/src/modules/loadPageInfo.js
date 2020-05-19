import MonitorBaseInfo from './monitorBaseInfo';

class LoadPageInfo extends MonitorBaseInfo {
  constructor(
    uploadType,
    loadType,
    loadPage,
    domReady,
    redirect,
    lookupDomain,
    ttfb,
    request,
    loadEvent,
    appcache,
    unloadEvent,
    connect,
  ) {
    super();
    this.uploadType = uploadType;
    this.loadType = loadType;
    this.loadPage = loadPage;
    this.domReady = domReady;
    this.redirect = redirect;
    this.lookupDomain = lookupDomain;
    this.ttfb = ttfb;
    this.request = request;
    this.loadEvent = loadEvent;
    this.appcache = appcache;
    this.unloadEvent = unloadEvent;
    this.connect = connect;
  }
}

export default LoadPageInfo;
