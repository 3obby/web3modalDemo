import React from "react";
import {
  Container,
  ThemeProvider,
  Typography,
  createTheme,
  CssBaseline,
} from "@mui/material";
import ButtonAppBar from "./components/appBar";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal, useWeb3ModalTheme } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
    primary: {
      main: "#459621",
    },
    secondary: {
      main: "#ffde00",
      contrastText: "#000000",
    },
    shape: {
      borderRadius: 8,
    },
  });

  const chains = [polygon];
  const projectId = process.env.REACT_APP_DEMO_ID;

  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  console.log(process.env.REACT_APP_DEMO_ID);
  return (
    <>
      <WagmiConfig config={wagmiConfig} />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ height: "80vh" }}>
          <ButtonAppBar />
          <Container>
            <Typography
              variant="h3"
              sx={{ textAlign: "center", p: 2, color: "primary.main" }}
            >
              Header
            </Typography>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
