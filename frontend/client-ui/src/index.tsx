import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './layout/App';
import 'semantic-ui-css/semantic.min.css'
import './styles/basicLayout.css'
import './styles/index.css'
import './styles/Styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import { store, StoreContext } from './stores/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);  
root.render(
  <StoreContext.Provider  value={store}>
    <App />
    </StoreContext.Provider>,
);


