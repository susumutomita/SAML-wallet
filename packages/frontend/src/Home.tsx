import { ConnectKitButton } from 'connectkit';
import React from 'react';

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <ConnectKitButton />
    </div>
  );
}

export default Home;
