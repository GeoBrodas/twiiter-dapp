import { AnchorProvider, Program } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SearchByTopic from '../../components/SearchByTopic';
import Tweets from '../../components/Tweets';
import { topicFilter } from '../../utils/filters';
import idl from '../../utils/idl.json';
import { Tweet } from '../../utils/models';

function FilterByTopicsPage({ tweets, topic }) {
  const parsedTweets = JSON.parse(tweets);
  //   console.log(parsedTweets);

  const router = useRouter();

  const [value, setValue] = useState('');

  function searchTweetsByTopic() {
    router.replace(`/topics/${value}`);
  }

  return (
    <div>
      <Head>
        <title>Tweets on {topic}</title>
      </Head>
      <p className="ml-6 text-xl font-semibold">Tweets on #{topic}</p>

      <SearchByTopic
        value={value}
        setValue={setValue}
        searchTweetsByTopic={searchTweetsByTopic}
      />

      {parsedTweets.length > 0 ? (
        <Tweets visibleInput={false} tweets={parsedTweets} />
      ) : (
        <div className="my-6 flex w-full">No tweets found!</div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { topic } = context.params;

  console.log(topic);

  const connection = new Connection('http://127.0.0.1:8899');

  const opts = {
    preflightCommitment: 'processed',
  };

  const getProvider = () => {
    const provider = new AnchorProvider(
      connection,
      //   wallet,
      opts.preflightCommitment
    );
    return provider;
  };

  const provider = getProvider();

  const programId = new PublicKey(idl.metadata.address);

  let program = new Program(idl, programId, provider);

  const tweets = await program.account.tweet.all([topicFilter(topic)]);

  const modaledTweets = tweets.map((tweet) => new Tweet(tweet));

  //   console.log(tweets);

  return {
    props: {
      tweets: JSON.stringify(modaledTweets),
      topic,
    },
  };
}

export default FilterByTopicsPage;
