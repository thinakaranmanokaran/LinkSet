# LinkSet - Temporary Secure Link Storage Web App

<p align="center">
<a href="https://thinakaranmanokaran.github.io/LinkSet/" target="_blank">
  <img src="public/preview.png" alt="LinkSet Preview" width="600">
  </a>
</p>

<p align="center">
  <a href="https://thinakaranmanokaran.github.io/LinkSet/" target="_blank">
    <img src="public/favicon520.png" alt="LinkSet Logo" width="200">
  </a>
</p>

<p align="center">
  <a href="https://thinakaranmanokaran.github.io/LinkSet/" target="_blank">
    <img src="https://img.shields.io/badge/Demo-LinkSet-blue?style=for-the-badge" alt="Live Demo">
  </a>
</p>

# 🔗 Overview

LinkSet is a **secure, fast, and user-friendly web application** built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Supabase integration**. It allows users to **store links securely with a 6-digit password** and **retrieve them for a limited time** (10 minutes). Perfect for **temporary file sharing, confidential URLs, or private links**.

## 🌟 Key Features

* **Secure Link Storage:** Password-protect your links with a 6-digit code.
* **Temporary Access:** Links expire automatically after 10 minutes.
* **Auto Delete:** Expired links are removed automatically from MongoDB or Supabase.
* **MERN Stack:** Full-stack web app using MongoDB, Express, React, Node.js.
* **Supabase Integration:** Optionally store and manage links with serverless Supabase database.
* **Responsive Design:** Mobile and desktop-friendly interface.
* **SEO Optimized:** Optimized meta tags, title, and descriptions.
* **Easy Deployment:** Compatible with Vercel, Netlify, or any Node.js hosting.

## 🚀 Demo

<p align="center">
  <img src="public/preview2.png" alt="LinkSet Demo" width="600">
</p>

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS, Axios, React Router DOM
* **Backend:** Node.js, Express.js, MongoDB (Mongoose) or Supabase Postgres
* **Database:** MongoDB (local or Atlas) / Supabase
* **Deployment:** Vercel, Netlify, or any Node.js server

## ⚡ How It Works

1. User enters a link and sets a **6-digit password**.
2. The link is stored in **MongoDB** or **Supabase** with an **expiration timestamp**.
3. Another user enters the **password** to retrieve the link.
4. The link **expires automatically after 10 minutes**.
5. Expired links are automatically deleted from the database.

## 📦 Installation

### Backend

```bash
cd backend
npm install
```

Create a `.env` file with the following:

```
MONGO_URI=mongodb://localhost:27017/LinkSet
SUPABASEURL=https://your-project.supabase.co
SUPABASEKEY=your-supabase-key
```

Run the backend server:

```bash
nodemon server.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 📝 API Endpoints

| Method | Endpoint      | Description                                         |
| ------ | ------------- | --------------------------------------------------- |
| POST   | /api/link     | Save a link with password and expiration            |
| POST   | /api/link/get | Retrieve a link by password (expires after 10 mins) |

## 🔒 Security & SEO

* **Secure Passwords:** Links are protected with 6-digit codes.
* **Temporary Storage:** Prevents long-term exposure of sensitive URLs.
* **SEO Friendly:** Meta tags, description, and keywords added for search engines.
* **Responsive & Fast:** Optimized for both desktop and mobile.

## 🌐 Keywords

Temporary link storage, secure link sharing, private URL, password protected link, MERN stack app, React link manager, Node.js backend, Express API, MongoDB TTL, Supabase database, auto-delete links, SEO friendly web app, fast link storage, temporary URL manager, online link vault, secure URL storage, confidential link sharing.

## 💡 Author

**Thinakaran Manokaran** - [https://www.thinakaran.dev/](https://www.thinakaran.dev/)

---

Made with ❤️ using **MERN Stack** and **Supabase**.
