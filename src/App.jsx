// src/App.jsx
import { getStarships } from "./services/starshipService";
import { useState, useEffect } from "react";
import StarshipSearch from "./components/StarshipSearch/StarshipSearch.jsx";
import StarshipList from "./components/StarshipList/StarshipList.jsx";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [starshipsData, setStarshipsData] = useState([]);
  const [displayedStarships, setDisplayedStarships] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const response = await getStarships();
        console.log(response);
        setStarshipsData(response.data.results);
        setDisplayedStarships(response.data.results);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getInitialData();
  }, []);

  // const getStarshipsList = async (e) => {
  //   try {
  //     const response = await getStarships(searchTerm);
  //     setStarshipsData({
  //       name: response.data.name,
  //       manufacturer: response.data.manufacturer,
  //       model: response.data.model,
  //     });
  //   } catch (error) {
  //     console.error(`Error fetching Starships`);
  //     setError(error.message);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await getStarships(searchTerm);
      console.log(response);
      setStarshipsData(response.data.results);
      setSearchTerm("");
    } catch (error) {
      console.error(`Error fetching Starships`);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Star Wars API</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <label hidden htmlFor="search"></label>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search a Starship..."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button type="submit">Find a Starship</button>
          <button onClick={() => setDisplayedStarships}>Show All</button>
        </form>
      </section>
      <StarshipList starships={starshipsData} />
    </>
  );
};

export default App;
