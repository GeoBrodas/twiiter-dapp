import Tweet from './ui/Tweet';
import TweetInput from './TweetInput';
import { useWallet } from '@solana/wallet-adapter-react';

function Tweets({ tweets }) {
  const { connected } = useWallet();

  return (
    <div className="w-full">
      {connected && <TweetInput />}
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}

export default Tweets;
