importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyD6mlr7bcFRIR8QMg875jFVgAvaNhIipYA",
  authDomain:        "sansebastian-proveedores.firebaseapp.com",
  projectId:         "sansebastian-proveedores",
  storageBucket:     "sansebastian-proveedores.firebasestorage.app",
  messagingSenderId: "502507789799",
  appId:             "1:502507789799:web:18c23d38e2d6f657f6f142",
});

const messaging = firebase.messaging();

// Manejar notificaciones cuando la app está en background
messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'San Sebastián Proveedores';
  const body  = payload.notification?.body  || 'Tenés una notificación nueva.';
  const icon  = '/icon-192.png';
  self.registration.showNotification(title, {
    body,
    icon,
    badge: '/icon-192.png',
    data: payload.data || {},
  });
});

// Click en la notificación abre la app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('https://sansebastian.vercel.app');
    })
  );
});
