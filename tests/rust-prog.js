const anchor = require('@project-serum/anchor');
const assert = require('assert');

describe('rust-prog', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.RustProg;

  it('can send a tweet', async () => {
    const tweet = anchor.web3.Keypair.generate();

    await program.rpc.sendTweet('web3', 'Im learning web3 from today!', {
      accounts: {
        tweet: tweet.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [tweet],
    });

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    console.log(tweetAccount);

    assert.equal(
      tweetAccount.author.toBase58(),
      program.provider.wallet.publicKey.toBase58()
    );
    assert.equal(tweetAccount.topic, 'web3');
    assert.equal(tweetAccount.content, 'Im learning web3 from today!');
    assert.ok(tweetAccount.timestamp);
  });

  it('can send a tweet without topic', async () => {
    const tweet = anchor.web3.Keypair.generate();

    await program.rpc.sendTweet('', 'Im learning web3 from today!', {
      accounts: {
        tweet: tweet.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [tweet],
    });

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);
    console.log(tweetAccount);

    assert.equal(
      tweetAccount.author.toBase58(),
      program.provider.wallet.publicKey.toBase58()
    );
    assert.equal(tweetAccount.topic, '');
    assert.equal(tweetAccount.content, 'Im learning web3 from today!');
    assert.ok(tweetAccount.timestamp);
  });
});
