import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorProvider, Program } from '@project-serum/anchor';
import { useTweet } from '../../context/useTweet';
import { authorFilter } from '../../utils/filters';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import idl from '../../utils/idl.json';

import Tweets from '../../components/Tweets';

function ProfilePage({ tweets }) {
  dayjs.extend(relativeTime);
  const parsedTweets = JSON.parse(tweets);
  //   console.log(parsedTweets);

  //   class Tweet {
  //     constructor(tweet) {
  //       this.publicKey = tweet.publicKey;
  //       this.content = tweet.account.content;
  //       this.author = tweet.account.author;
  //       this.createdAt = dayjs.unix(tweet.account.timestamp).format('YYYY-MM-DD');
  //       this.createdAgo = dayjs.unix(tweet.account.timestamp).fromNow();

  //       this.timestamp = tweet.account.timestamp.toNumber();
  //     }
  //   }

  console.log(parsedTweets);

  return (
    <div>
      <p className="my-4 ml-6 text-lg font-semibold">
        Profile {parsedTweets[0].publicKey.slice(0, 7)}...{' '}
      </p>

      <Tweets visibleInput={false} tweets={parsedTweets} />
    </div>
  );
}

export async function getServerSideProps(context) {
  //   console.log(context.params.wallet);

  const { wallet } = context.params;
  console.log(wallet);

  if (wallet.includes('.ttf') || wallet.includes('Roboto')) {
    return {
      notFound: true,
    };
  }

  const connection = new Connection('http://127.0.0.1:8899');

  const opts = {
    preflightCommitment: 'processed',
  };

  // const connection = new Connection(network, opts.preflightCommitment);

  const getProvider = () => {
    const provider = new AnchorProvider(
      connection,
      wallet,
      opts.preflightCommitment
    );
    return provider;
  };

  const provider = getProvider();

  const programId = new PublicKey(idl.metadata.address);

  let program = new Program(idl, programId, provider);

  console.log(authorFilter(wallet));

  const authorTweets = await program.account.tweet.all([authorFilter(wallet)]);

  console.log(authorTweets);

  class Tweet {
    constructor(tweet) {
      this.publicKey = tweet.publicKey.toBase58();
      this.content = tweet.account.content;
      this.author = tweet.account.author.toBase58();
      this.createdAt = dayjs
        .unix(tweet.account.timestamp.toString())
        .format('YYYY-MM-DD');
      this.createdAgo = dayjs
        .unix(tweet.account.timestamp.toString())
        .fromNow();

      this.timestamp = tweet.account.timestamp.toNumber();
    }
  }

  const modelTweet = authorTweets.map((tweet) => {
    return new Tweet(tweet);
  });

  return {
    props: {
      tweets: JSON.stringify(modelTweet),
    },
  };
}

export default ProfilePage;
