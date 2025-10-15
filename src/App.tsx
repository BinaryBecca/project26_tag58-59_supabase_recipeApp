import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import About from "./pages/about/About"
import Recipes from "./pages/recipes/Recipes"
import Login from "./pages/login/Login"
import Details from "./pages/details/Details"
import CreateNewCupcake from "./pages/createNewCupcake/CreateNewCupcake"
import SignUp from "./pages/signUp/SignUp"
import Profile from "./pages/profile/Profile"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="about" element={<About />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create" element={<CreateNewCupcake />} />
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
