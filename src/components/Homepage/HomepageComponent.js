import ProfileComponent from "../Profile/ProfileComponent";
import NotesTableComponent from "../Notes/NotesTableComponent";
import EditProfileComponent from "../Profile/EditProfileComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ChangePasswordComponent from "../Profile/ChangePasswordComponent";
import  HeaderComponent  from "../Header/HeaderComponent";
import NotesOutboxComponent from "../Notes/NotesOutboxComponent";
function HomepageComponent({ parentCallback }) {

  return (
    <>
   <HeaderComponent />
    <div className="container row mt-5">
      <div className="col-sm-3">
        <ProfileComponent  />
      </div>
      <div className="col-sm-9">
        <Switch>
        <Route path="/edit" exact>
          <EditProfileComponent />

        </Route>
        <Route path="/inbox" exact>
          <NotesTableComponent  />
        </Route>
        <Route path="/outbox" exact>
          <NotesOutboxComponent  />
        </Route>
        <Route path="/changepassword" exact>
          <ChangePasswordComponent  />
        </Route>
        </Switch>
      </div>
    </div>
</>
  );
}

export default HomepageComponent;
