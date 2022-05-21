import Tweet from './ui/Tweet';
import TweetInput from './TweetInput';
import { useWallet } from '@solana/wallet-adapter-react';

function Tweets({ tweets, visibleInput }) {
  const { connected } = useWallet();

  return (
    <div className="w-full">
      {connected && visibleInput && <TweetInput />}
      {tweets
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((tweet) => (
          <Tweet key={tweet.timestamp} tweet={tweet} />
        ))}
    </div>
  );
}

export default Tweets;
