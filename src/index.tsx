import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from 'features/layout/components';
import reportWebVitals from './reportWebVitals';
import { ExerciseTypeRepository } from 'common/mocks/repo';
import { store } from 'common/store';

import 'styles/index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/permanent-marker';

// Launch mock API if in development
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./common/mocks/api/worker');
  worker.start();

  (async () => {
    await ExerciseTypeRepository.seedTypes();
  })();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
