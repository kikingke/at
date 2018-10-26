//asignar un ombre y version al cache

const CACHE_NAME = 'v1_cache_aburto_tech',
urlsToCache = [
'./',
'https://fonts.googleapis.com/css?family=Poppins',
'https://fonts.googleapis.com/css?family=Righteous',
'./css/bootstrap.min.css',
'./font-awesome-4.7.0/css/font-awesome.min.css',
'./css/style.css',
'./js/jquery-3.3.1.min.js',
'./js/jquery.touchSwipe.js',
'./js/angular.min.js',
'./js/angular-route.min.js',
'./js/popper.min.js',
'./js/bootstrap.min.js',
'./js/bootstrap-swipe-carousel.js',
'./js/app.js',
'./images/logo3.png'

]


//durante la instalacion , se almacenan en cache los activos estaticos
self.addEventListener('install', e => {
   e.waitUntil(
   		caches.open(CACHE_NAME)
   		.then(cache =>{
   			return cache.addAll(urlsToCache)
   			.then(()=> self.skipWaiting())
   		})
   		.catch(err => console.log('Fallo registro de cache',err))
   	)
})



//una vez instalado el SW se activa y busca los recursos offline
self.addEventListener("activate", e => {
	const cacheWhitelist = [CACHE_NAME]
	e.waitUntil(
		caches.keys()
		.then(cacheNames => {
			return Promise.all(
			cacheNames.map(cacheName=>{
				//eliminamos lo que ya no se necesita en cache
				if (cacheWhitelist.indexOf(cacheName) === -1){
					return caches.delete(cacheName)
				}
			})
		)
	  })
	//le indica al sw activar el cache actual
	.then(()=>self.clients.claim())
	)
	
})



//recupera los recursos de internet cuando esta en linea y actualiza los datos locales en cache con los de internet
self.addEventListener('fetch', e => {
  //responder con el objeto en cache o buscar la url real
    e.respondWith(
  	 caches.match(e.request)
  	 .then(res => {
  	 	if (res){
  	 		//recuperando del cache
  	 		return res
  	 	}
  	 	//recupera de url
        return fetch(e.request)

  	 })

  	)
})