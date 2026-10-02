# CMS Blog

A simple Content Management System built with **Node.js, Express, EJS, and MongoDB**.

## Features

- View blog posts
- Search posts by title
- Create new posts
- View individual posts
- Server-side rendering with EJS
- MongoDB database storage
- Responsive interface

## Requirements

- Node.js 18 or newer (Node.js 20+ recommended)
- MongoDB running locally on port `27017`
- npm

## Setup

1. Clone or download this repository.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

4. Make sure MongoDB is running locally. The application uses:

```text
mongodb://127.0.0.1:27017
```

The application creates/uses a database named `cms_lab` and a collection named `posts`.

5. Start the application:

```bash
npm start
```

6. Open:

```text
http://localhost:3000
```

## Project Structure

```text
CMSLab/
├── app.js
├── package.json
├── package-lock.json
├── public/
│   └── style.css
├── views/
│   ├── new-post.ejs
│   ├── post.ejs
│   └── posts.ejs
└── .gitignore
```

## MongoDB

No database files are included in the repository. MongoDB stores the posts separately, so anyone downloading the project should start MongoDB before running the application.

## Notes

`node_modules` is intentionally not included. Running `npm install` recreates all required dependencies from `package.json` and `package-lock.json`.
