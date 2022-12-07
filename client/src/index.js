import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
    
//     </React.StrictMode>
// );
root.render(
  <Provider store={store}>
<GoogleOAuthProvider clientId="1012210105276-3kn9do6b0kd8t4bbhmcf1m22f1kk72v8.apps.googleusercontent.com"><App /></GoogleOAuthProvider>;
    
  </Provider>
);
