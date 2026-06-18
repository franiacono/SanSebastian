importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyAG4Od0phx8CHOIrdt2PgFeWJ5khq1G8SU",
  authDomain:        "entrevecinos-app.firebaseapp.com",
  projectId:         "entrevecinos-app",
  storageBucket:     "entrevecinos-app.firebasestorage.app",
  messagingSenderId: "925885581421",
  appId:             "1:925885581421:web:d7c7af6f8a5dbf92bf9764",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'EntreVecinos';
  const body  = payload.notification?.body  || 'Tenés una notificación nueva.';
  self.registration.showNotification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: payload.data || {},
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      if (clientList.length > 0) return clientList[0].focus();
      return clients.openWindow('https://entrevecinos.ar');
    })
  );
});
