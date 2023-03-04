// JavaScript code for fetching book data and displaying it on the page
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const bookResults = document.querySelector('#book-results');

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchQuery = searchInput.value;
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const books = data.items;
      bookResults.innerHTML = '';

      books.forEach(book => {
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors;
        const coverImage = book.volumeInfo.imageLinks.thumbnail;
        const description = book.volumeInfo.description;

        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
          <img src="${coverImage}" alt="${title}">
          <div>
            <h2>${title}</h2>
            <h3>by ${authors.join(', ')}</h3>
            <p>${description}</p>
          </div>
        `;
        bookResults.appendChild(bookCard);
      });
    });
});

// JavaScript code for storing search history in localStorage
searchForm.addEventListener('submit', (event) => {
  const searchQuery = searchInput.value;
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistory.unshift(searchQuery);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
});

// JavaScript code for displaying search history on another page
const searchHistoryList = document.querySelector('#search-history-list');

function displaySearchHistory() {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistoryList.innerHTML = '';

  searchHistory.forEach(searchQuery => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#" class="search-history-item">${searchQuery}</a>`;
    searchHistoryList.appendChild(listItem);
  });
}

displaySearchHistory();

// JavaScript code for retrieving book data from search history
searchHistoryList.addEventListener('click', (event) => {
  if (event.target.classList.contains('search-history-item')) {
    const searchQuery = event.target.textContent;
    searchInput.value = searchQuery;
    searchForm.dispatchEvent(new Event('submit'));
  }
});

// JavaScript code for clearing search history
const clearHistoryButton = document.querySelector('#clear-history-button');

clearHistoryButton.addEventListener('click', () => {
  localStorage.removeItem('searchHistory');
  displaySearchHistory();
});
