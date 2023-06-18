import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { configureChains, createConfig } from 'wagmi';
import { mainnet} from 'wagmi/chains';
import {
  getDefaultWallets
} from '@rainbow-me/rainbowkit';

export const { chains, publicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: '3KWr08H3rsKblx210xMX16ZSjHFLcY5q' }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'PubGoos',
  projectId: 'e783d19d40ef0f424d82385d1bda0b95',
  chains
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})