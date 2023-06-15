This is a React application built using TypeScript that creates a news website. The website connects to the News API to fetch articles based on the selected source and category.

Axios is preferred over the native Fetch API due to its simpler syntax and ease of use, consistent behavior across different browsers, and built-in features such as request cancellation and automatic data transformation. It also supports interceptors and middleware, providing additional flexibility for handling requests and responses. These advantages make Axios a more convenient and reliable choice for making HTTP requests in web applications.

The main component, NewsComponent, handles the fetching of articles from the API based on the search term, source, and page number. It also includes a search functionality that debounces the input to prevent excessive API calls. The fetched articles are displayed in the ArticleList component.

The LatestNews component displays a list of the latest articles fetched from the API. It implements infinite scrolling by dispatching a custom event to fetch more articles when the user scrolls near the end of the list.

The SideMenu and MenuPhone components provide navigation and category options for the user to choose from.

The favorites page in the application allows users to view and manage their collection of favorite articles. By storing the favorites in local storage, the user's preferences are preserved even if they navigate away from the page or close the browser, enhancing the overall user experience. This approach offers persistence across page refreshes or even when the user closes and reopens the application. Additionally, using local storage avoids the need for complex state management solutions and simplifies the implementation of the favorites feature. This ensures that users can easily maintain and access their favorite articles without any hassle.


If you're downloading the project, you need to create a .env file in the root directory and add your API key which you can get from https://newsapi.org/.

