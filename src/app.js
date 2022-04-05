import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import * as ROUTES from "./constants/routes.js";
import { Home, Browse, Signin, Signup } from "./pages";
import { IsUserRedirect, ProtectedRoute } from "./helpers/routes.js";
import {useAuthListener} from './hooks';

export default function App() {
  const user = useAuthListener();
  console.log(user);
  return (
    <Router>
    <Routes>
      <Route exact path={ROUTES.SIGN_UP} element={<Signup />}/>
      <Route exact path={ROUTES.SIGN_UP} element={<IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path = {ROUTES.SIGN_UP} exact />}/>
      <Route exact path={ROUTES.SIGN_IN} element={<Signin />}/>
      <Route exact path={ROUTES.SIGN_IN} element={<IsUserRedirect user={user} loggedInPath={ROUTES.BROWSE} path = {ROUTES.SIGN_IN} exact />}/>
      <Route exact path={ROUTES.BROWSE} element={<Browse />}/>
      <Route exact path={ROUTES.BROWSE} element={<ProtectedRoute user={user} path={ROUTES.BROWSE}/>}/>
      <Route exact path={ROUTES.HOME} element={<Home />}/>
    </Routes>
    </Router>
  );
}