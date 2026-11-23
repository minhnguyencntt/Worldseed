import { createRoot } from 'react-dom/client';
import App from './App';
import { AdminApp } from './components/AdminApp';
import './styles.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found');
}
createRoot(rootEl).render(window.location.hash.startsWith('#/admin') ? <AdminApp /> : <App />);
