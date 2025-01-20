import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  PrivateRoute,
  HotelRoute,
  UserRoute,
} from "./privateRoutes/PrivateRoute";
import Loader from "./components/Loader/Loader";
import { Suspense, lazy } from "react";

// --------------------------- pages ---------------------------
const Home = lazy(() => import("./Pages/Home"));
const Hotel = lazy(() => import("./Pages/Hotel"));
const HotelList = lazy(() => import("./Pages/HotelList"));
const Destination = lazy(() => import("./Pages/Destination"));
const HotelType = lazy(() => import("./Pages/HotelType"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const HotelRegister = lazy(() => import("./Pages/RegisterHotel"));
const Blog = lazy(() => import("./Pages/Blog"));
const BlogDetails = lazy(() => import("./Pages/BlogDetails"));
const Account = lazy(() => import("./Pages/private/user/Account"));
const Bookings = lazy(() => import("./Pages/private/user/Bookings"));
const AddHotel = lazy(() => import("./Pages/private/hotel/AddHotel"));
const UpdateHotel = lazy(() => import("./Pages/private/hotel/UpdateHotel"));
const AddRoom = lazy(() => import("./Pages/private/hotel/AddRoom"));
const ListRooms = lazy(() => import("./Pages/private/hotel/ListRooms"));
const Error = lazy(() => import("./Pages/Error"));
const Layout = lazy(() => import("./Pages/private/hotel/layout/Layout"));
const UserLayout = lazy(() => import("./Pages/private/user/layout/UserLayout"));

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/hotels"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Hotel />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/hotel/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <HotelList />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/find/:destination"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Destination />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/type/:type/:count"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <HotelType />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Register />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/register-hotel"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <HotelRegister />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Blog />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <BlogDetails />
              </Suspense>
            </PrivateRoute>
          }
        />

        {/* User page */}
        <Route
          path="/user"
          element={
            <UserRoute>
              <Suspense fallback={<Loader />}>
                <UserLayout />
              </Suspense>
            </UserRoute>
          }
        >
          <Route
            path="/user/my-account"
            element={
              <Suspense fallback={<Loader />}>
                <Account />
              </Suspense>
            }
          />
          <Route
            path="/user/my-bookings"
            element={
              <Suspense fallback={<Loader />}>
                <Bookings />
              </Suspense>
            }
          />
        </Route>
        {/* Admin page */}
        <Route
          path="/dashboard/hotel"
          element={
            <HotelRoute>
              <Suspense fallback={<Loader />}>
                <Layout />
              </Suspense>
            </HotelRoute>
          }
        >
          <Route
            path="/dashboard/hotel"
            element={
              <Suspense fallback={<Loader />}>
                <AddHotel />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/hotel/update-hotel"
            element={
              <Suspense fallback={<Loader />}>
                <UpdateHotel />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/hotel/add-room"
            element={
              <Suspense fallback={<Loader />}>
                <AddRoom />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/hotel/list-room"
            element={
              <Suspense fallback={<Loader />}>
                <ListRooms />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/*"
          element={
            <Suspense fallback={<Loader />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
