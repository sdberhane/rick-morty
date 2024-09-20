import './App.css';

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSun as Sun, FaMoon as MoonStar } from 'react-icons/fa';

function App() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');
  const [isNightMode, setIsNightMode] = useState(false);

  const [characters, setCharacters] = useState([]);
  const [filteredSortedCharacters, setFilteredSortedCharacters] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const charactersPerPage = 20;


  const toggleTheme= () => {
    setIsNightMode(!isNightMode);
    localStorage.setItem('isNightMode', !isNightMode);
  }
  
  useEffect(() => {
    const isNightMode = localStorage.getItem('isNightMode') === 'true';
    setIsNightMode(isNightMode);
  }, []);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      let allCharacters = [];
      let currentPage = 1;
      let hasNextPage = true;

      try {
        while (hasNextPage) {
          const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
          allCharacters = [...allCharacters, ...response.data.results];
          hasNextPage = response.data.info.next !== null;
          currentPage++;
        }

        setCharacters(allCharacters);
        setFilteredSortedCharacters(allCharacters);

        setTotalPages(Math.ceil(allCharacters.length / charactersPerPage));

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchAllCharacters();
  }, []);

  useEffect(() => {
    let sortedCharacters = characters;

    if (filter) {
      sortedCharacters = sortedCharacters.filter((character) => character.status === filter);
    }

    if (sort) {
      sortedCharacters = sortedCharacters.sort((a, b) => {
        if (sort === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sort === 'nto') {
          return new Date(b.created) - new Date(a.created);
        } else if (sort === 'otn') {
          return new Date(a.created) - new Date(b.created);
        }
      });
    }
    setFilteredSortedCharacters(sortedCharacters);
    setCurrentPage(1);
    setTotalPages(Math.ceil(sortedCharacters.length / charactersPerPage));
  }, [sort, filter]);

  const getPaginatedCharacters = () => {
    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    return filteredSortedCharacters.slice(startIndex, endIndex);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const Characters = ({ characters }) => {
    if (characters.length === 0) {
      return <p>No characters found! Try again.</p>;
    }

    return (
      <div>
        {characters.map((character) => (
          <div key={character.id} className='character-card'>
            <img src={character.image} alt={character.name} />
            <div className="character-info">
              <h2>{character.name}</h2>
              <p>Species: <span>{character.species}</span></p>
              <p>Status: <span>{character.status}</span></p>
              <p>Gender: <span>{character.gender}</span></p>
              <p className="date">
                Created: {new Date(character.created).toLocaleDateString()} {new Date(character.created).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit',})}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`App ${isNightMode ? 'night-mode' : 'day-mode'}`}>
      {/* Header */}
      <h1>RICK AND MORTY FEED</h1>

      {/* Dividing line */}
      <hr className='divider'/>

      <div className='settings'>
        <div className='search'>
          {/* Sort options */}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value=''>Sort by</option>
            <option value='name'>Name (alphabetically)</option>
            <option value='nto'>Date created (Newest to Oldest)</option>
            <option value='otn'>Date created (Oldest to Newest)</option>
          </select>

          {/* Filter options */}
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value=''>Filter by status</option>
            <option value='Alive'>Alive</option>
            <option value='Dead'>Dead</option>
            <option value='unknown'>Unknown</option>
          </select>
        </div>

        {/* Toggle night/day mode */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {isNightMode ? <Sun /> : <MoonStar />}
        </button>
      </div>

      {/* Character List */}
      <Characters characters={getPaginatedCharacters()} />

      {/* Pagination */}
      <div className='pagination'>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default App;
