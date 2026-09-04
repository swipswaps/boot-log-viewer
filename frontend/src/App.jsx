import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';

const API_URL = 'http://192.168.1.172:8000/api/boot-logs?limit=60';

function LogLine({ message, index }) {
  const yPosition = 5 - index * 0.4;
  return (
    <Text position={[-5, yPosition, 0]} fontSize={0.2} color="white" anchorX="left">
      {message}
    </Text>
  );
}

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        const messages = data.logs.map(entry => entry.MESSAGE || '(empty)');
        setLogs(messages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ color: 'white', padding: '20px' }}>Loading boot logs...</div>;
  if (error) return <div style={{ color: 'red', padding: '20px' }}>Error: {error}</div>;

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight />
        <OrbitControls />
        {logs.map((msg, i) => (
          <LogLine key={i} message={msg} index={i} />
        ))}
      </Canvas>
    </div>
  );
}

export default App;
