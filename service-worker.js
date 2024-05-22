var cacheName = 'Sabor&ando-v1.0';

self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll([


      './Pages/Inicio/inicio.html',

      './Pages/Inicio/inicio.css',

      './Assets/css/styles.css',

      'https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap',
      
      'https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap',

      './Pages/Inicio/inicio.js',

      './Assets/icons/icon_29.png', 

      './Assets/icons/icon_40.png',

      './Assets/icons/icon_57.png',

      './Assets/icons/icon_58.png',

      './Assets/icons/icon_60.png',

      './Assets/icons/icon_80.png',

      './Assets/icons/icon_114.png',

      './Assets/icons/icon_120.png',

      './Assets/icons/icon_180.png',

      './Assets/icons/icon_512.png',

      './Assets/icons/icon_1024.png',
      
      './Assets/img/Logo.svg', 

    ]))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  event.respondWith(async function () {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());
});