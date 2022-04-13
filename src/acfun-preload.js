const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    onLoadAcfun: () => {
        ['#pagelet_header', '#main>section>.clearfix.wp.area.head', '#main .fr', '#pagelet_toolbar'].forEach(selector => {
            document.querySelector(selector).remove();
        });
        document.querySelectorAll('#main .wp').forEach(e=>{
            e.style.width = '800px';
        })

        document.body.style.width = '840px';
        document.body.style.overflow = 'hidden';

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
