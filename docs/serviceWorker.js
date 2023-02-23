const cacheName = 'v1';

self.addEventListener('activate', (e)=>{
	e.waitUntil(async function(){
		let cacheNames = await caches.keys();
		await Promise.all(
			cacheNames.map(cache=>{
				if(cache != cacheName){
					return caches.delete(cache);
				}
			})
		)
	}());
})

self.addEventListener('fetch', async (event)=>{
	if (event.request.method != 'GET') return;
	event.respondWith(async function() {
		const cache = await caches.open(cacheName);
		let response = await new Promise(resolve=>{ fetch(event.request).then(response=>{ resolve(response) }).catch(err=>resolve(null)) });
		if(response){
			if(response.status == 200 && response.url.indexOf('chrome-extension://')  === -1){
				event.waitUntil(cache.add(event.request));
			}
			return response;
		}
		const cachedResponse = await cache.match(event.request);
		return cachedResponse;
	}());
})
