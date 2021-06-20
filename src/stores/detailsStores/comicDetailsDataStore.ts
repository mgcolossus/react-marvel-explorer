import { makeAutoObservable, runInAction } from "mobx";
import {
  CharacterLinkItem, ComicDetailsData, CreatorLinkItem, EventLinkItem, StoryLinkItem
} from "../../types";
import { getIdFromResourceURI, replaceHttpWithHttps } from "../utils";
import {
  charactersSectionInitialState, creatorsSectionInitialState, eventsSectionInitialState, storiesSectionInitialState
} from "./sectionsInitialStates";

const comicDetailsInitialState: ComicDetailsData = {
  id: null,
  title: "",
  description: "",
  thumbnail: null,
  charactersAvailable: 0,
  creatorsAvailable: 0,
  eventsAvailable: 0,
  storiesAvailable: 0
};

class ComicDetailsDataStore {
  loading = true;
  error = false;
  comicId = "";
  comicData = comicDetailsInitialState;
  comicCharactersData = charactersSectionInitialState;
  comicCreatorsData = creatorsSectionInitialState;
  comicEventsData = eventsSectionInitialState;
  comicSeriesData = {
    name: "",
    id: ""
  };

  comicStoriesData = storiesSectionInitialState;

  constructor() {
    makeAutoObservable(this);
    this.changeCharactersSectionPage = this.changeCharactersSectionPage.bind(this);
    this.changeCreatorsSectionPage = this.changeCreatorsSectionPage.bind(this);
    this.changeEventsSectionPage = this.changeEventsSectionPage.bind(this);
    this.changeStoriesSectionPage = this.changeStoriesSectionPage.bind(this);
  }

  setComic(id: string) {
    this.comicId = id;
    this.loadComicData();
  }

  resetComicData() {
    this.loading = true;
    this.error = false;
    this.comicId = "";
    this.comicData = comicDetailsInitialState;
    this.comicCharactersData = charactersSectionInitialState;
    this.comicCreatorsData = creatorsSectionInitialState;
    this.comicEventsData = eventsSectionInitialState;
    this.comicSeriesData = {
      name: "",
      id: ""
    };
    this.comicStoriesData = storiesSectionInitialState;
  }

  async loadComicData() {
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/comics/${this.comicId}?apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.comicData = {
          id: jsonData.data.results[0].id,
          title: jsonData.data.results[0].title,
          description: jsonData.data.results[0].description,
          thumbnail: jsonData.data.results[0].thumbnail,
          charactersAvailable: jsonData.data.results[0].characters.available,
          creatorsAvailable: jsonData.data.results[0].creators.available,
          eventsAvailable: jsonData.data.results[0].events.available,
          storiesAvailable: jsonData.data.results[0].stories.available
        };

        this.comicSeriesData = {
          name: jsonData.data.results[0].series.name,
          id: getIdFromResourceURI(jsonData.data.results[0].series.resourceURI)
        };

        this.comicCharactersData = {
          ...this.comicCharactersData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].characters.collectionURI)
        };

        this.comicCreatorsData = {
          ...this.comicCreatorsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].creators.collectionURI)
        };

        this.comicEventsData = {
          ...this.comicEventsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].events.collectionURI)
        };
        this.comicStoriesData = {
          ...this.comicEventsData,
          collectionURI: replaceHttpWithHttps(jsonData.data.results[0].stories.collectionURI)
        };
        this.loading = false;
      });
      this.loadComicCharactersData();
      this.loadComicCreatorsData();
      this.loadComicEventsData();
      this.loadComicStoriesData();
    } catch (error) {
      runInAction(() => {
        this.error = true;
        this.loading = false;
        console.error(error);
      });
    }
  }

  async loadComicCharactersData() {
    try {
      this.comicCharactersData.loading = true;
      const offset = (this.comicCharactersData.currentPage - 1) * this.comicCharactersData.itemsPerPage;

      const response = await fetch(
        `${this.comicCharactersData.collectionURI}?offset=${offset}&limit=${this.comicCharactersData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.comicCharactersData = {
          ...this.comicCharactersData,
          items: jsonData.data.results.map((characterData: CharacterLinkItem) => ({ id: characterData.id, name: characterData.name })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.comicCharactersData.itemsPerPage)
        };
        this.comicCharactersData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.comicCharactersData.error = true;
        console.error(error);
        this.comicCharactersData.loading = false;
      });
    }
  }

  async loadComicCreatorsData() {
    try {
      this.comicCreatorsData.loading = true;
      const offset = (this.comicCreatorsData.currentPage - 1) * this.comicCreatorsData.itemsPerPage;

      const response = await fetch(
        `${this.comicCreatorsData.collectionURI}?offset=${offset}&limit=${this.comicCreatorsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.comicCreatorsData = {
          ...this.comicCreatorsData,
          items: jsonData.data.results.map((creatorData: CreatorLinkItem) => ({ id: creatorData.id, fullName: creatorData.fullName })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.comicCreatorsData.itemsPerPage)
        };
        this.comicCreatorsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.comicCreatorsData.error = true;
        console.error(error);
        this.comicCreatorsData.loading = false;
      });
    }
  }

  async loadComicEventsData() {
    try {
      this.comicEventsData.loading = true;
      const offset = (this.comicEventsData.currentPage - 1) * this.comicEventsData.itemsPerPage;

      const response = await fetch(
        `${this.comicEventsData.collectionURI}?offset=${offset}&limit=${this.comicEventsData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.comicEventsData = {
          ...this.comicEventsData,
          items: jsonData.data.results.map((eventData: EventLinkItem) => ({ id: eventData.id, title: eventData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.comicEventsData.itemsPerPage)
        };
        this.comicEventsData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.comicEventsData.error = true;
        console.error(error);
        this.comicEventsData.loading = false;
      });
    }
  }

  async loadComicStoriesData() {
    try {
      this.comicStoriesData.loading = true;
      const offset = (this.comicStoriesData.currentPage - 1) * this.comicStoriesData.itemsPerPage;

      const response = await fetch(
        `${this.comicStoriesData.collectionURI}?offset=${offset}&limit=${this.comicStoriesData.itemsPerPage}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.comicStoriesData = {
          ...this.comicStoriesData,
          items: jsonData.data.results.map((storyData: StoryLinkItem) => ({ id: storyData.id, title: storyData.title })),
          itemsAvailable: jsonData.data.total,
          pagesCount: Math.ceil(jsonData.data.total / this.comicStoriesData.itemsPerPage)
        };
        this.comicStoriesData.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.comicStoriesData.error = true;
        console.error(error);
        this.comicStoriesData.loading = false;
      });
    }
  }

  changeCharactersSectionPage(newPage: number) {
    this.comicCharactersData.currentPage = newPage;
    this.loadComicCharactersData();
  }

  changeCreatorsSectionPage(newPage: number) {
    this.comicCreatorsData.currentPage = newPage;
    this.loadComicCreatorsData();
  }

  changeEventsSectionPage(newPage: number) {
    this.comicEventsData.currentPage = newPage;
    this.loadComicEventsData();
  }

  changeStoriesSectionPage(newPage: number) {
    this.comicStoriesData.currentPage = newPage;
    this.loadComicStoriesData();
  }
}

export {
  ComicDetailsDataStore
};
