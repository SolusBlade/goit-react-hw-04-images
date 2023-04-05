import { useCallback, useState } from 'react';

import Searchbar from './Searchbar/Searchbar';
import Gallery from './Gallery/Gallery';

const App = () => {
  const [query, setQuery] = useState("");

  const changeQuery = useCallback(query => {
    setQuery(query);
  }, []);

  return (
    <>
      <Searchbar onSubmit={changeQuery} />
      <Gallery query={query} />
    </>
  );
};

export default App;
