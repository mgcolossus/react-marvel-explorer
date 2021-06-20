import { makeAutoObservable, runInAction } from "mobx";
import {
  CharacterLinkItem, CreatorLinkItem, EventDetailsData, StoryLinkItem, ComicLinkItem, SeriesLinkItem
} from "../../types";
import {
  charactersSectionInitialState, creatorsSectionInitialState, storiesSectionInitialState, comicsSectionInitialState, seriesSectionInitialState
} from "./sectionsInitialStates";

import { replaceHttpWithHttps } from "../utils";

const eventDetailsInitialState: EventDetailsData = {
  id: null,
  title: "",
  description: "",
  thumbnail: null,
  charactersAvailable: 0,
  creatorsAvailable: 0,
  storiesAvailable: 0,
  comicsAvailable: 0,
  seriesAvailable: 0
};

class EventDetailsDataStore {
  loading = true;
  error = false;
  eventId = "";
  eventData = eventDetailsInitialState;
  eventCharactersData = charactersSectionInitialState;
  eventCreatorsData = creatorsSectionInitialState;
  eventStoriesData = storiesSectionInitialState;
  eventComicsData = comicsSectionInitialState;
  eventSeriesData = seriesSectionInitialState;

  constructor() {
    makeAutoObservable(this);
    this.changeCharactersSectionPage = this.changeCharactersSectionPage.bind(this);
    this.changeCreatorsSectionPage = this.changeCreatorsSectionPage.bind(this);
    this.changeStoriesSectionPage = this.changeStoriesSectionPage.bind(this);
    this.changeComicsSectionPage = this.changeComicsSectionPage.bind(this);
    this.changeSeriesSectionPage = this.changeSeriesSectionPage.bind(this);
  }

  setEvent(id: string) {
    this.eventId = id;
    this.loadEventData();
  }

  resetEventData() {
    this.loading = true;
    this.error = false;
    this.eventId = "";
    this.eventData = eventDetailsInitialState;
    this.eventCharactersData = charactersSectionInitialState;
    this.eventCreatorsData = creatorsSectionInitialState;
    this.eventStoriesData = storiesSectionInitialState;
    this.eventComicsData = comicsSectionInitialState;
    this.eventSeriesData = seriesSectionInitialState;
  }

  async loadEventData() {
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/events/${this.eventId}?apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.eventData = {
          id: jsonData.data.results[0].id,
          title: jsonData.data.results[0].title,
          description: jsonData.data.results[0].description,
          thumbnail: jsonData.data.results[0].thumbnail,
          charactersAvailable: jsonData.data.results[0].characters.available,
          creatorsAvailable: jsonData.data.results[0].creators.available,
          storiesAvailable: jsonData.data.results[0].stories.available,
          comicsAvailable: jsonData.data.results[0].comics.available,
          seriesAvailable: jsonData.data.results[0].series.available
        };
        this.eventCharactersData = {
          ...this.eventCharactersData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].characters.collectionURI)
        };
        this.eventCreatorsData = {
          ...this.eventCreatorsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].creators.collectionURI)
        };
        this.eventStoriesData = {
          ...this.eventStoriesData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].stories.collectionURI)
        };
        this.eventComicsData = {
          ...this.eventComicsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].comics.collectionURI)
        };
        this.eventSeriesData = {
          ...this.eventSeriesData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].series.collectionURI)
        };
        this.loading = false;
      });
      this.loadEventCharactersData();
      this.loadEventCreatorsData();
      this.loadEventComicsData();
      this.loadEventSeriesData();
      this.loadEventStoriesData();
    } catch (error) {
      runInAction(() => {
        this.error = true;
        this.loading = false;
        console.error(error);
      });
    }
  }

  async loadEventCharactersData() {
    try {
      this.eventCharactersData.loading = true;
      const offset = (this.eventCharactersData.currentPage - 1) * this.eventCharactersData.itemsPerPage;

      const response = await fetch(
        `${this.eventCharactersData.collectionURI}?offset=${offset}&limit=${this.eventCharactersData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.eventCharactersData = {
          ...this.eventCharactersData,
          items: jsonData.data.results.map((characterData: CharacterLinkItem) => ({ id: characterData.id, name: characterData.name })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.eventCharactersData.itemsPerPage)
        };
        this.eventCharactersData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.eventCharactersData.error = true;
        console.error(error);
        this.eventCharactersData.loading = false;
      });
    }
  }

  async loadEventCreatorsData() {
    try {
      this.eventCreatorsData.loading = true;
      const offset = (this.eventCreatorsData.currentPage - 1) * this.eventCreatorsData.itemsPerPage;

      const response = await fetch(
        `${this.eventCreatorsData.collectionURI}?offset=${offset}&limit=${this.eventCreatorsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.eventCreatorsData = {
          ...this.eventCreatorsData,
          items: jsonData.data.results.map((creatorData: CreatorLinkItem) => ({ id: creatorData.id, fullName: creatorData.fullName })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.eventCreatorsData.itemsPerPage)
        };
        this.eventCreatorsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.eventCreatorsData.error = true;
        console.error(error);
        this.eventCreatorsData.loading = false;
      });
    }
  }

  async loadEventStoriesData() {
    try {
      this.eventStoriesData.loading = true;
      const offset = (this.eventStoriesData.currentPage - 1) * this.eventStoriesData.itemsPerPage;

      const response = await fetch(
        `${this.eventStoriesData.collectionURI}?offset=${offset}&limit=${this.eventStoriesData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.eventStoriesData = {
          ...this.eventStoriesData,
          items: jsonData.data.results.map((storyData: StoryLinkItem) => ({ id: storyData.id, title: storyData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.eventStoriesData.itemsPerPage)
        };
        this.eventStoriesData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.eventStoriesData.error = true;
        console.error(error);
        this.eventStoriesData.loading = false;
      });
    }
  }

  async loadEventComicsData() {
    try {
      this.eventComicsData.loading = true;
      const offset = (this.eventComicsData.currentPage - 1) * this.eventComicsData.itemsPerPage;

      const response = await fetch(
        `${this.eventComicsData.collectionURI}?offset=${offset}&limit=${this.eventComicsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.eventComicsData = {
          ...this.eventComicsData,
          items: jsonData.data.results.map((comicData: ComicLinkItem) => ({ id: comicData.id, title: comicData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.eventComicsData.itemsPerPage)
        };
        this.eventComicsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.eventComicsData.error = true;
        console.error(error);
        this.eventComicsData.loading = false;
      });
    }
  }

  async loadEventSeriesData() {
    try {
      this.eventSeriesData.loading = true;
      const offset = (this.eventSeriesData.currentPage - 1) * this.eventSeriesData.itemsPerPage;

      const response = await fetch(
        `${this.eventSeriesData.collectionURI}?offset=${offset}&limit=${this.eventSeriesData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.eventSeriesData = {
          ...this.eventSeriesData,
          items: jsonData.data.results.map((seriesData: SeriesLinkItem) => ({ id: seriesData.id, title: seriesData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.eventSeriesData.itemsPerPage)
        };
        this.eventSeriesData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.eventSeriesData.error = true;
        console.error(error);
        this.eventSeriesData.loading = false;
      });
    }
  }

  changeCharactersSectionPage(newPage: number) {
    this.eventCharactersData.currentPage = newPage;
    this.loadEventCharactersData();
  }

  changeCreatorsSectionPage(newPage: number) {
    this.eventCreatorsData.currentPage = newPage;
    this.loadEventCreatorsData();
  }

  changeStoriesSectionPage(newPage: number) {
    this.eventStoriesData.currentPage = newPage;
    this.loadEventStoriesData();
  }

  changeComicsSectionPage(newPage: number) {
    this.eventComicsData.currentPage = newPage;
    this.loadEventComicsData();
  }

  changeSeriesSectionPage(newPage: number) {
    this.eventSeriesData.currentPage = newPage;
    this.loadEventSeriesData();
  }
}

export { EventDetailsDataStore };
