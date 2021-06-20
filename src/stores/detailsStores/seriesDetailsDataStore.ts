import { makeAutoObservable, runInAction } from "mobx";
import {
  charactersSectionInitialState, comicsSectionInitialState, creatorsSectionInitialState, eventsSectionInitialState, storiesSectionInitialState
} from "./sectionsInitialStates";
import {
  CharacterLinkItem, ComicLinkItem, CreatorLinkItem, EventLinkItem, SeriesDetailsData, StoryLinkItem
} from "../../types";
import { replaceHttpWithHttps } from "../utils";

const characterDetailsInitialState: SeriesDetailsData = {
  id: null,
  title: "string",
  description: "string",
  thumbnail: null,
  charactersAvailable: 0,
  comicsAvailable: 0,
  creatorsAvailable: 0,
  eventsAvailable: 0,
  storiesAvailable: 0
};

class SeriesDetailsDataStore {
  loading = true;

  error = false;

  seriesId = "";

  seriesData = characterDetailsInitialState;

  seriesCharactersData = charactersSectionInitialState;

  seriesComicsData = comicsSectionInitialState;

  seriesCreatorsData = creatorsSectionInitialState;

  seriesEventsData = eventsSectionInitialState;

  seriesStoriesData = storiesSectionInitialState;

  constructor() {
    makeAutoObservable(this);
    this.changeCharactersSectionPage = this.changeCharactersSectionPage.bind(this);
    this.changeComicsSectionPage = this.changeComicsSectionPage.bind(this);
    this.changeCreatorsSectionPage = this.changeCreatorsSectionPage.bind(this);
    this.changeEventsSectionPage = this.changeEventsSectionPage.bind(this);
    this.changeStoriesSectionPage = this.changeStoriesSectionPage.bind(this);
  }

  setSeries(id: string) {
    this.seriesId = id;
    this.loadSeriesData();
  }

  resetSeriesData() {
    this.loading = true;
    this.error = false;
    this.seriesId = "";
    this.seriesData = characterDetailsInitialState;
    this.seriesCharactersData = charactersSectionInitialState;
    this.seriesComicsData = comicsSectionInitialState;
    this.seriesCreatorsData = creatorsSectionInitialState;
    this.seriesEventsData = eventsSectionInitialState;
    this.seriesStoriesData = storiesSectionInitialState;
  }

  async loadSeriesData() {
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/series/${this.seriesId}?apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.seriesData = {
          id: jsonData.data.results[0].id,
          title: jsonData.data.results[0].title,
          description: jsonData.data.results[0].description,
          thumbnail: jsonData.data.results[0].thumbnail,
          charactersAvailable: jsonData.data.results[0].characters.available,
          comicsAvailable: jsonData.data.results[0].comics.available,
          creatorsAvailable: jsonData.data.results[0].creators.available,
          eventsAvailable: jsonData.data.results[0].events.available,
          storiesAvailable: jsonData.data.results[0].stories.available
        };
        this.seriesCharactersData = {
          ...this.seriesCharactersData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].characters.collectionURI)
        };
        this.seriesComicsData = {
          ...this.seriesComicsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].comics.collectionURI)
        };
        this.seriesCreatorsData = {
          ...this.seriesCreatorsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].creators.collectionURI)
        };
        this.seriesEventsData = {
          ...this.seriesEventsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].events.collectionURI)
        };
        this.seriesStoriesData = {
          ...this.seriesStoriesData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].stories.collectionURI)
        };
        this.loading = false;
      });
      this.loadSeriesCharactersData();
      this.loadSeriesComicsData();
      this.loadSeriesCreatorsData();
      this.loadSeriesEventsData();
      this.loadSeriesStoriesData();
    } catch (error) {
      runInAction(() => {
        this.error = true;
        this.loading = false;
        console.error(error);
      });
    }
  }

  async loadSeriesCharactersData() {
    try {
      this.seriesCharactersData.loading = true;
      const offset = (this.seriesCharactersData.currentPage - 1) * this.seriesCharactersData.itemsPerPage;

      const response = await fetch(
        `${this.seriesCharactersData.collectionURI}?offset=${offset}&limit=${this.seriesCharactersData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.seriesCharactersData = {
          ...this.seriesCharactersData,
          items: jsonData.data.results.map((characterData: CharacterLinkItem) => ({ id: characterData.id, name: characterData.name })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.seriesCharactersData.itemsPerPage)
        };
        this.seriesCharactersData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.seriesCharactersData.error = true;
        console.error(error);
        this.seriesCharactersData.loading = false;
      });
    }
  }

  async loadSeriesComicsData() {
    try {
      this.seriesComicsData.loading = true;
      const offset = (this.seriesComicsData.currentPage - 1) * this.seriesComicsData.itemsPerPage;

      const response = await fetch(
        `${this.seriesComicsData.collectionURI}?offset=${offset}&limit=${this.seriesComicsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.seriesComicsData = {
          ...this.seriesComicsData,
          items: jsonData.data.results.map((comicsData: ComicLinkItem) => ({ id: comicsData.id, title: comicsData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.seriesComicsData.itemsPerPage)
        };
        this.seriesComicsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.seriesComicsData.error = true;
        console.error(error);
        this.seriesComicsData.loading = false;
      });
    }
  }

  async loadSeriesCreatorsData() {
    try {
      this.seriesCreatorsData.loading = true;
      const offset = (this.seriesCreatorsData.currentPage - 1) * this.seriesCreatorsData.itemsPerPage;

      const response = await fetch(
        `${this.seriesCreatorsData.collectionURI}?offset=${offset}&limit=${this.seriesCreatorsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.seriesCreatorsData = {
          ...this.seriesCreatorsData,
          items: jsonData.data.results.map((creatorData: CreatorLinkItem) => ({ id: creatorData.id, fullName: creatorData.fullName })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.seriesCreatorsData.itemsPerPage)
        };
        this.seriesCreatorsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.seriesCreatorsData.error = true;
        console.error(error);
        this.seriesCreatorsData.loading = false;
      });
    }
  }

  async loadSeriesEventsData() {
    try {
      this.seriesEventsData.loading = true;
      const offset = (this.seriesEventsData.currentPage - 1) * this.seriesEventsData.itemsPerPage;

      const response = await fetch(
        `${this.seriesEventsData.collectionURI}?offset=${offset}&limit=${this.seriesEventsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.seriesEventsData = {
          ...this.seriesEventsData,
          items: jsonData.data.results.map((eventData: EventLinkItem) => ({ id: eventData.id, title: eventData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.seriesEventsData.itemsPerPage)
        };
        this.seriesEventsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.seriesEventsData.error = true;
        console.error(error);
        this.seriesEventsData.loading = false;
      });
    }
  }

  async loadSeriesStoriesData() {
    try {
      this.seriesStoriesData.loading = true;
      const offset = (this.seriesStoriesData.currentPage - 1) * this.seriesStoriesData.itemsPerPage;

      const response = await fetch(
        `${this.seriesStoriesData.collectionURI}?offset=${offset}&limit=${this.seriesStoriesData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.seriesStoriesData = {
          ...this.seriesStoriesData,
          items: jsonData.data.results.map((storyData: StoryLinkItem) => ({ id: storyData.id, title: storyData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.seriesStoriesData.itemsPerPage)
        };
        this.seriesStoriesData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.seriesStoriesData.error = true;
        console.error(error);
        this.seriesStoriesData.loading = false;
      });
    }
  }

  changeCharactersSectionPage(newPage: number) {
    this.seriesCharactersData.currentPage = newPage;
    this.loadSeriesCharactersData();
  }

  changeComicsSectionPage(newPage: number) {
    this.seriesComicsData.currentPage = newPage;
    this.loadSeriesComicsData();
  }

  changeCreatorsSectionPage(newPage: number) {
    this.seriesCreatorsData.currentPage = newPage;
    this.loadSeriesCreatorsData();
  }

  changeEventsSectionPage(newPage: number) {
    this.seriesEventsData.currentPage = newPage;
    this.loadSeriesEventsData();
  }

  changeStoriesSectionPage(newPage: number) {
    this.seriesStoriesData.currentPage = newPage;
    this.loadSeriesStoriesData();
  }
}

export {
  SeriesDetailsDataStore
};
