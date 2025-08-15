# Todo List Application

## 📌 What It Does
A modern, full-stack **Todo List Application** built with Next.js that allows users to:

- ✅ **Create** new todo items with a clean, intuitive interface  
- ✅ **Read** all todos with real-time updates  
- ✅ **Update** todo text inline with edit functionality  
- ✅ **Delete** individual todos or clear all at once  
- ✅ **Toggle** completion status with visual feedback  
- ✅ **Dark/Light Mode** with automatic theme detection and persistence  
- ✅ **Responsive Design** for desktop and mobile  
- ✅ **Real-time Data** persistence using Supabase  
- ✅ **Error Handling** with user-friendly messages  
- ✅ **Loading States** with smooth transitions and spinners  

The app features a **beautiful, modern UI** with smooth animations, hover effects, and a clean design that adapts to both light and dark themes.

---

## 🛠 Tech Stack Used

### **Frontend**
- **Next.js 14** – React framework with App Router  
- **React 18** – Modern UI library with hooks  
- **TypeScript** – Type-safe JavaScript  
- **Tailwind CSS** – Utility-first CSS framework  
- **PostCSS** – CSS processing  

### **Backend & Database**
- **Next.js API Routes** – Server-side API endpoints  
- **Supabase** – PostgreSQL database with real-time capabilities  
- **Supabase JavaScript Client** – Database client library  

### **Development Tools**
- **Node.js** – JavaScript runtime  
- **npm** – Package manager  
- **TypeScript** – Type checking and compilation  

---

## 🚀 How to Run It

### **Prerequisites**
- Node.js **v18+**
- npm or yarn package manager
- Supabase account and project

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd Todo-List
```

## Install Dependencies
```bash
npm install
```

## Set Up Supabase
Create a .env.local file in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://fwumkpxyfkgadpazdwpu.supabase.co/
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dW1rcHh5ZmtnYWRwYXpkd3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwNzgyMTEsImV4cCI6MjA3MDY1NDIxMX0.BUxBJwIiiVn05eK5ms-16eqEfNUoid0Uvpv8q_byPbs
```

## Run in Development
```bash
npm run dev
```

### App will be available at:
http://localhost:3000

## 👥 Who Did What

David Aung – Backend development, Supabase integration

Thidar – Frontend (loading spinner, edit feature, clear all functionality)

May – Dark/Light mode switch, testing & debugging

## 🎯 Key Features

Full CRUD operations for todos

Real-time synchronization with Supabase

Theme switching with persistence

Loading states & error handling

Fully responsive design


Smooth animations & modern UI

Type-safe codebase with TypeScript
