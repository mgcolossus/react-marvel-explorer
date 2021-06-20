import { makeAutoObservable, runInAction } from "mobx";
import {
  CharacterDetailsData, ComicLinkItem, EventLinkItem, SeriesLinkItem, StoryLinkItem
} from "../../types";
import {
  comicsSectionInitialState, eventsSectionInitialState, seriesSectionInitialState, storiesSectionInitialState
} from "./sectionsInitialStates";

import { replaceHttpWithHttps } from "../utils";

const characterDetailsInitialState: CharacterDetailsData = {
  id: null,
  name: "",
  description: "",
  thumbnail: null,
  comicsAvailable: 0,
  eventsAvailable: 0,
  seriesAvailable: 0,
  storiesAvailable: 0
};

class CharacterDetailsDataStore {
  loading = true;
  error = false;
  characterId = "";
  characterData = characterDetailsInitialState;
  characterComicsData = comicsSectionInitialState;
  characterEventsData = eventsSectionInitialState;
  characterSeriesData = seriesSectionInitialState;
  characterStoriesData = storiesSectionInitialState;

  constructor() {
    makeAutoObservable(this);
    this.changeComicsSectionPage = this.changeComicsSectionPage.bind(this);
    this.changeEventsSectionPage = this.changeEventsSectionPage.bind(this);
    this.changeSeriesSectionPage = this.changeSeriesSectionPage.bind(this);
    this.changeStoriesSectionPage = this.changeStoriesSectionPage.bind(this);
  }

  setCharacter(id: string) {
    this.characterId = id;
    this.loadCharacterData();
  }

  resetCharacterData() {
    this.loading = true;
    this.error = false;
    this.characterId = "";
    this.characterData = characterDetailsInitialState;
    this.characterComicsData = comicsSectionInitialState;
    this.characterEventsData = eventsSectionInitialState;
    this.characterSeriesData = seriesSectionInitialState;
    this.characterStoriesData = storiesSectionInitialState;
  }

  async loadCharacterData() {
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters/${this.characterId}?apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.characterData = {
          id: jsonData.data.results[0].id,
          name: jsonData.data.results[0].name,
          description: jsonData.data.results[0].description,
          thumbnail: jsonData.data.results[0].thumbnail,
          comicsAvailable: jsonData.data.results[0].comics.available,
          eventsAvailable: jsonData.data.results[0].events.available,
          seriesAvailable: jsonData.data.results[0].series.available,
          storiesAvailable: jsonData.data.results[0].stories.available
        };

        this.characterComicsData = {
          ...this.characterComicsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].comics.collectionURI)
        };
        this.characterEventsData = {
          ...this.characterEventsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].events.collectionURI)
        };
        this.characterSeriesData = {
          ...this.characterEventsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].series.collectionURI)
        };
        this.characterStoriesData = {
          ...this.characterEventsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].stories.collectionURI)
        };
        this.loading = false;
      });
      this.loadCharacterComicsData();
      this.loadCharacterEventsData();
      this.loadCharacterSeriesData();
      this.loadCharacterStoriesData();
    } catch (error) {
      runInAction(() => {
        this.error = true;
        this.loading = false;
        console.error(error);
      });
    }
  }

  async loadCharacterComicsData() {
    try {
      this.characterComicsData.loading = true;
      const offset = (this.characterComicsData.currentPage - 1) * this.characterComicsData.itemsPerPage;

      const response = await fetch(
        `${this.characterComicsData.collectionURI}?offset=${offset}&limit=${this.characterComicsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.characterComicsData = {
          ...this.characterComicsData,
          items: jsonData.data.results.map((comicData: ComicLinkItem) => ({ id: comicData.id, title: comicData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.characterComicsData.itemsPerPage)
        };
        this.characterComicsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.characterComicsData.error = true;
        console.error(error);
        this.characterComicsData.loading = false;
      });
    }
  }

  async loadCharacterEventsData() {
    try {
      this.characterEventsData.loading = true;
      const offset = (this.characterEventsData.currentPage - 1) * this.characterEventsData.itemsPerPage;

      const response = await fetch(
        `${this.characterEventsData.collectionURI}?offset=${offset}&limit=${this.characterEventsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.characterEventsData = {
          ...this.characterEventsData,
          items: jsonData.data.results.map((eventData: EventLinkItem) => ({ id: eventData.id, title: eventData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.characterEventsData.itemsPerPage)
        };
        this.characterEventsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.characterEventsData.error = true;
        console.error(error);
        this.characterEventsData.loading = false;
      });
    }
  }

  async loadCharacterSeriesData() {
    try {
      this.characterSeriesData.loading = true;
      const offset = (this.characterSeriesData.currentPage - 1) * this.characterSeriesData.itemsPerPage;

      const response = await fetch(
        `${this.characterSeriesData.collectionURI}?offset=${offset}&limit=${this.characterSeriesData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.characterSeriesData = {
          ...this.characterSeriesData,
          items: jsonData.data.results.map((seriesData: SeriesLinkItem) => ({ id: seriesData.id, title: seriesData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.characterSeriesData.itemsPerPage)
        };
        this.characterSeriesData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.characterSeriesData.error = true;
        console.error(error);
        this.characterSeriesData.loading = false;
      });
    }
  }

  async loadCharacterStoriesData() {
    try {
      this.characterStoriesData.loading = true;
      const offset = (this.characterStoriesData.currentPage - 1) * this.characterStoriesData.itemsPerPage;

      const response = await fetch(
        `${this.characterStoriesData.collectionURI}?offset=${offset}&limit=${this.characterStoriesData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.characterStoriesData = {
          ...this.characterStoriesData,
          items: jsonData.data.results.map((storyData: StoryLinkItem) => ({ id: storyData.id, title: storyData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.characterStoriesData.itemsPerPage)
        };
        this.characterStoriesData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.characterStoriesData.error = true;
        console.error(error);
        this.characterStoriesData.loading = false;
      });
    }
  }

  changeComicsSectionPage(newPage: number) {
    this.characterComicsData.currentPage = newPage;
    this.loadCharacterComicsData();
  }

  changeEventsSectionPage(newPage: number) {
    this.characterEventsData.currentPage = newPage;
    this.loadCharacterEventsData();
  }

  changeSeriesSectionPage(newPage: number) {
    this.characterSeriesData.currentPage = newPage;
    this.loadCharacterSeriesData();
  }

  changeStoriesSectionPage(newPage: number) {
    this.characterStoriesData.currentPage = newPage;
    this.loadCharacterStoriesData();
  }
}

export { CharacterDetailsDataStore };
