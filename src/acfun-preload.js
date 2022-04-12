const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    onLoadAcfun: () => {
        ['#pagelet_header', '#main>section>.clearfix.wp.area.head', '#main .fr', '#pagelet_toolbar'].forEach(selector => {
            document.querySelector(selector).remove();
        });
        document.querySelector('#main .wp').style.width = '840px'

        const elementToObserve = document.querySelector('#article-up .article-content');
        if(elementToObserve.innerHTML.trim() !== '') {
            setTimeout(()=>{
                ipcRenderer.send('load-acfun-finish')
            }, 1000);
        }
        const observer = new MutationObserver(() => {
            if(elementToObserve.innerHTML.trim() !== ''){
                setTimeout(()=>{
                    ipcRenderer.send('load-acfun-finish')
                    observer.disconnect();
                }, 1000);
            }
        });
        observer.observe(elementToObserve, {characterData: false, childList: true, attributes: false});
    }
});
