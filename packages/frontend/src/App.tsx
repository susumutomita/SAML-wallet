import { WagmiConfig, createConfig } from 'wagmi';
import {
  ConnectKitProvider,
  getDefaultConfig,
  ConnectKitButton,
} from 'connectkit';
import React from 'react';

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: 'l7w079rnkih4phmj', // or infuraId
    walletConnectProjectId: '76c233c79230f517796b63a296786b63',
    // Required
    appName: 'SAML-Wallet',
  })
);

const buttonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '12px',
};

export const App = () => {
  const handleButtonClick = () => {
    window.location.href = 'https://saml-wallet-backend.fly.dev/';
  };

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <ConnectKitButton style={buttonStyle} />
          <button onClick={handleButtonClick} style={buttonStyle}>
            SAML
          </button>
        </div>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
