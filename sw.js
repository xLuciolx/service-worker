importScripts('./script/idb.js');
importScripts('./script/store.js')

// API = 'http://192.168.10.24:9443'
API = 'http://www.mocky.io/v2/5ae1c9012d00004c009d7e88'

self.addEventListener('install', function(event) {
    event.waitUntil(
    caches.open('tresch').then(function(cache) {
        return cache.addAll([
        '/service-worker/',
        '/service-worker/index.html',
        '/service-worker/script/',
        '/service-worker/script/app.js',
        '/service-worker/script/store.js',
        '/service-worker/script/idb.js',
        ]);
    })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
    caches.match(event.request).catch(function() {
        return fetch(event.request).then(function(response) {
        return caches.open('tresch').then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
        });  
        });
    }).catch(function(err) {
        console.error(err);
        
    })
    );
});


function toto(event) {
    if (event.tag == 'online') {
        event.waitUntil(
            store.outbox('readonly').then(function(outbox){
                return outbox.getAll()
            }).then(function(content){
                
                options = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // body: JSON.stringify(content.body),
                    body: {
                        test: "true"
                    }
                }
                return Promise.all(content.map(function(content) {
                    // return fetch(API + '/services/test_DataService/insert_test', options).then(function(response) { 
                    return fetch(API, options).then(function(response) { 
                        // console.log(response);
                        if (response.status === 200) {
                            return store.outbox('readwrite').then(function(outbox) {
                                console.log(outbox);
                                
                            return outbox.delete(content.id);
                            });
                        }
                        
                        
                        return response;
                    })//.
                    // then(function(data) {
                    // if (data.status === '200') {
                    //     return store.outbox('readwrite').then(function(outbox) {
                    //         console.log(outbox);
                            
                    //     return outbox.delete(content.id);
                    //     });
                    // }
                    // })
                }))
            }).catch(function (err) {
                console.error(err);
            })
        )
    }
    event.waitUntil(
        store.outbox('readonly').then(function(outbox){
            return outbox.getAll()
        }).then(function(content){
            
            options = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(content.body),
                body: {
                    test: "true"
                }
            }
            return Promise.all(content.map(function(content) {
                // return fetch(API + '/services/test_DataService/insert_test', options).then(function(response) { 
                return fetch(API, options).then(function(response) { 
                    // console.log(response);
                    if (response.status === 200) {
                        return store.outbox('readwrite').then(function(outbox) {
                            console.log(outbox);
                            
                        return outbox.delete(content.id);
                        });
                    }
                    
                    
                    return response;
                })//.
                // then(function(data) {
                // if (data.status === '200') {
                //     return store.outbox('readwrite').then(function(outbox) {
                //         console.log(outbox);
                        
                //     return outbox.delete(content.id);
                //     });
                // }
                // })
            }))
        }).catch(function (err) {
            console.error(err);
        })
    )
}

self.addEventListener('sync', toto)//function(event) {
    // console.log('online');
    
    
    // event.waitUntil(
    //     store.outbox('readonly').then(function(outbox){
    //         return outbox.getAll()
    //     }).then(function(content){
            
    //         options = {
    //             method: 'post',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             // body: JSON.stringify(content.body),
    //             body: {
    //                 test: "true"
    //             }
    //         }
    //         return Promise.all(content.map(function(content) {
    //             // return fetch(API + '/services/test_DataService/insert_test', options).then(function(response) { 
    //             return fetch(API, options).then(function(response) { 
    //                 // console.log(response);
    //                 if (response.status === 200) {
    //                     return store.outbox('readwrite').then(function(outbox) {
    //                         console.log(outbox);
                            
    //                     return outbox.delete(content.id);
    //                     });
    //                 }
                    
                    
    //                 return response;
    //             })//.
    //             // then(function(data) {
    //             // if (data.status === '200') {
    //             //     return store.outbox('readwrite').then(function(outbox) {
    //             //         console.log(outbox);
                        
    //             //     return outbox.delete(content.id);
    //             //     });
    //             // }
    //             // })
    //         }))
    //     }).catch(function (err) {
    //         console.error(err);
    //     })
    // )
//})