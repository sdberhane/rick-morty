# Rick and Morty Feed

React application that fetches and displays a feed of characters from the [Rick and Morty API](https://rickandmortyapi.com/documentation/). The app includes features for sorting and filtering characters based on their name, creation date, and status, and it implements pagination to navigate through the list of characters.

## Features

- **Character Feed:** Displays a list of characters fetched from the Rick and Morty API.
- **Sorting:** Sorts characters by name (alphabetically) or by date created (newest to oldest, oldest to newest).
- **Filtering:** Filters characters by their status (Alive, Dead, Unknown).
- **Pagination:** Navigate through the character list with pagination controls.
- **Day/Night Mode:** Toggle between light and dark modes for better user experience.
- **Persistent Theme:** The selected day/night theme is stored in `localStorage`, so the preferred theme persists even after refreshing the page.

## Decisions/Challenges
Pretty simple so not many technical challenges faced. My main decision was based on the tradeoff of efficiency vs more rigourous filering and sorting. 

As I saw it, my options were to either lazy load the data and fetch as the user requested or fetch all data and display as user requested. The former would yield a more efficient solution but wouldn't have the capability to sort/filter on the whole dataset - only the data that had been loaded in. The latter would have that capability but would be less efficient to render.

Because this was a relatively small dataset, I opted for more thorough solution and fetched all at once. Given larger data and the desire to sort on the whole dataset, I might look into a sorting/filtering option through the API to reduce the amount of client-side processing.

## How to Run the Project

### Prerequisites
- Node.js (v14 or higher)
- npm

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/<your-username>/rick-morty-feed.git
   cd rick-morty-feed
2. **Install Dependencies**
    ```bash
    npm install
3. **Run Project Locally**
    ```bash
    npm start
This will start a dev server that will default to location http://localhost:3000