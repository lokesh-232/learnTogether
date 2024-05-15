// Function to handle search
function handleSearch() {
    const searchBar = document.getElementById('searchInput');
    const searchQuery = searchBar.value.trim();

    // Perform search only if the search query is not empty
    if (searchQuery !== '') {
        fetch(`search.php?q=${searchQuery}`)
            .then(response => response.text())
            .then(data => {
                // Display search results in the shelves-container div
                const shelvesContainer = document.getElementById('shelves-container');
                shelvesContainer.innerHTML = data;
            })
            .catch(error => console.error(error));
    } else {
        // If search query is empty, fetch all files
        fetchFiles();
    }
}

// Add event listener to the search button
document.getElementById('searchButton').addEventListener('click', handleSearch);

// Add event listener to the search input for handling search on Enter key press
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Add event listener to the search input for handling text removal
document.getElementById('searchInput').addEventListener('input', function () {
    // If search input is cleared, fetch all files
    if (this.value.trim() === '') {
        fetchFiles();
    }
});
