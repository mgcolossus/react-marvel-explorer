import React from "react";
import { observer } from "mobx-react-lite";
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import { CharactersPage } from "./components/CharactersPage/CharactersPage";
import { ComicsPage } from "./components/ComicsPage/ComicsPage";
import { CreatorsPage } from "./components/CreatorsPage/CreatorsPage";
import { SeriesPage } from "./components/SeriesPage/SeriesPage";
import { CharacterDetails } from "./components/CharacterDetails/CharacterDetails";
import { ComicsDetails } from "./components/ComicsDetails/ComicsDetails";
import { Header } from "./components/Header/Header";
import { CreatorDetails } from "./components/CreatorDetails/CreatorDetails";
import { SeriesDetails } from "./components/SeriesDetails/SeriesDetails";
import { EventDetails } from "./components/EventDetails/EventDetails";
import { EventsPage } from "./components/EventsPage/EventsPage";
import { StoriesPage } from "./components/StoriesPage/StoriesPage";
import { StoryDetails } from "./components/StoryDetails/StoryDetails";
import "./App.scss";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";

const App = observer(() => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact>
        <Redirect to="/characters" />
      </Route>
      <Route path="/characters" exact>
        <CharactersPage />
      </Route>
      <Route path="/comics" exact>
        <ComicsPage />
      </Route>
      <Route path="/creators" exact>
        <CreatorsPage />
      </Route>
      <Route path="/events" exact>
        <EventsPage />
      </Route>
      <Route path="/series" exact>
        <SeriesPage />
      </Route>
      <Route path="/stories" exact>
        <StoriesPage />
      </Route>
      <Route path="/characters/:id" exact>
        <CharacterDetails />
      </Route>
      <Route path="/comics/:id" exact>
        <ComicsDetails />
      </Route>
      <Route path="/creators/:id" exact>
        <CreatorDetails />
      </Route>
      <Route path="/events/:id" exact>
        <EventDetails />
      </Route>
      <Route path="/series/:id" exact>
        <SeriesDetails />
      </Route>
      <Route path="/stories/:id" exact>
        <StoryDetails />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  </Router>
));

export default App;
