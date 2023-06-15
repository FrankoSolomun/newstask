import React, { useEffect, useState } from 'react';
import '../components/ArticleItem.scss';
import SideMenu from '../components/SideMenu';
import '../components/ArticleItem.scss';
import Recommendation from '../components/Recommendation';
import '../App.scss'
import MenuPhone from '../components/MenuPhone';
import ArticleItem from '../components/ArticleItem';
import '../components/MenuPhone.scss'
import '../components/NewsComponent.scss'
import { Link } from 'react-router-dom';


interface Article {
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  category: string;
  url: string;
}

const Favourites: React.FC = () => {
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<Article[]>([]);

  useEffect(() => {
    // Retrieve favorites from local storage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const results = favorites.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(results);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const removeFavorite = (title: string) => {
    const updatedFavorites = favorites.filter((article) => article.title !== title);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + '...';
    }
    return text;
  };

  const displayData = searchResult.length > 0 ? searchResult : favorites;
  const hasFavorites = favorites.length > 0;
  return (
    <div className='main'>
      <div className="header">
        <Recommendation />
      </div>
      <div className='category2'>
        <MenuPhone />
        <div className='search'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search news" value={searchTerm} onChange={handleSearchTermChange} onKeyPress={handleKeyPress} />
          <button onClick={handleSearch}>SEARCH</button>
        </div>
        <div className='phone'>

          <ul className='main-box2'>
            {hasFavorites ? (
              <>
                <ul className='main-box2'>
                  {(() => {
                    const reversedFavorites = [...displayData].reverse();
                    const listItems = [];
                    for (let i = 0; i < reversedFavorites.length; i++) {
                      const article = reversedFavorites[i];
                      listItems.push(
                        <li className='article-item' key={i}>
                           {article.imageUrl ? (
                            <img src={article.imageUrl} alt={article.title} />
                          ) : (
                            <img src="noimage.jpg" alt="No Image" />
                          )}
                          <Link to={article.url} className="article-link">
        <div className='article-text'>
          <h4>{article.category}</h4>
          <h3>{truncateText(article.title, 60)}</h3>
        </div>
        <p>{article.author}</p>
      </Link>
                          <button className='remove' onClick={() => removeFavorite(article.title)}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                <path d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </g>
                            </svg>
                          </button>
                        </li>
                      );
                    }
                    return listItems;
                  })()}
                </ul>
              </>
            ) : (
              <div className='no-articles'>
                <h3>You haven't saved any articles!</h3>
              </div>
            )}
          </ul>
        </div>

      </div>
      <div className="main">
        <div className='category'>
          <SideMenu />
          <div>
            {hasFavorites ? (
              <>
                <h2>Favorites</h2>
                <ul className='main-box2'>
                  {(() => {
                    const reversedFavorites = [...displayData].reverse();
                    const listItems = [];
                    for (let i = 0; i < reversedFavorites.length; i++) {
                      const article = reversedFavorites[i];
                      listItems.push(
                        <li className='article-item' key={i}>
                          {article.imageUrl ? (
                            <img src={article.imageUrl} alt={article.title} />
                          ) : (
                            <img src="noimage.jpg" alt="No Image" />
                          )}
                          <Link to={article.url} className="article-link">
        <div className='article-text'>
          <h4>{article.category}</h4>
          <h3>{truncateText(article.title, 60)}</h3>
        </div>
        <p>{article.author}</p>
      </Link>
                          <button className='remove' onClick={() => removeFavorite(article.title)}>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                <path d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </g>
                            </svg>
                          </button>
                        </li>
                      );
                    }
                    return listItems;
                  })()}
                </ul>
              </>
            ) : (
              <div className='no-articles'>
                <h2>Favorites</h2>
                <h3>You haven't saved any articles!</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
