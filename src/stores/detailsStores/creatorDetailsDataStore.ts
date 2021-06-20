import { makeAutoObservable, runInAction } from "mobx";
import {
  ComicLinkItem,
  EventLinkItem,
  SeriesLinkItem,
  StoryLinkItem,
  СreatorDetailsData
} from "../../types";
import {
  comicsSectionInitialState, eventsSectionInitialState, seriesSectionInitialState, storiesSectionInitialState
} from "./sectionsInitialStates";
import { replaceHttpWithHttps } from "../utils";

const creatorDetailsInitialState: СreatorDetailsData = {
  id: null,
  fullName: "",
  thumbnail: null,
  comicsAvailable: 0,
  eventsAvailable: 0,
  seriesAvailable: 0,
  storiesAvailable: 0
};

class CreatorDetailsDataStore {
  loading = true;
  error = false;
  creatorId = "";
  creatorData = creatorDetailsInitialState;
  creatorComicsData = comicsSectionInitialState;
  creatorEventsData = eventsSectionInitialState;
  creatorSeriesData = seriesSectionInitialState;
  creatorStoriesData = storiesSectionInitialState;

  constructor() {
    makeAutoObservable(this);
    this.changeComicsSectionPage = this.changeComicsSectionPage.bind(this);
    this.changeEventsSectionPage = this.changeEventsSectionPage.bind(this);
    this.changeSeriesSectionPage = this.changeSeriesSectionPage.bind(this);
    this.changeStoriesSectionPage = this.changeStoriesSectionPage.bind(this);
  }

  setCreator(id: string) {
    this.creatorId = id;
    this.loadCreatorData();
  }

  resetCreatorData() {
    this.loading = true;
    this.error = false;
    this.creatorId = "";
    this.creatorData = creatorDetailsInitialState;
    this.creatorComicsData = comicsSectionInitialState;
    this.creatorEventsData = eventsSectionInitialState;
    this.creatorSeriesData = seriesSectionInitialState;
    this.creatorStoriesData = storiesSectionInitialState;
  }

  async loadCreatorData() {
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/creators/${this.creatorId}?apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.creatorData = {
          id: jsonData.data.results[0].id,
          fullName: jsonData.data.results[0].fullName,
          thumbnail: jsonData.data.results[0].thumbnail,
          comicsAvailable: jsonData.data.results[0].comics.available,
          eventsAvailable: jsonData.data.results[0].events.available,
          seriesAvailable: jsonData.data.results[0].series.available,
          storiesAvailable: jsonData.data.results[0].stories.available
        };
        this.creatorComicsData = {
          ...this.creatorComicsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].comics.collectionURI)
        };
        this.creatorEventsData = {
          ...this.creatorEventsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].events.collectionURI)
        };
        this.creatorSeriesData = {
          ...this.creatorEventsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].series.collectionURI)
        };
        this.creatorStoriesData = {
          ...this.creatorEventsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].stories.collectionURI)
        };
        this.loading = false;
      });
      this.loadCreatorComicsData();
      this.loadCreatorEventsData();
      this.loadCreatorSeriesData();
      this.loadCreatorStoriesData();
    } catch (error) {
      runInAction(() => {
        this.error = true;
        this.loading = false;
        console.error(error);
      });
    }
  }

  async loadCreatorComicsData() {
    try {
      this.creatorComicsData.loading = true;
      const offset = (this.creatorComicsData.currentPage - 1) * this.creatorComicsData.itemsPerPage;

      const response = await fetch(
        `${this.creatorComicsData.collectionURI}?offset=${offset}&limit=${this.creatorComicsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.creatorComicsData = {
          ...this.creatorComicsData,
          items: jsonData.data.results.map((comicData: ComicLinkItem) => ({ id: comicData.id, title: comicData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.creatorComicsData.itemsPerPage)
        };
        this.creatorComicsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.creatorComicsData.error = true;
        console.error(error);
        this.creatorComicsData.loading = false;
      });
    }
  }

  async loadCreatorEventsData() {
    try {
      this.creatorEventsData.loading = true;
      const offset = (this.creatorEventsData.currentPage - 1) * this.creatorEventsData.itemsPerPage;

      const response = await fetch(
        `${this.creatorEventsData.collectionURI}?offset=${offset}&limit=${this.creatorEventsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.creatorEventsData = {
          ...this.creatorEventsData,
          items: jsonData.data.results.map((eventData: EventLinkItem) => ({ id: eventData.id, title: eventData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.creatorEventsData.itemsPerPage)
        };
        this.creatorEventsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.creatorEventsData.error = true;
        console.error(error);
        this.creatorEventsData.loading = false;
      });
    }
  }

  async loadCreatorSeriesData() {
    try {
      this.creatorSeriesData.loading = true;
      const offset = (this.creatorSeriesData.currentPage - 1) * this.creatorSeriesData.itemsPerPage;

      const response = await fetch(
        `${this.creatorSeriesData.collectionURI}?offset=${offset}&limit=${this.creatorSeriesData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.creatorSeriesData = {
          ...this.creatorSeriesData,
          items: jsonData.data.results.map((seriesData: SeriesLinkItem) => ({ id: seriesData.id, title: seriesData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.creatorSeriesData.itemsPerPage)
        };
        this.creatorSeriesData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.creatorSeriesData.error = true;
        console.error(error);
        this.creatorSeriesData.loading = false;
      });
    }
  }

  async loadCreatorStoriesData() {
    try {
      this.creatorStoriesData.loading = true;
      const offset = (this.creatorStoriesData.currentPage - 1) * this.creatorStoriesData.itemsPerPage;

      const response = await fetch(
        `${this.creatorStoriesData.collectionURI}?offset=${offset}&limit=${this.creatorStoriesData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.creatorStoriesData = {
          ...this.creatorStoriesData,
          items: jsonData.data.results.map((storyData: StoryLinkItem) => ({ id: storyData.id, title: storyData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.creatorStoriesData.itemsPerPage)
        };
        this.creatorStoriesData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.creatorStoriesData.error = true;
        console.error(error);
        this.creatorStoriesData.loading = false;
      });
    }
  }

  changeComicsSectionPage(newPage: number) {
    this.creatorComicsData.currentPage = newPage;
    this.loadCreatorComicsData();
  }

  changeEventsSectionPage(newPage: number) {
    this.creatorEventsData.currentPage = newPage;
    this.loadCreatorEventsData();
  }

  changeSeriesSectionPage(newPage: number) {
    this.creatorSeriesData.currentPage = newPage;
    this.loadCreatorSeriesData();
  }

  changeStoriesSectionPage(newPage: number) {
    this.creatorStoriesData.currentPage = newPage;
    this.loadCreatorStoriesData();
  }
}

export { CreatorDetailsDataStore };
