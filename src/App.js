import { useState, useEffect, useContext } from "react";
// sections
import Search from "./sections/Search";
import SearchResult from "./sections/SearchResult";
import SearchHistory from "./sections/SearchHistory";
// contexts
import { ThemeContext } from "./contexts/ThemeContext";
import "./App.css";

function App() {
  const { theme } = useContext(ThemeContext)
  const [searchResult, setSearchResult] = useState(null);
  const [searchResultError, setSearchResultError] = useState(null);
  
  useEffect(() => {
    // make sure search history exists in local storage
    let store = localStorage.getItem("searchHistory")
    if (!localStorage.getItem("searchHistory")) {
      localStorage.setItem("searchHistory", JSON.stringify([]));
    }
    else {
      // display latest search result once component loaded
      setSearchResult(JSON.parse(store).sort((a, b) => b.dt - a.dt)[0])
    }
  }, []);

  return (
    <div className="App" data-theme={theme}>
      <div className="App-container">
        <Search
          setSearchResult={setSearchResult}
          setSearchResultError={setSearchResultError}
          // setTheme={setTheme}
        />
        <SearchResult
          searchResult={searchResult}
          searchResultError={searchResultError}
        />
        <SearchHistory setSearchResult={setSearchResult} />
      </div>
    </div>
  );
}

export default App;
