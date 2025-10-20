import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import Recipes from "./pages/recipes/Recipes"
import Login from "./pages/login/Login"
import Details from "./pages/details/Details"
import CreateNewCupcake from "./pages/createNewCupcake/CreateNewCupcake"
import SignUp from "./pages/signUp/SignUp"
import Profile from "./pages/profile/Profile"
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute"
import Favorites from "./pages/favorites/Favorites"
import UserRecipes from "./pages/userRecipes/UserRecipes"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route
          path="create"
          element={
            <ProtectedRoute>
              <CreateNewCupcake />
            </ProtectedRoute>
          }
        />
        <Route path="favorites" element={<Favorites />} />

        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="user_recipes" element={<UserRecipes />} />
        <Route path="details/:id" element={<Details />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
