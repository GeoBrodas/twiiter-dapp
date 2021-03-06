import { useState } from 'react';
import { useTweet } from '../context/useTweet';
import { changeStringToSlug } from '../helpers/slug-helper';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { web3 } from '@project-serum/anchor';
const anchor = require('@project-serum/anchor');
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';

function TweetInput() {
  const { tweet, setTweet, program } = useTweet();
  // const wallet = useWallet();
  const wallet = useAnchorWallet();
  const [loading, setLoading] = useState(false);

  function handleKeyDown(e) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  }

  async function sendTweet() {
    if (!tweet.content) return alert('Tweet is empty');

    // console.log(wallet);

    if (tweet.content.length > 280) return alert('Tweet is too long');

    setLoading(true);

    const tweetKey = anchor.web3.Keypair.generate();

    // console.log(tweet.topic, tweet.content);
    // console.log(tweetKey.publicKey, wallet.publicKey);

    const { topic, content } = tweet;

    // console.log(typeof topic === 'string');

    try {
      await program.rpc.sendTweet(topic, content, {
        accounts: {
          tweet: tweetKey.publicKey,
          author: wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [tweet],
      });

      setLoading(false);
      console.log(tweet);
      setTweet({
        content: '',
        topic: '',
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      return alert('Error sending tweet');
    }
  }

  return (
    <div className="flex flex-col border-b-2 pb-6">
      {/* input */}
      <textarea
        onKeyDown={handleKeyDown}
        // disable resizing
        style={{ resize: 'none' }}
        type="text"
        placeholder="Whats tweeting?..."
        className="my-4 h-[40px] w-2/3 select-none border-0 bg-transparent px-6 text-lg text-orange-500 scrollbar focus:outline-none"
        value={tweet?.content}
        onChange={(e) => setTweet({ ...tweet, content: e.target.value })}
      />

      {/* Button */}
      <div className="flex items-center justify-between px-6">
        <div className="w-[30%] rounded-3xl bg-gray-700 px-4">
          <div className="flex items-center">
            <div className="rounded-l-xl text-lg font-bold text-orange-500">
              #
            </div>
            <input
              value={tweet?.topic}
              onChange={(e) =>
                setTweet({
                  ...tweet,
                  topic: changeStringToSlug(e.target.value),
                })
              }
              type="text"
              className="w-full rounded-r-xl border-0 bg-transparent p-2 text-lg font-bold focus:outline-none"
              placeholder="topic"
            />
          </div>
        </div>

        <div className="flex w-auto items-center space-x-6">
          <p className="text-gray-500">{280 - tweet?.content.length}</p>
          <button
            className="h-auto w-fit rounded-3xl bg-orange-500 px-4 py-2 font-bold text-white"
            onClick={sendTweet}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h- w-5 animate-spin text-black" />
            ) : (
              'Tweet'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TweetInput;
