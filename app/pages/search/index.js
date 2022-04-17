import { useRouter } from 'next/router';

function SearchPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Search</h1>
      <button
        onClick={() => {
          router.replace('/search/mamamai');
        }}
      >
        Press
      </button>
    </div>
  );
}

export default SearchPage;
