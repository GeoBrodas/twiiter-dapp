function Tweet({ tweet }) {
  // generate a random color
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`
  console.log(color)

  return (
    <div className="my-6">
      <div className="flex">
        <div
          style={{
            backgroundColor: color,
          }}
          className={`mx-6 h-10 w-14 rounded-full`}
        ></div>
        <div>
          <div className="my-2 font-bold">{tweet.user.name}</div>
          {tweet.content.length > 120
            ? tweet.content.slice(0, 120)
            : tweet.content}
        </div>
      </div>
    </div>
  )
}

export default Tweet
