// JavaScript code for displaying search history on the search history page
const searchHistoryList = document.querySelector('#search-history-list');

function displaySearchHistory() {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistoryList.innerHTML = '';

  searchHistory.forEach(searchQuery => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="./landi.html" class="search-history-item">${searchQuery}</a>`;
    searchHistoryList.appendChild(listItem);
  });
}

displaySearchHistory();




const clearHistoryButton = document.querySelector('#clear-history-button');

clearHistoryButton.addEventListener('click', () => {
  localStorage.removeItem('searchHistory');
  displaySearchHistory();
});