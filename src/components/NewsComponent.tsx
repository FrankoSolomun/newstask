import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
import axios from 'axios';
import ArticleList from './ArticleList';
import SideMenu from './SideMenu';
import './NewsComponent.scss'
import { debounce } from 'lodash';
import ArticleItem from './ArticleItem';
import LatestNews from './LatestNews';
import MenuPhone from './MenuPhone';



const API_URL = 'https://newsapi.org/v2/everything';
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

type Article = {
  title: string;
  description: string;
};
type Props = {
  source: string;
  categorynews: string;
};

const NewsComponent: React.FC<Props> = (props) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { source } = props; 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [latestNews, setLatestNews] = useState<Article[]>([]);
  const [showDifferentNews, setShowDifferentNews] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<Article[]>(API_URL, {
          params: {
            q: debouncedSearchTerm,
            searchIn: 'title',
            apiKey: API_KEY,
            sources: source,
          },
        });
        setArticles((response.data as any).articles);
        console.log('Articles:', response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [debouncedSearchTerm, source]);

  const debouncedHandleSearchTermChange = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
      console.log('Debounced search term:', value);
    }, 500),
    []
  );

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    debouncedHandleSearchTermChange(value);
  };


  // console.log('API_KEY:', API_KEY);
  const fetchArticles = useCallback(async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          apiKey: API_KEY,
          pageSize: 10,
          page,
          sources: source,
        },
      });
      setArticles((prevArticles) => [...prevArticles, ...response.data.articles]);
      setLatestNews((prevArticles) => [...prevArticles, ...response.data.articles]);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleScroll = () => {
    console.log(document.documentElement.offsetHeight);
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 5
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  let debounceTimer: number;

  const debouncedFetchLatestNews = () => {
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('fetchLatestNews', debouncedFetchLatestNews);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('fetchLatestNews', debouncedFetchLatestNews);
      clearTimeout(debounceTimer);
    };
  }, []);

  const isActive = showDifferentNews;



  return (
    <div className='main'>
      <div className='category2'>
        <MenuPhone />
        <div className='search'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search news" value={searchTerm} onChange={handleSearchTermChange} />
          <button>SEARCH</button>
        </div>
        <div className='buttons'>
          <button
            onClick={() => setShowDifferentNews(true)}
            className={`button ${isActive ? 'active' : ''}`}
          >
            Featured
          </button>

          <button
            onClick={() => setShowDifferentNews(false)}
            className={`button ${!isActive ? 'active' : ''}`}
          >
            Latest
          </button>
        </div>
        <div className='phone'>
          {showDifferentNews ? (
            <ul className='main-box2'>
              {articles.map((article: any, index: number) => (
                <ArticleItem key={index} article={article} />
              ))}
            </ul>
          )


            : (
              <div className='box'>
          <div className='latest-title'>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f00"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.9991 14.3801C13.3136 14.3801 14.3792 13.3146 14.3792 12.0001C14.3792 10.6857 13.3136 9.62012 11.9991 9.62012C10.6847 9.62012 9.61914 10.6857 9.61914 12.0001C9.61914 13.3146 10.6847 14.3801 11.9991 14.3801Z" fill="#292D32"></path> <path opacity="0.4" d="M20.0003 18.75C19.8403 18.75 19.6903 18.7 19.5503 18.6C19.2203 18.35 19.1503 17.88 19.4003 17.55C20.6103 15.94 21.2503 14.02 21.2503 12C21.2503 9.98004 20.6103 8.06005 19.4003 6.45005C19.1503 6.12005 19.2203 5.65003 19.5503 5.40003C19.8803 5.15003 20.3503 5.22002 20.6003 5.55002C22.0103 7.42002 22.7503 9.65004 22.7503 12C22.7503 14.35 22.0103 16.58 20.6003 18.45C20.4503 18.65 20.2303 18.75 20.0003 18.75Z" fill="#292D32"></path> <path opacity="0.4" d="M4 18.75C3.77 18.75 3.54999 18.65 3.39999 18.45C1.98999 16.58 1.25 14.35 1.25 12C1.25 9.65004 1.98999 7.42002 3.39999 5.55002C3.64999 5.22002 4.12001 5.15003 4.45001 5.40003C4.78001 5.65003 4.85001 6.12005 4.60001 6.45005C3.39001 8.06005 2.75 9.98004 2.75 12C2.75 14.02 3.39001 15.94 4.60001 17.55C4.85001 17.88 4.78001 18.35 4.45001 18.6C4.32001 18.7 4.16 18.75 4 18.75Z" fill="#292D32"></path> <path opacity="0.4" d="M16.7991 16.3499C16.6391 16.3499 16.4891 16.2999 16.3491 16.1999C16.0191 15.9499 15.9491 15.4799 16.1991 15.1499C16.8891 14.2399 17.2491 13.1499 17.2491 11.9999C17.2491 10.8499 16.8891 9.75994 16.1991 8.84994C15.9491 8.51994 16.0191 8.04992 16.3491 7.79992C16.6791 7.54992 17.1491 7.61995 17.3991 7.94995C18.2791 9.12995 18.7491 10.5299 18.7491 11.9999C18.7491 13.4699 18.2791 14.8799 17.3991 16.0499C17.2491 16.2499 17.0291 16.3499 16.7991 16.3499Z" fill="#292D32"></path> <path opacity="0.4" d="M7.20001 16.3499C6.97001 16.3499 6.75001 16.2499 6.60001 16.0499C5.72001 14.8699 5.25 13.4699 5.25 11.9999C5.25 10.5299 5.72001 9.11995 6.60001 7.94995C6.85001 7.61995 7.31999 7.54992 7.64999 7.79992C7.97999 8.04992 8.04999 8.51994 7.79999 8.84994C7.10999 9.75994 6.75 10.8499 6.75 11.9999C6.75 13.1499 7.10999 14.2399 7.79999 15.1499C8.04999 15.4799 7.97999 15.9499 7.64999 16.1999C7.51999 16.2999 7.36001 16.3499 7.20001 16.3499Z" fill="#292D32"></path> </g></svg>
            <h3>Latest News</h3>
          </div>
          <div className='lista' onScroll={
          (e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
            if (scrollHeight - scrollTop < clientHeight + 50) {
              //send custom window event
              window.dispatchEvent(new Event('fetchLatestNews'));
            }
          }
        }>
            {latestNews.map((article: any, index: number) => (
              <LatestNews key={index} article={article} />
            ))}
          </div>
          <div className='latest-bottom'>
            <h3>See all news</h3>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
            )}
        </div>
      </div>
      <div className='category'>
        <SideMenu />
        <div>
          <h2>{props.categorynews}</h2>
          <ArticleList articles={articles} latestNews={latestNews} />
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;