# eLibrary Frontend

This is the frontend for the eLibrary system, built with React and TypeScript.

## Main Features

### For All Users

- **Find Books:** Search the entire library by title or category.
- **Book Details:** View detailed book information, including descriptions and reader reviews.
- **Account Access:** Sign up, log in, and log out securely. Users can also reset their passwords through email.
- **My Books:** View books currently checked out and quickly renew or return them.
- **Reading History:** Review all previously checked out and returned books.
- **Reviews:** Write and read reviews, and see the average rating for each book.
- **Profile:** Access personal information and track current checkout status.

### For Admins

Admins have access to a dedicated dashboard for managing users, books, and checkouts.

- **Quick Stats:** View key library metrics such as total books, users, and checkouts.
- **User Management:** Search, view, update, and delete user accounts.
- **Book Management:** Add,edit, and remove books from the catalog.
- **Checkout Management:** View all active checkouts and manually renew or return books.
- **Messages:** Read, filter, and reply to user messages and requests.

## Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **Data Fetching:** React Query
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **API Communication:** Axios

## What You Need to Get Started

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- A running [eLibrary Backend API](https://github.com/khalid-nur/eLibrary-backend) (required for data connection)

## Setup and Run

1. Get the Code

   ```bash
   git clone https://github.com/khalid-nur/eLibrary-frontend.git
   cd eLibrary-frontend
   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Start the App

   ```bash
   npm start
   ```

---

## Key Routes

| Route Path           | Component              | Access | Description                 |
| :------------------- | :--------------------- | :----- | :-------------------------- |
| `/`                  | `Home.tsx`             | Public | Landing page                |
| `/search`            | `SearchBooksPage.tsx`  | Public | Browse and search for books |
| `/checkout/:bookId`  | `BookCheckoutPage.tsx` | Public | View book details           |
| `/my-books`          | `MyBooks.tsx`          | User   | Manage current checkouts    |
| `/reading-history`   | `HistoryPage.tsx`      | User   | View checkout history       |
| `/profile`           | `MyProfile.tsx`        | User   | View and edit profile       |
| `/login`             | `Login.tsx`            | Public | User login                  |
| `/register`          | `Register.tsx`         | Public | User registration           |
| `/admin/dashboard/*` | `Dashboard.tsx`        | Admin  | Admin control panel         |
| `*`                  | `NotFoundPage.tsx`     | Public | Fallback for invalid routes |

---
