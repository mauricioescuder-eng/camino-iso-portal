// Service worker mínimo — existe solo para que Chrome/Android reconozca
// el portal como una app instalable ("Agregar a pantalla de inicio" /
// "Instalar aplicación"). A propósito NO guarda nada en caché: como el
// portal se actualiza seguido y depende de datos en vivo (Apps Script),
// preferimos que todo se pida siempre a la red en vez de arriesgarnos a
// mostrar una versión vieja guardada.
self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  // Sin cache: se deja pasar el pedido normal a la red.
});
