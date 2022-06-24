import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { createContext, useContext, useState } from 'react';
import { AnchorProvider, Program } from '@project-serum/anchor';

import idl from '../utils/idl.json';

const Context = createContext({
  isLoading: false,
  setTweet: () => {},
  tweet: {
    content: '',
    topic: '',
  },
  program: {},
  wallet: {},
  connection: {},
  provider: {},
});

const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState({
    content: '',
    topic: '',
  });

  const wallet = useAnchorWallet();
  // console.log(wallet);

  const network = clusterApiUrl('devnet');

  const connection = new Connection('http://127.0.0.1:8899');

  const opts = {
    preflightCommitment: 'processed',
    commitment: 'processed',
  };

  // const connection = new Connection(network, opts.preflightCommitment);

  const getProvider = () => {
    const provider = new AnchorProvider(connection, wallet, opts);
    return provider;
  };

  const provider = getProvider();

  const programId = new PublicKey(idl.metadata.address);

  let program = new Program(idl, programId, provider);

  const exposed = {
    isLoading,
    setTweet,
    tweet,
    program,
    wallet,
    connection,
    provider,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useTweet = () => useContext(Context);

export default ContextProvider;
