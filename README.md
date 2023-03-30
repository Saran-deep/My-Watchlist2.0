# MyWatchList

MyWatchList is a web application that allows users to discover new animes, search animes, and keep track of the animes they've watched or want to watch. The front-end of the application is built using React and Tailwind CSS for styling, while the back-end is built using Node.js with Express and MongoDB as the database.

## Getting Started

### Prerequisites

Before running the application, you will need to have the following software installed on your computer:

- Node.js (v14 or higher)
- MongoDB

### Installation

To install the application, please follow the instructions below:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/Saran-deep/My-Watchlist2.0.git
```

2. Navigate to the server directory:

```bash
cd My-Watchlist2.0/Server
```

3. Create a .env file in the server directory and add the following environment variables:

```bash
MONGODB_URL=<your_mongodb_uri>
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
```

4. Install the required dependencies using the following command:

```bash
npm install
```

5. Start Server

```bash
npm start
```

6. Open a new terminal window, navigate to the client directory:

```bash
cd My-Watchlist2.0/client
```

7. Install the required dependencies using the following command:

```bash
npm install
```

8. Start the client:

```bash
npm start
```

9. The application should now be running. You can access it by navigating to http://localhost:3000 in your web browser.

## Features

The application provides the following features:

- Search for animes using keywords.
- Filter animes by genre, rating, and release year.
- View anime details, such as title, synopsis, rating, and genre.
- Add animes to the user's watchlist.
- Mark animes as watched.
- Remove animes from the watchlist.
- Authentication using JSON Web Tokens (JWT).
