import { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';

export default function App() {
  const [begun, setBegun] = useState(false);
  if (!begun) {
    return <IntroScreen onBegin={() => setBegun(true)} />;
  }
  return <></>;
}
