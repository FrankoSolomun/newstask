import React, { useState, useEffect } from 'react';
import './LatestNews.scss';

export type ArticleItemProps = {
  article: any;
};

interface FavoriteArticle {
  title: string;
  description: string;
  imageUrl: string;
  // Add other properties as needed
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + '...';
    }
    return text;
  };

  const getTime = () => {
    const date = new Date(article.publishedAt);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
  };
  
  
  const time = getTime();

  return (
    <li className="latest">
      <h4>{time}</h4>
      <h3>{truncateText(article.title, 50)}</h3>
    </li>
  );
};

export default ArticleItem;
