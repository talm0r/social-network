import {  Route, Switch, Redirect } from "react-router-dom";
import HomepageComponent from "./components/Homepage/HomepageComponent";
import Login from "./components/pages/Login";
import { useSelector  } from 'react-redux'
export function Routes() {

  
      const isLoggedIn =  useSelector( (state) => {
   
        if(Object.keys(state.auth.user).length > 0 ) return true; 
        else return false;
    } ) 
    return (
      
        <Switch>
    
       {!isLoggedIn ? (
        // Redirect to `/login` when user is not logged in
        <>
        <Redirect to="/login" />
        <Route path="/login" component={Login} />
        </>
      ) : (
        <>
        <Redirect to="/inbox" />
        <Route path="/" component={HomepageComponent} />
        </>
      )}
          
          
         </Switch>
    )
}

