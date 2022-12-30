const { contextBridge, ipcRenderer } = require('electron')
function defer() {
    const deferred = {};
    const promise = new Promise(function(resolve, reject) {
        deferred.resolve = resolve;
        deferred.reject  = reject;
    });
    deferred.promise = promise;
    return deferred;
}

const loadAcfun = (url) => {
    const deferred = defer();
    ipcRenderer.removeAllListeners('load-acfun-callback');
    ipcRenderer.on('load-acfun-callback', (evt, payload) => {
        if(!deferred) return null;
        if(payload.success) deferred.resolve(payload.data);
        else deferred.reject(new Error(payload.data));
    });
    ipcRenderer.send('load-acfun', url);
    return deferred.promise;
}
const copyAgnImage = (showItem) => {
    ipcRenderer.send('copy-agn-image', showItem);
}
const downAgnImage = (showItem) => {
    const deferred = defer();
    ipcRenderer.removeAllListeners('down-agn-image-callback');
    ipcRenderer.on('down-agn-image-callback', (evt, payload) => {
        if(!deferred) return null;
        if(payload.success) deferred.resolve(payload.data);
        else deferred.reject(new Error('保存失败'));
    });
    ipcRenderer.send('down-agn-image', showItem);
    return deferred.promise;
}

contextBridge.exposeInMainWorld('electronAPI', {
    loadAcfun,
    copyAgnImage,
    downAgnImage,
});
 