const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    onLoadAcfun: () => {
        const elementToObserve = document.querySelector('#article-up .article-content');
        if(elementToObserve.innerHTML.trim() !== '') {
            ipcRenderer.send('load-acfun-finish')
        }
        const observer = new MutationObserver(() => {
            if(elementToObserve.innerHTML.trim() !== ''){
                ipcRenderer.send('load-acfun-finish')
                observer.disconnect();
            }
        });
        observer.observe(elementToObserve, {characterData: false, childList: true, attributes: false});
    }
});
