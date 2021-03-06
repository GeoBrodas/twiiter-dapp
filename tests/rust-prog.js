const anchor = require('@project-serum/anchor');
const assert = require('assert');
const bs58 = require('bs58');

describe('rust-prog', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.RustProg;

  it('can send a tweet', async () => {
    const tweet = anchor.web3.Keypair.generate();

    // console.log(program.provider.wallet.publicKey, tweet.publicKey);

    await program.rpc.sendTweet(
      'web-tech',
      'jamstack is crushing the new web',
      {
        accounts: {
          tweet: tweet.publicKey,
          author: program.provider.wallet.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [tweet],
      }
    );

    // const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    // console.log(tweetAccount);

    // assert.equal(
    //   tweetAccount.author.toBase58(),
    //   program.provider.wallet.publicKey.toBase58()
    // );
    // assert.equal(tweetAccount.topic, 'web3');
    // assert.equal(tweetAccount.content, 'Im learning web3 from today!');
    // assert.ok(tweetAccount.timestamp);
  });

  // it('can send a tweet without topic', async () => {
  //   const tweet = anchor.web3.Keypair.generate();

  //   await program.rpc.sendTweet('', 'Im learning web3 from today!', {
  //     accounts: {
  //       tweet: tweet.publicKey,
  //       author: program.provider.wallet.publicKey,
  //       systemProgram: anchor.web3.SystemProgram.programId,
  //     },
  //     signers: [tweet],
  //   });

  //   const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
  //   console.log(tweetAccount);

  //   assert.equal(
  //     tweetAccount.author.toBase58(),
  //     program.provider.wallet.publicKey.toBase58()
  //   );
  //   assert.equal(tweetAccount.topic, '');
  //   assert.equal(tweetAccount.content, 'Im learning web3 from today!');
  //   assert.ok(tweetAccount.timestamp);
  // });

  // it('can send a tweet from another author with same publicKey', async () => {
  //   const otherUser = anchor.web3.Keypair.generate();
  //   // req 1 sol for the other user and wait for the transaction to complete
  //   const signature = await program.provider.connection.requestAirdrop(
  //     otherUser.publicKey,
  //     1000000000
  //   );
  //   await program.provider.connection.confirmTransaction(signature);

  //   const tweet = anchor.web3.Keypair.generate();

  //   await program.rpc.sendTweet('', 'Im learning web3 from today!', {
  //     accounts: {
  //       tweet: tweet.publicKey,
  //       author: otherUser.publicKey,
  //       systemProgram: anchor.web3.SystemProgram.programId,
  //     },
  //     signers: [otherUser, tweet],
  //   });

  //   const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
  //   console.log(tweetAccount);

  //   assert.equal(
  //     tweetAccount.author.toBase58(),
  //     otherUser.publicKey.toBase58()
  //   );
  //   assert.equal(tweetAccount.topic, '');
  //   assert.equal(tweetAccount.content, 'Im learning web3 from today!');
  //   assert.ok(tweetAccount.timestamp);
  // });

  // it('cannot provide a topic with more than 50 characters', async () => {
  //   try {
  //     const tweet = anchor.web3.Keypair.generate();

  //     const topicWith51Chars = 'x'.repeat(51);

  //     await program.rpc.sendTweet(topicWith51Chars, 'Hummus, am I right?', {
  //       accounts: {
  //         tweet: tweet.publicKey,
  //         author: program.provider.wallet.publicKey,
  //         systemProgram: anchor.web3.SystemProgram.programId,
  //       },
  //       signers: [tweet],
  //     });
  //   } catch (error) {
  //     assert.equal(error.message, 'Topic must be less than 50 characters');
  //     return;
  //   }

  //   assert.fail('Should have thrown an error');
  // });

  // it('cannot provide a topic with more than 280 characters', async () => {
  //   try {
  //     const tweet = anchor.web3.Keypair.generate();

  //     const contentWith281Chars = 'x'.repeat(281);

  //     await program.rpc.sendTweet('vengenism', contentWith281Chars, {
  //       accounts: {
  //         tweet: tweet.publicKey,
  //         author: program.provider.wallet.publicKey,
  //         systemProgram: anchor.web3.SystemProgram.programId,
  //       },
  //       signers: [tweet],
  //     });
  //   } catch (error) {
  //     assert.equal(error.message, 'Topic must be less than 280 characters');
  //     return;
  //   }

  //   assert.fail('Should have thrown an error');
  // });

  it('fetch all tweets', async () => {
    const tweetAccounts = await program.account.tweet.all();

    console.log(tweetAccounts);

    // assert.equal(tweetAccounts.length, 4);
  });

  // it('can filter tweets by author', async () => {
  //   const authorPublicKey = program.provider.wallet.publicKey;
  //   const tweetAccounts = await program.account.tweet.all([
  //     {
  //       memcmp: {
  //         offset: 8, // Discriminator.
  //         bytes: authorPublicKey.toBase58(),
  //       },
  //     },
  //   ]);

  //   console.log(tweetAccounts);

  //   assert.equal(tweetAccounts.length, 2);
  //   assert.ok(
  //     tweetAccounts.every((tweetAccount) => {
  //       return (
  //         tweetAccount.account.author.toBase58() === authorPublicKey.toBase58()
  //       );
  //     })
  //   );
  // });

  // it('can filter by topic', async () => {
  //   const tweetAccounts = await program.account.tweet.all([
  //     {
  //       memcmp: {
  //         offset: 8 + 32 + 8 + 4, // Discriminator.
  //         bytes: bs58.encode(Buffer.from('web3')),
  //       },
  //     },
  //   ]);

  //   console.log(tweetAccounts);

  //   assert.equal(tweetAccounts.length, 1);
  //   assert.ok(
  //     tweetAccounts.every((tweetAccount) => {
  //       return tweetAccount.account.topic === 'web3';
  //     })
  //   );
  // });
});
