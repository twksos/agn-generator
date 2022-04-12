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
let loadAcfunDefer = null;
const loadAcfun = (url) => {
    loadAcfunDefer = defer();
    ipcRenderer.send('load-acfun', url);
    return loadAcfunDefer.promise;
}
const generateAgnImage = (showItem) => {
    ipcRenderer.send('generate-agn-image', showItem);
}
const loadAcfunFinish = (evt, base64Image) => {
    if(!loadAcfunDefer) return null;
    loadAcfunDefer.resolve(base64Image);
}
const loadAcfunFail = (evt, message) => {
    if(!loadAcfunDefer) return null;
    loadAcfunDefer.reject(new Error(message));
}
ipcRenderer.on('load-acfun-finish', loadAcfunFinish);
ipcRenderer.on('load-acfun-fail', loadAcfunFail);
contextBridge.exposeInMainWorld('electronAPI', {
    loadAcfun,
    generateAgnImage,
});
