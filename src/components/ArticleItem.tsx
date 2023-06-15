import React, { useState, useEffect } from 'react';
import './ArticleItem.scss';

export type ArticleItemProps = {
  article: any;
};

interface FavoriteArticle {
  title: string;
  imageUrl: string;
  author: string;
  category: string;
  // Add other properties as needed
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites: FavoriteArticle[] = JSON.parse(storedFavorites);
      const isArticleInFavorites = favorites.find(
        (favArticle: FavoriteArticle) => favArticle.title === article.title
      );
      setIsFavorite(!!isArticleInFavorites);
    }
  }, [article.title]);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    const storedFavorites = localStorage.getItem('favorites');
    let favorites: FavoriteArticle[] = storedFavorites ? JSON.parse(storedFavorites) : [];

    const isArticleInFavorites = favorites.find(
      (favArticle: FavoriteArticle) => favArticle.title === article.title
    );

    if (isArticleInFavorites) {
      favorites = favorites.filter(
        (favArticle: FavoriteArticle) => favArticle.title !== article.title
      );
    } else {
      const favoriteArticle: FavoriteArticle = {
        title: article.title,
        imageUrl: article.urlToImage,
        author: article.author,
        category: category,
      };
      favorites.push(favoriteArticle);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + '...';
    }
    return text;
  };
  const source = 'ars-technica, bloomberg, al-jazeera-english, medical-news-today, national-geographic, bleacher-report';

  const getCategory = () => {
    if (window.location.pathname === '/' || window.location.pathname === '/index' || window.location.pathname === '/favorites') {
      if (article.source?.id === 'ars-technica') {
        return 'TECH';
      }
      if (article.source?.id === 'bloomberg') {
        return 'BUSINESS';
      }
      if (article.source?.id === 'al-jazeera-english') {
        return 'GENERAL';
      }
      if (article.source?.id === 'medical-news-today') {
        return 'HEALTH';
      }
      if (article.source?.id === 'national-geographic') {
        return 'SCIENCE';
      }
      if (article.source?.id === 'bleacher-report') {
        return 'SPORT';
      }
    }
    return ''; // Default category or no categories on non-home pages
  };
  
  const category = getCategory();

  return (
    <li className="article-item">
      <img src={article.urlToImage} alt={article.title} />
      <h4>{category}</h4>
      <h3>{truncateText(article.title, 60)}</h3>
      {/* <p>{truncateText(article.description || '', 80)}</p> */}
      <p>{article.author}</p>
      <div
        className={`favorite ${isFavorite ? 'favorite-active' : ''}`}
        onClick={handleFavoriteClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFavorite ? 'yellow' : 'white'}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      </div>
    </li>
  );
};

export default ArticleItem;
