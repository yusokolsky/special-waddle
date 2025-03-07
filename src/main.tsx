import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router';
import { store } from './store';
import App from './App';
import './index.css';
import '@ant-design/v5-patch-for-react-19';

/**
 * Get root element and throw error if not found
 * This is a type-safe way to get the root element
 */
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

/**
 * Render the application with all required providers
 * - StrictMode for highlighting potential problems
 * - Redux Provider for state management
 * - Ant Design ConfigProvider for theming
 * - Router for navigation
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
