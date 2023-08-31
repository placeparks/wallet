import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  smartWallet,
  localWallet,
  paperWallet,
} from "@thirdweb-dev/react";
import "./styles/globals.css";

const container = document.getElementById("root");
const root = createRoot(container);
const clientId = import.meta.env.VITE_CLIENT_ID;
const paperId = import.meta.env.VITE_PAPER_CLIENT_ID;
root.render(
  <ThirdwebProvider
    activeChain="mumbai"
      clientId= {clientId}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        smartWallet({
          factoryAddress: "0xE3861b36F09917AE4CF2517294ee0d5A5A0c3058",
          gasless: true,
          personalWallets: [
            metamaskWallet(),
            coinbaseWallet(),
            walletConnect(),
          ],
        }),
        localWallet(),
        paperWallet({
          paperClientId: paperId,
        }),
      ]}

>
  <App/>

    </ThirdwebProvider>
);
