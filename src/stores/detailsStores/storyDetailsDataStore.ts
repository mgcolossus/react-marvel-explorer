import { makeAutoObservable, runInAction } from "mobx";
import {
  StoryDetailsData, ComicLinkItem, EventLinkItem, SeriesLinkItem, CharacterLinkItem, CreatorLinkItem
} from "../../types";
import { replaceHttpWithHttps } from "../utils";
import {
  charactersSectionInitialState,
  comicsSectionInitialState,
  creatorsSectionInitialState,
  eventsSectionInitialState,
  seriesSectionInitialState
} from "./sectionsInitialStates";

const storyDetailsInitialState: StoryDetailsData = {
  id: null,
  title: "",
  description: "",
  charactersAvailable: 0,
  comicsAvailable: 0,
  creatorsAvailable: 0,
  eventsAvailable: 0,
  seriesAvailable: 0
};

class StoryDetailsDataStore {
  loading = true;

  error = false;

  storyId = "";

  storyData = storyDetailsInitialState;

  storyCharactersData = charactersSectionInitialState;

  storyComicsData = comicsSectionInitialState;

  storyCreatorsData = creatorsSectionInitialState;

  storyEventsData = eventsSectionInitialState;

  storySeriesData = seriesSectionInitialState;

  constructor() {
    makeAutoObservable(this);
    this.changeCharactersSectionPage = this.changeCharactersSectionPage.bind(this);
    this.changeComicsSectionPage = this.changeComicsSectionPage.bind(this);
    this.changeCreatorsSectionPage = this.changeCreatorsSectionPage.bind(this);
    this.changeEventsSectionPage = this.changeEventsSectionPage.bind(this);
    this.changeSeriesSectionPage = this.changeSeriesSectionPage.bind(this);
  }

  setStory(id: string) {
    this.storyId = id;
    this.loadStoryData();
  }

  resetStoryData() {
    this.loading = true;
    this.error = false;
    this.storyId = "";
    this.storyData = storyDetailsInitialState;
    this.storyCharactersData = charactersSectionInitialState;
    this.storyComicsData = comicsSectionInitialState;
    this.storyCreatorsData = creatorsSectionInitialState;
    this.storyEventsData = eventsSectionInitialState;
    this.storySeriesData = seriesSectionInitialState;
  }

  async loadStoryData() {
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/stories/${this.storyId}?apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.storyData = {
          id: jsonData.data.results[0].id,
          title: jsonData.data.results[0].title,
          description: jsonData.data.results[0].description,
          charactersAvailable: jsonData.data.results[0].characters.available,
          comicsAvailable: jsonData.data.results[0].comics.available,
          creatorsAvailable: jsonData.data.results[0].creators.available,
          eventsAvailable: jsonData.data.results[0].events.available,
          seriesAvailable: jsonData.data.results[0].series.available
        };

        this.storyCharactersData = {
          ...this.storyCharactersData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].characters.collectionURI)
        };
        this.storyComicsData = {
          ...this.storyComicsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].comics.collectionURI)
        };
        this.storyCreatorsData = {
          ...this.storyCreatorsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].creators.collectionURI)
        };
        this.storyEventsData = {
          ...this.storyEventsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].events.collectionURI)
        };
        this.storySeriesData = {
          ...this.storySeriesData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].series.collectionURI)
        };

        this.loading = false;
      });
      this.loadStoryCharactersData();
      this.loadStoryComicsData();
      this.loadStoryCreatorsData();
      this.loadStoryEventsData();
      this.loadStorySeriesData();
    } catch (error) {
      runInAction(() => {
        this.error = true;
        this.loading = false;
        console.error(error);
      });
    }
  }

  async loadStoryCharactersData() {
    try {
      this.storyCharactersData.loading = true;
      const offset = (this.storyCharactersData.currentPage - 1) * this.storyCharactersData.itemsPerPage;

      const response = await fetch(
        `${this.storyCharactersData.collectionURI}?offset=${offset}&limit=${this.storyCharactersData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.storyCharactersData = {
          ...this.storyCharactersData,
          items: jsonData.data.results.map((characterData: CharacterLinkItem) => ({ id: characterData.id, name: characterData.name })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.storyCharactersData.itemsPerPage)
        };
        this.storyCharactersData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.storyCharactersData.error = true;
        console.error(error);
        this.storyCharactersData.loading = false;
      });
    }
  }

  async loadStoryComicsData() {
    try {
      this.storyComicsData.loading = true;
      const offset = (this.storyComicsData.currentPage - 1) * this.storyComicsData.itemsPerPage;

      const response = await fetch(
        `${this.storyComicsData.collectionURI}?offset=${offset}&limit=${this.storyComicsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.storyComicsData = {
          ...this.storyComicsData,
          items: jsonData.data.results.map((comicData: ComicLinkItem) => ({ id: comicData.id, title: comicData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.storyComicsData.itemsPerPage)
        };
        this.storyComicsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.storyComicsData.error = true;
        console.error(error);
        this.storyComicsData.loading = false;
      });
    }
  }

  async loadStoryEventsData() {
    try {
      this.storyEventsData.loading = true;
      const offset = (this.storyEventsData.currentPage - 1) * this.storyEventsData.itemsPerPage;

      const response = await fetch(
        `${this.storyEventsData.collectionURI}?offset=${offset}&limit=${this.storyEventsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.storyEventsData = {
          ...this.storyEventsData,
          items: jsonData.data.results.map((eventData: EventLinkItem) => ({ id: eventData.id, title: eventData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.storyEventsData.itemsPerPage)
        };
        this.storyEventsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.storyEventsData.error = true;
        console.error(error);
        this.storyEventsData.loading = false;
      });
    }
  }

  async loadStoryCreatorsData() {
    try {
      this.storyCreatorsData.loading = true;
      const offset = (this.storyCreatorsData.currentPage - 1) * this.storyCreatorsData.itemsPerPage;

      const response = await fetch(
        `${this.storyCreatorsData.collectionURI}?offset=${offset}&limit=${this.storyCreatorsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.storyCreatorsData = {
          ...this.storyCreatorsData,
          items: jsonData.data.results.map((creatorData: CreatorLinkItem) => ({ id: creatorData.id, fullName: creatorData.fullName })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.storyCreatorsData.itemsPerPage)
        };
        this.storyCreatorsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.storyCreatorsData.error = true;
        console.error(error);
        this.storyCreatorsData.loading = false;
      });
    }
  }

  async loadStorySeriesData() {
    try {
      this.storySeriesData.loading = true;
      const offset = (this.storySeriesData.currentPage - 1) * this.storySeriesData.itemsPerPage;

      const response = await fetch(
        `${this.storySeriesData.collectionURI}?offset=${offset}&limit=${this.storySeriesData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.storySeriesData = {
          ...this.storySeriesData,
          items: jsonData.data.results.map((seriesData: SeriesLinkItem) => ({ id: seriesData.id, title: seriesData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.storySeriesData.itemsPerPage)
        };
        this.storySeriesData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.storySeriesData.error = true;
        console.error(error);
        this.storySeriesData.loading = false;
      });
    }
  }

  changeCharactersSectionPage(newPage: number) {
    this.storyCharactersData.currentPage = newPage;
    this.loadStoryCharactersData();
  }

  changeComicsSectionPage(newPage: number) {
    this.storyComicsData.currentPage = newPage;
    this.loadStoryComicsData();
  }

  changeCreatorsSectionPage(newPage: number) {
    this.storyCreatorsData.currentPage = newPage;
    this.loadStoryCreatorsData();
  }

  changeEventsSectionPage(newPage: number) {
    this.storyEventsData.currentPage = newPage;
    this.loadStoryEventsData();
  }

  changeSeriesSectionPage(newPage: number) {
    this.storySeriesData.currentPage = newPage;
    this.loadStorySeriesData();
  }
}

export {
  StoryDetailsDataStore
};
