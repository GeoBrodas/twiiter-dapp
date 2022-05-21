function Tweet({ tweet }) {
  // generate a random color
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

  return (
    <div className="my-6">
      <div className="flex">
        <div
          style={{
            backgroundColor: color,
          }}
          className={`mx-6 h-10 w-14 rounded-full`}
        ></div>
        <div className="w-full">
          <div className="flex justify-between">
            <span className="italic text-gray-400">{tweet.createdAt}</span>
            <span className="italic text-gray-400">{tweet.createdAgo}</span>
          </div>
          <div className="my-2 font-bold">{tweet.author.slice(0, 7)}...</div>
          {tweet.content.length > 120
            ? tweet.content.slice(0, 120)
            : tweet.content}
        </div>
      </div>
    </div>
  );
}

export default Tweet;
