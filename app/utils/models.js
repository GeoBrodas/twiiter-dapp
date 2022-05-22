import dayjs from 'dayjs';

// export a class called Tweet
export class Tweet {
  constructor(tweet) {
    this.publicKey = tweet.publicKey.toBase58();
    this.content = tweet.account.content;
    this.topic = tweet.account.topic;
    this.author = tweet.account.author.toBase58();
    this.createdAt = dayjs
      .unix(tweet.account.timestamp.toString())
      .format('YYYY-MM-DD');
    this.createdAgo = dayjs.unix(tweet.account.timestamp.toString()).fromNow();
    this.timestamp = tweet.account.timestamp.toNumber();
  }
}
