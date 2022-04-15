function MainLayout({ children }) {
  return (
    <div className="flex justify-between py-6">
      <div className="mx-auto flex w-1/3 flex-col border-r border-white">
        <div
          style={{
            letterSpacing: '0.1em',
          }}
          className="text mx-auto my-10 text-3xl"
        >
          Twitter
        </div>

        <button className="side-btn">Home</button>
        <button className="side-btn">Trending</button>
        <button className="side-btn">Search</button>
      </div>
      <div className="mx-4 w-2/3">{children}</div>
      <div className="mx-auto w-1/3"></div>
    </div>
  )
}

export default MainLayout
