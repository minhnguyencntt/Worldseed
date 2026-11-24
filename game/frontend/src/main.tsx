import { createRoot } from 'react-dom/client';
import App from './App';
import { AdminApp } from './components/AdminApp';
import '@fontsource/press-start-2p/400.css';
import '@fontsource/vt323/400.css';
import './styles.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found');
}
createRoot(rootEl).render(window.location.hash.startsWith('#/admin') ? <AdminApp /> : <App />);
