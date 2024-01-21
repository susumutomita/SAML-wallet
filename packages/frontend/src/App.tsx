import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig, ConnectKitButton } from "connectkit";
import React from 'react';

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    // alchemyId: process.env.REACT_APP_ALCHEMY_ID, // or infuraId
    // walletConnectProjectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,

    alchemyId: "l7w079rnkih4phmj", // or infuraId
    walletConnectProjectId: "76c233c79230f517796b63a296786b63",

    // Required
    appName: "SAML-Wallet",
  }),
);

export const App = () => {
  const handleButtonClick = () => {
    window.location.href = 'https://saml-wallet-backend.fly.dev/'; // SAMLへのリンクをここに書く
  };
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <ConnectKitButton />
        <button onClick={handleButtonClick}>SAMLへのリンク</button>
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
