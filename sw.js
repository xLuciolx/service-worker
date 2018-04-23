importScripts('./script/idb.js');
importScripts('./script/store.js')

self.addEventListener('sync', function(event) {
    event.waitUntil(
        store.outbox('readonly').then(function(outbox){
            return outbox.getAll()
        }).then(function(content){
            console.log(content);
            
            

            return Promise.all(content.map(function(content) {

                return fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(content),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                }
                }).then(function(response) { 
                    console.log(response);
                    
                return response;
                }).then(function(data) {
                if (data.result === 'success') {
                    return store.outbox('readwrite').then(function(outbox) {
                    return outbox.delete(content.id);
                    });
                }
                })

            }))

            


        }).catch(function (err) {
            console.error(err);
        })
    )
})