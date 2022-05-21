async function handler(req, res) {
  let tweets;

  if (req.method == 'GET') {
    try {
      tweets = await program.value.account.tweet.all();

      return res.status(200).json(tweets);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
}

export default handler;
