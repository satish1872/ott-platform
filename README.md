```markdown
# OTT Platform Backend

This repository contains the backend for the OTT Platform, built with Next.js and Supabase. The backend includes APIs for managing a user's favorite movies and TV shows list.

## Table of Contents

- [Getting Started](#getting-started)
- [Setting Up the Project](#setting-up-the-project)
- [Deploying on Vercel](#deploying-on-vercel)
- [API Endpoints](#api-endpoints)
  - [Add to My List](#add-to-my-list)
  - [Remove from My List](#remove-from-my-list)
  - [List My Items](#list-my-items)
- [Testing the APIs](#testing-the-apis)
- [Valid Mock Data](#valid-mock-data)

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.
- A Supabase account and project setup.

## Setting Up the Project

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/satish1872/ott-platform.git
   cd ott-platform
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env.local` file in the root of the project and add your Supabase URL and API key:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_KEY=your_supabase_key
   ```

4. **Create Supabase Tables:**

   Use the following SQL scripts to create the necessary tables in your Supabase project:

   ```sql
   -- Users Table
   CREATE TABLE users (
     id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
     username text NOT NULL
   );

   -- Movies Table
   CREATE TABLE movies (
     id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
     title text NOT NULL,
     description text,
     genres text[] -- Array of genres
   );

   -- TV Shows Table
   CREATE TABLE tv_shows (
     id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
     title text NOT NULL,
     description text,
     genres text[] -- Array of genres
   );

   -- User Lists Table
   CREATE TABLE user_lists (
     user_id uuid REFERENCES users(id),
     content_id uuid,
     content_type text, -- Either 'movie' or 'tv_show'
     PRIMARY KEY (user_id, content_id, content_type)
   );
   ```

5. **Insert Mock Data:**

   Use the following SQL scripts to insert mock data into your Supabase tables:

   ```sql
   -- Insert Users
   INSERT INTO users (id, username) VALUES 
   ('11111111-1111-1111-1111-111111111111', 'testuser1'),
   ('22222222-2222-2222-2222-222222222222', 'testuser2');

   -- Insert Movies
   INSERT INTO movies (id, title, description, genres) VALUES 
   ('33333333-3333-3333-3333-333333333333', 'Test Movie 1', 'This is a test movie 1.', ARRAY['Action', 'Comedy']),
   ('44444444-4444-4444-4444-444444444444', 'Test Movie 2', 'This is a test movie 2.', ARRAY['Drama', 'Romance']);

   -- Insert TV Shows
   INSERT INTO tv_shows (id, title, description, genres) VALUES 
   ('55555555-5555-5555-5555-555555555555', 'Test TV Show 1', 'This is a test TV show 1.', ARRAY['SciFi', 'Fantasy']),
   ('66666666-6666-6666-6666-666666666666', 'Test TV Show 2', 'This is a test TV show 2.', ARRAY['Horror', 'Drama']);

   -- Insert User Lists
   INSERT INTO user_lists (user_id, content_id, content_type) VALUES 
   ('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'movie'),
   ('11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 'tv_show'),
   ('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', 'movie'),
   ('22222222-2222-2222-2222-222222222222', '66666666-6666-6666-6666-666666666666', 'tv_show');
   ```

## Deploying on Vercel

1. **Create a Vercel Account:**

   Go to [Vercel](https://vercel.com/) and create an account.

2. **Link GitHub Repository:**

   Link your GitHub repository to Vercel and import the project.

3. **Configure Environment Variables:**

   In the Vercel dashboard, go to the project settings and add the following environment variables:

   ```env
  NEXT_PUBLIC_SUPABASE_URL="https://xvaymnbjuytecjttixbl.supabase.co"

NEXT_PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2YXltbmJqdXl0ZWNqdHRpeGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3MTU3NTUsImV4cCI6MjAzMjI5MTc1NX0.sQg43SVhv6m0S_yM0F0fN_HqidD8jhe2O1cRutodnsg"
   ```

4. **Deploy the Project:**

   Deploy the project on Vercel. Vercel will provide you with a URL for your deployed backend, e.g., `https://ott-platform-alpha.vercel.app`.

## API Endpoints

### Add to My List

- **URL:** `https://ott-platform-alpha.vercel.app/api/my-list/add`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**

  ```json
  {
      "userId": "11111111-1111-1111-1111-111111111111",
      "contentId": "44444444-4444-4444-4444-444444444444",
      "contentType": "movie"
  }
  ```

### Remove from My List

- **URL:** `https://ott-platform-alpha.vercel.app/api/my-list/remove`
- **Method:** `DELETE`
- **Headers:** `Content-Type: application/json`
- **Body:**

  ```json
  {
      "userId": "11111111-1111-1111-1111-111111111111",
      "contentId": "44444444-4444-4444-4444-444444444444",
      "contentType": "movie"
  }
  ```

### List My Items

- **URL:** `https://ott-platform-alpha.vercel.app/api/my-list/list?userId=11111111-1111-1111-1111-111111111111&page=1&limit=10`
- **Method:** `GET`

## Testing the APIs

You can use Postman or any other API testing tool to test these APIs.

1. **Add to My List:**
   - **URL:** `https://ott-platform-alpha.vercel.app/api/my-list/add`
   - **Method:** `POST`
   - **Headers:** 
     - `Content-Type: application/json`
   - **Body:**
     ```json
     {
         "userId": "11111111-1111-1111-1111-111111111111",
         "contentId": "44444444-4444-4444-4444-444444444444",
         "contentType": "movie"
     }
     ```

2. **Remove from My List:**
   - **URL:** `https://ott-platform-alpha.vercel.app/api/my-list/remove`
   - **Method:** `DELETE`
   - **Headers:** 
     - `Content-Type: application/json`
   - **Body:**
     ```json
     {
         "userId": "11111111-1111-1111-1111-111111111111",
         "contentId": "44444444-4444-4444-4444-444444444444",
         "contentType": "movie"
     }
     ```

3. **List My Items:**
   - **URL:** `https://ott-platform-alpha.vercel.app/api/my-list/list?userId=11111111-1111-1111-1111-111111111111&page=1&limit=10`
   - **Method:** `GET`

## Valid Mock Data

Use the following mock data for testing:

### Users

```json
[
  {
    "id": "11111111-1111-1111-1111-111111111111",
    "username": "testuser1"
  },
  {
    "id": "22222222-2222-2222-2222-222222222222",
    "username": "testuser2"
  }
]
```

### Movies

```json
[
  {
    "id": "33333333-3333-3333-3333-333333333333",
    "title": "Test Movie 1",
    "description": "This is a test movie 1.",
    "genres": ["Action", "Comedy"]
  },
  {
    "id": "44444444-4444-

4444-4444-444444444444",
    "title": "Test Movie 2",
    "description": "This is a test movie 2.",
    "genres": ["Drama", "Romance"]
  }
]
```

### TV Shows

```json
[
  {
    "id": "55555555-5555-5555-5555-555555555555",
    "title": "Test TV Show 1",
    "description": "This is a test TV show 1.",
    "genres": ["SciFi", "Fantasy"]
  },
  {
    "id": "66666666-6666-6666-6666-666666666666",
    "title": "Test TV Show 2",
    "description": "This is a test TV show 2.",
    "genres": ["Horror", "Drama"]
  }
]
```

### User Lists

```json
[
  {
    "user_id": "11111111-1111-1111-1111-111111111111",
    "content_id": "33333333-3333-3333-3333-333333333333",
    "content_type": "movie"
  },
  {
    "user_id": "11111111-1111-1111-1111-111111111111",
    "content_id": "55555555-5555-5555-5555-555555555555",
    "content_type": "tv_show"
  },
  {
    "user_id": "22222222-2222-2222-2222-222222222222",
    "content_id": "44444444-4444-4444-4444-444444444444",
    "content_type": "movie"
  },
  {
    "user_id": "22222222-2222-2222-2222-222222222222",
    "content_id": "66666666-6666-6666-6666-666666666666",
    "content_type": "tv_show"
  }
]
```

<img width="1512" alt="remove-item" src="https://github.com/satish1872/ott-platform/assets/41827034/08f7a45c-b2c2-4ca9-a328-cb87eefe2725">
<img width="1512" alt="List-My-Items" src="https://github.com/satish1872/ott-platform/assets/41827034/e25fe41b-9b8e-494b-9988-c14f965e153d">
<img width="1512" alt="Add-to-My-List" src="https://github.com/satish1872/ott-platform/assets/41827034/a14bfd8e-09f7-4065-8d0d-288ed997af88">
<img width="1512" alt="Screenshot 2024-05-28 at 11 11 09 AM" src="https://github.com/satish1872/ott-platform/assets/41827034/3e4b40f8-cab0-4228-935c-41c648b2c220">
<img width="1512" alt="Screenshot 2024-05-28 at 11 10 48 AM" src="https://github.com/satish1872/ott-platform/assets/41827034/28395c46-0311-4027-94a6-241ba4940172">
<img width="1512" alt="Screenshot 2024-05-28 at 11 09 52 AM" src="https://github.com/satish1872/ott-platform/assets/41827034/3d65d407-1548-4873-b4ef-150793890b68">
<img width="1512" alt="Screenshot 2024-05-28 at 11 08 48 AM" src="https://github.com/satish1872/ott-platform/assets/41827034/4c8518c8-034b-43f1-a5be-9fc71ef2f54c">



