import { createContext, useContext, useState } from 'react';

const Context = createContext();

const Provider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState({
    content: '',
    topic: '',
  });

  const exposed = {
    isLoading,
    setIsLoading,
    tweet,
    setTweet,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useTweet = () => useContext(Context);

export default Provider;
