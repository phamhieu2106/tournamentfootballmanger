import React from "react";
import { Routes, Route } from "react-router-dom";
import NationalComponent from "./component/nation/NationalComponent";
import PlayerComponent from "./component/player/PlayerComponent";
import { PlayerAddComponent } from "./component/player/component/PlayerAddComponent";
import { CoachComponent } from "./component/coach/CoachComponent";
import { AddFormComponent } from "./component/coach/component/AddFormComponent";
import { UpdateFormComponent } from "./component/coach/component/UpdateFormComponent";
import { TeamComponent } from "./component/team/TeamComponent";
import { AddFormTeamComponent } from "./component/team/component/AddFormComponent";
import { UpdateTeamFormComponent } from "./component/team/component/UpdateFormComponent";
import { HomePageComponent } from "./component/home-page/HomePageComponent";
import { StadiumComponent } from "./component/stadium/StadiumComponent";
import { FormAddStadiumComponent } from "./component/stadium/component/FormAddStadiumComponent";
import { FormUpdateStadiumComponent } from "./component/stadium/component/FormUpdateStadiumComponent";
import { TournamentComponent } from "./component/tournament/TournamentComponent";
import { FormAddTournamentComponent } from "./component/tournament/component/FormAddTournamentComponent";
import { NoAccessPageComponent } from "./component/error-page/403/NoAccessPageComponent";
import { NotFoundPageComponent } from "./component/error-page/404/NotFoundPageComponent";
import { ServerErrorPageComponent } from "./component/error-page/500/ServerErrorPageComponent";
import { LoginPageComponent } from "./component/user/login/LoginPageComponent";
import MainLayoutComponent from "./component/layout/MainLayoutComponent";
import { ForgotPasswordPageComponent } from "./component/user/forgot-password/ForgotPasswordPageComponent";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPageComponent />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPageComponent />} />
      <Route
        path="*"
        element={
          <MainLayoutComponent>
            <Routes>
              <Route path="*" element={<NotFoundPageComponent />} />
              <Route path="/" element={<HomePageComponent />} />
              <Route path="/403" element={<NoAccessPageComponent />} />
              <Route path="/404" element={<NotFoundPageComponent />} />
              <Route path="/500" element={<ServerErrorPageComponent />} />
              <Route
                path="/admin/tournaments"
                element={<TournamentComponent />}
              />
              <Route
                path="/admin/tournaments/them-moi"
                element={<FormAddTournamentComponent />}
              />
              <Route path="/admin/nations" element={<NationalComponent />} />
              <Route path="/admin/coaches" element={<CoachComponent />} />
              <Route
                path="/admin/coaches/them-moi"
                element={<AddFormComponent />}
              />
              <Route
                path="/admin/coaches/:id"
                element={<UpdateFormComponent />}
              />
              <Route path="/admin/players" element={<PlayerComponent />} />
              <Route
                path="/admin/players/them-moi"
                element={<PlayerAddComponent />}
              />
              <Route path="/admin/teams" element={<TeamComponent />} />
              <Route
                path="/admin/teams/them-moi"
                element={<AddFormTeamComponent />}
              />
              <Route
                path="/admin/teams/:id"
                element={<UpdateTeamFormComponent />}
              />
              <Route path="/admin/stadiums" element={<StadiumComponent />} />
              <Route
                path="/admin/stadiums/them-moi"
                element={<FormAddStadiumComponent />}
              />
              <Route
                path="/admin/stadiums/:id"
                element={<FormUpdateStadiumComponent />}
              />
            </Routes>
          </MainLayoutComponent>
        }
      />
    </Routes>
  );
}

export default App;
