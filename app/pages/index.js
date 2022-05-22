import Head from 'next/head';
import Tweets from '../components/Tweets';
import { useEffect, useState } from 'react';

import { useTweet } from '../context/useTweet';
import dayjs from 'dayjs';

import { Tweet } from '../utils/models';

function Home() {
  var relativeTime = require('dayjs/plugin/relativeTime');
  dayjs.extend(relativeTime);

  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState();

  const { program } = useTweet();

  useEffect(async () => {
    setLoading(true);

    let fechedTweets;
    fechedTweets = await program.account.tweet.all();
    setTweets(fechedTweets);
    setLoading(false);
  }, []);

  if (!tweets) {
    return <div>Loading...</div>;
  }

  // console.log(tweets);

  // make a constructor function for Tweet model

  const fakeTweets = tweets?.map((tweet) => {
    return new Tweet(tweet);
  });

  // const fakeTweets = tweets?.map((tweet) => ({
  //   publicKey: tweet.publicKey.toBase58(),
  //   content: tweet.account.content,
  //   author: tweet.account.author.toBase58(),
  //   createdAt: dayjs
  //     .unix(tweet.account.timestamp.toString())
  //     .format('YYYY-MM-DD'),
  //   createdAgo: dayjs.unix(tweet.account.timestamp.toString()).fromNow(),
  // }));

  // console.log(fakeTweets);

  return (
    <div className="h-screen flex-grow flex-col items-center justify-center overflow-y-auto py-10 scrollbar">
      <Head>
        <title>Home: Twitter + Solana</title>
      </Head>

      <Tweets visibleInput={true} tweets={fakeTweets} />
    </div>
  );
}

export default Home;
