# 🧁 CupcakeClub

A modern web application for cupcake enthusiasts to share and discover delicious cupcake recipes from around the world.

**Live Demo:** [https://cupcakeclub.netlify.app/](https://cupcakeclub.netlify.app/)

## 📖 About

CupcakeClub is a community-driven recipe platform where users can upload their favorite cupcake recipes, browse creations from other bakers, and build their personal collection. Whether you're a professional baker or just getting started, CupcakeClub makes it easy to share your sweet creations with the world.

## ✨ Features

- 🔐 **User Authentication** - Secure signup and login system with personalized profiles
- 📝 **Recipe Management** - Create, edit, and manage your cupcake recipes
- 🖼️ **Image Uploads** - Add photos to showcase your cupcakes
- 🏷️ **Category Filtering** - Browse recipes by categories
- 👤 **User Profiles** - Customize your profile and view your recipe collection
- 🌙 **Cupcake Mode** - Toggle between light and cupcake themes
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop devices

## 🛠️ Tech Stack

**Frontend:**

- React 19 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Vite as build tool

**Backend & Database:**

- Supabase (PostgreSQL database)
- Supabase Authentication
- Supabase Storage for image hosting

**Deployment:**

- Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd project26_tag58-59_supabase_recipeApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**

   Create the following tables in your Supabase project:

   - `recipes` - Stores recipe information
   - `ingredients` - Stores recipe ingredients
   - `categories` - Stores recipe categories

   Configure a storage bucket named `recipe_images` for image uploads.

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components for routing
├── context/        # Global state management
├── utils/          # Supabase client configuration
├── interfaces/     # TypeScript type definitions
├── functions/      # Helper functions
├── layout/         # Layout wrapper components
└── assets/         # Static assets
```

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Features in Detail

### Recipe Creation

Users can create detailed cupcake recipes including:

- Recipe name and description
- Number of servings
- Step-by-step instructions
- Category selection
- Ingredient list with quantities and units
- Recipe image upload

### User Dashboard

- View all your created recipes
- Edit existing recipes
- Manage your profile information

### Browse & Discover

- View all community recipes
- Filter by categories
- View detailed recipe information with full ingredients and instructions

## 🤝 Contributing

This project was created as part of a learning exercise. Feel free to fork and customize for your own use!

## 📝 License

This project is open source and available for educational purposes.

---

Made with 💜 and 🧁
