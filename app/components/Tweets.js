import Tweet from './ui/Tweet';
import TweetInput from './TweetInput';

function Tweets({ tweets }) {
  return (
    <div>
      <TweetInput />
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}

export default Tweets;
