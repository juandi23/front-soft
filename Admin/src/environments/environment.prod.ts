export const environment = {
  production: true,
  defaultauth: 'fackbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
    vapidKey: '' // Agregado: clave VAPID para Firebase
  },
  api: '', // Agregado: URL de tu API
  stripePublicKey: '', // Agregado: Llave pública de Stripe
  payu: {
    merchantId: '', // Agregado: ID del comerciante
    accountId: '', // Agregado: ID de cuenta de PayU
    apiKey: '' // Agregado: Llave API de PayU
  }
};
