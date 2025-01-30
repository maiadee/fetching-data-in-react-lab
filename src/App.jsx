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

  useEffect(() => {
    const getInitialData = async () => {
      try {
        const response = await getStarships("");
        setStarshipsData({
          name: response.data.name,
          manufacturer: response.data.manufacturer,
          model: response.data.model,
        });
        setDisplayedStarships({
          name: response.data.name,
          manufacturer: response.data.manufacturer,
          model: response.data.model,
        });
      } catch (error) {
        console.error(error);
        setError(error.response.data.error.message);
      }
    }
    getInitialData()
  });

  const getStarshipsList = async (e) => {
    try {
      const response = await getStarships(searchTerm);
      setStarshipsData({
        name: response.data.name,
        manufacturer: response.data.manufacturer,
        model: response.data.model,
      });
    } catch (error) {
      console.error(`Error fetching Starships`);
      setError(error.response.data.error.message);
    }
  };

  return (
    <>
      <h1>Star Wars API</h1>
      <section>
        <form onSubmit={getStarshipsList}>
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
        </form>
      </section>
    </>
  );
};

export default App;
