document.addEventListener('DOMContentLoaded', function(event) {
    if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(function(reg) {
        if ('sync' in reg) {
            var form = document.getElementById('sw');
            form.addEventListener('submit', function(e){
                e.preventDefault();
                var input = form.elements[0].value;                
                var content = {
                    body: input
                }
                store.outbox('readwrite').then(function(outbox){
                    return outbox.put(content)
                
                }).then(function() {
                    return reg.sync.register('workerDB');
                }).catch(function(err) {
                    console.error(err)
                });
            })

        }
    }).catch(function(err) { 
        console.error(err); // the Service Worker didn't install correctly
    });
    }
});
