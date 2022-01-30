import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/homepage/HomePage";
import NavbarTop from "./components/navbar/NavbarTop";
import LoginPage from "./components/loginpage/LoginPage";
import { AppContext } from "./context/AppContext";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./components/signuppage/SignupPage";
import SearchPage from "./components/search/SearchPage";
import { ChakraProvider } from "@chakra-ui/react";
import ProfilePage from "./components/profilepage/ProfilePage";
import AdminPage from "./components/adminpage/AdminPage";
import Cookies from "js-cookie";
import UserPets from "./components/userpets/UserPets";
import PetProfile from "./components/PetProfile/PetProfile";
import { getUserSavedPet } from "./util/api";
import Footer from "./components/navbar/Footer";

function App() {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSignupModal, setIsSignupModal] = useState(false);
  const [isChangeInUser, setIsChangeInUser] = useState(false);
  const [user, setUser] = useState();

  const checkIfUserSignedIn = () => {
    if (Cookies.get("token")) {
      try {
        const userInfo = JSON.parse(atob(Cookies.get("token").split(".")[1]));
        return userInfo;
      } catch (e) {
        return null;
      }
    }
  };

  useEffect(() => {
    const unsub = async () => {
      const userInfo = checkIfUserSignedIn();
      if (userInfo) {
        const userSavedPetsData = await getUserSavedPet(userInfo.id);
        setUser({ ...userInfo, savedPets: userSavedPetsData?.pets });
      }
    };
    unsub();
    return unsub();
  }, [isChangeInUser, setUser]);

  const values = {
    setIsLoginModal: setIsLoginModal,
    isLoginModal: isLoginModal,
    isSignupModal: isSignupModal,
    setIsSignupModal: setIsSignupModal,
    user: user,
    setUser: setUser,
    checkIfUserSignedIn: checkIfUserSignedIn,
    setIsChangeInUser: setIsChangeInUser,
  };

  return (
    <ChakraProvider>
      <AppContext.Provider value={values}>
        <Router>
          <div className="App">
            <NavbarTop />
            <Routes>
              <Route exact path="/pet/:petID" element={<PetProfile />} />

              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/mypets" element={<UserPets />} />
              {user && (
                <Route exact path="/profile" element={<ProfilePage />} />
              )}
              <Route exact path="/adopt" element={<SearchPage />} />
              {user?.isAdmin && (
                <Route exact path="/admin" element={<AdminPage />} />
              )}
            </Routes>
            <Footer />
          </div>
        </Router>
        {isLoginModal && <LoginPage />}
        {isSignupModal && <SignupPage />}
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default App;
