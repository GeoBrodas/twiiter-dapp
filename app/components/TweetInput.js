import { useTweet } from '../context/useTweet';

function TweetInput() {
  const { tweet, setTweet } = useTweet();

  async function sendTweet() {
    if (!tweet) return alert('Tweet is empty');

    if (tweet.length > 280) return alert('Tweet is too long');

    console.log(tweet);
    setTweet('');
  }

  return (
    <div className="flex flex-col border-b-2 pb-6">
      {/* input */}
      <input
        type="text"
        placeholder="Whats tweeting?..."
        className="mx-auto my-4 h-[40px] w-2/3 select-none border-0 bg-transparent focus:outline-none"
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
      />

      {/* Button */}
      <button
        className="mx-auto h-[35px] w-1/3 rounded-3xl bg-orange-500 font-bold text-white"
        onClick={sendTweet}
      >
        Tweet
      </button>
    </div>
  );
}

export default TweetInput;
