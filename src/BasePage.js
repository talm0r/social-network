import { Redirect, Route, Switch } from "react-router";
import HomepageComponent from "./components/Homepage/HomepageComponent";

export default function BasePage() {

    return (
        <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/homepage" />
        }
        <Route path="/homepage" component={HomepageComponent} />
        {/* <ContentRoute path="/dashboard" component={HomepageComponent} /> */}
       
        {/* <Redirect to="error/error-v1" /> */}
      </Switch>
    )

}