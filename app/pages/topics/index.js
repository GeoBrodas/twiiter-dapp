import { useState } from 'react';
import { GrSearch } from 'react-icons/gr';
import { useRouter } from 'next/router';
import Head from 'next/head';

function TopicsPage() {
  const [value, setValue] = useState('');
  const router = useRouter();

  function searchTweetsByTopic() {
    router.replace(`/topics/${value}`);
  }

  return (
    <div>
      <Head>
        <title>Filter by Topics</title>
      </Head>

      <h1 className="my-6 ml-6 text-xl font-semibold">
        Search tweets by Topics
      </h1>

      <div className="flex w-full ">
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
    </div>
  );
}

export default TopicsPage;
