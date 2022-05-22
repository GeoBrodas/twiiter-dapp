import { GrSearch } from 'react-icons/gr';

function SearchByTopic({ value, setValue, searchTweetsByTopic }) {
  return (
    <div className="my-6 flex w-full">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className="mx-10 w-[80%] rounded-xl border-2 border-orange-600 bg-transparent px-4 text-gray-400"
        placeholder="Search by topic"
      />
      <button
        onClick={searchTweetsByTopic}
        className="w-38 mx-6  flex items-center space-x-4 rounded-xl bg-orange-600 p-4"
      >
        <GrSearch className="mr-4 h-5 w-5 bg-orange-600 text-yellow-50" />
        Search
      </button>
    </div>
  );
}

export default SearchByTopic;
