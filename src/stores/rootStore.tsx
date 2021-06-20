import React from "react";
import { CharactersPageDataStore } from "./pageStores/charactersPageDataStore";
import { ComicsPageDataStore } from "./pageStores/comicsPageDataStore";
import { CreatorsPageDataStore } from "./pageStores/creatorsPageDataStore";
import { SeriesPageDataStore } from "./pageStores/seriesPageDataStore";
import { EventsPageDataStore } from "./pageStores/eventsPageDataStore";
import { StoriesPageDataStore } from "./pageStores/storiesPageDataStore";

import { CharacterDetailsDataStore } from "./detailsStores/characterDetailsDataStore";
import { ComicDetailsDataStore } from "./detailsStores/comicDetailsDataStore";
import { CreatorDetailsDataStore } from "./detailsStores/creatorDetailsDataStore";
import { SeriesDetailsDataStore } from "./detailsStores/seriesDetailsDataStore";
import { EventDetailsDataStore } from "./detailsStores/eventDetailsDataStore";
import { StoryDetailsDataStore } from "./detailsStores/storyDetailsDataStore";

class RootStore {
  charactersPageDataStore: CharactersPageDataStore;
  comicsPageDataStore: ComicsPageDataStore;
  creatorsPageDataStore: CreatorsPageDataStore;
  eventsPageDataStore: EventsPageDataStore;
  seriesPageDataStore: SeriesPageDataStore;
  storiesPageDataStore: StoriesPageDataStore;
  characterDetailsDataStore: CharacterDetailsDataStore;
  comicDetailsDataStore: ComicDetailsDataStore;
  creatorDetailsDataStore: CreatorDetailsDataStore;
  seriesDetailsDataStore: SeriesDetailsDataStore;
  eventDetailsDataStore: EventDetailsDataStore;
  storyDetailsDataStore: StoryDetailsDataStore;

  constructor() {
    this.charactersPageDataStore = new CharactersPageDataStore();
    this.creatorsPageDataStore = new CreatorsPageDataStore();
    this.comicsPageDataStore = new ComicsPageDataStore();
    this.eventsPageDataStore = new EventsPageDataStore();
    this.seriesPageDataStore = new SeriesPageDataStore();
    this.storiesPageDataStore = new StoriesPageDataStore();

    this.characterDetailsDataStore = new CharacterDetailsDataStore();
    this.comicDetailsDataStore = new ComicDetailsDataStore();
    this.creatorDetailsDataStore = new CreatorDetailsDataStore();
    this.seriesDetailsDataStore = new SeriesDetailsDataStore();
    this.eventDetailsDataStore = new EventDetailsDataStore();
    this.storyDetailsDataStore = new StoryDetailsDataStore();
  }
}

const rootStore = new RootStore();

export { RootStore, rootStore };

const RootStoreContext = React.createContext({} as RootStore);

export const RootStoreProvider: React.FC = (props) => (
  <RootStoreContext.Provider value={rootStore}>{props.children}</RootStoreContext.Provider>
);

export const useRootStore = () => React.useContext(RootStoreContext);
