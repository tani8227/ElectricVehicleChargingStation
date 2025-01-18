import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './component/navbar/Navbar.jsx'
import UserSignUp from './component/user/SignUp.jsx'
import UserSignIn from './component/user/SignIn.jsx'
import ViewSlot from './component/admin/manageslotforEVBunk/ViewSlot.jsx'
import AdmminDashboard from './pages/AdminDashboard.jsx'
import AdminSignUp from './component/admin/SignUp.jsx'
import AdminSignIn from "./component/admin/SignIn.jsx"
import UserDashboard from './pages/UserDashBoard.jsx'
import AddSlotPage from './component/admin/manageslotforEVBunk/AddSlotForm.jsx'
import EVBunkDetails from './pages/EVBunkDetails.jsx'
import About from './component/navbar/Aboutus.jsx'
import ContactUs from './component/navbar/Contact.jsx'
import MapWrapper from './pages/MapWrapper.jsx'
import EditBunk from './component/admin/manageBunk/EdItEVBunkDetails.jsx'
import PaymentForm from './component/user/Payment/PaymentForm.jsx'
import Payment from './component/user/Payment/Payment.jsx'
import PaymentSuccess from './component/user/Payment/PaymentSuccess.jsx'
import UserBooking from './component/user/booking/UserBooking.jsx'
import FeedBack from './component/user/feedback/Feedback.jsx'




function App() {


  const param = useParams();

  const router = createBrowserRouter([
    {


      path: "/",
      children:
        [
          {
            element: <Navbar />,
            children:
              [
                {
                  index: true,
                  element: <Home />
                },
                {
                  path: "evbunk-details/:id",
                  element: <EVBunkDetails />,


                },
                {
                  path: "about",
                  element: <About />
                },
                {
                  path: "contact-us",
                  element: <ContactUs />
                },



              ],
          },

        ]

    },
    {
      path: 'user',
      children:
        [
          {
            path: 'signup',
            element: <UserSignUp />
          },
          {
            path: 'signin',
            element: <UserSignIn />
          },
          {
            path: 'dashboard',
            element: <Navbar />,
            children:
              [
                {
                  index: true,
                  element: <UserDashboard />,

                },

                {
                  path: ":item",
                  element: <AdmminDashboard />,

                },
                {
                  path: 'map-loaction/:geocode',

                  element: <MapWrapper />
                },
                {
                  path:'mybooking',
                  element:<UserBooking/>
                  
                },
                {
                  path:'feedback',
                  element:<FeedBack/>
                  
                },

              ],
            },

          {
            path: "payment",
            element: <Navbar />,
            children:
              [
                {
                  index: true,
                  element: <Payment />
                },
                {
                   path:'success',
                  element: <PaymentSuccess/>
                }
              ]
          }
        ]
    },
    {
      path: 'admin',

      children:
        [
          {
            path: 'signup',
            element: <AdminSignUp />
          },
          {
            path: 'signin',
            element: <AdminSignIn />
          },
          {
            path: 'dashboard',
            element: <Navbar />,
            children:
              [
                {
                  index: true,
                  element: <AdmminDashboard />,

                },
                {
                  path: ":item",
                  element: <AdmminDashboard />,

                },
                {
                  path: 'add-slot/:id',
                  element: <AddSlotPage />
                },
                {
                  path: "view-slot/:id",
                  element: <ViewSlot />
                },
                {
                  path: "edit-bunk/:id",
                  element: <EditBunk />
                }


              ]

          }
        ]
    }
  ])


  return (
    <>

      <RouterProvider router={router} />

    </>
  )
}

export default App;
