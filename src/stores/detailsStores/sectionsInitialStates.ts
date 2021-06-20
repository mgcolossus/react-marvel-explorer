import {
  CharactersSectionData, ComicsSectionData, CreatorsSectionData, EventsSectionData, SeriesSectionData, StoriesSectionData
} from "../../types";

const charactersSectionInitialState: CharactersSectionData = {
  loading: true,
  error: false,
  currentPage: 1,
  itemsPerPage: 20,
  pagesCount: 0,
  collectionURI: "",
  itemsAvailable: 0,
  items: []
};

const comicsSectionInitialState: ComicsSectionData = {
  loading: true,
  error: false,
  currentPage: 1,
  itemsPerPage: 20,
  pagesCount: 0,
  collectionURI: "",
  itemsAvailable: 0,
  items: []
};

const creatorsSectionInitialState: CreatorsSectionData = {
  loading: true,
  error: false,
  currentPage: 1,
  itemsPerPage: 20,
  pagesCount: 0,
  collectionURI: "",
  itemsAvailable: 0,
  items: []
};

const eventsSectionInitialState: EventsSectionData = {
  loading: true,
  error: false,
  currentPage: 1,
  itemsPerPage: 20,
  pagesCount: 0,
  collectionURI: "",
  itemsAvailable: 0,
  items: []
};

const seriesSectionInitialState: SeriesSectionData = {
  loading: true,
  error: false,
  currentPage: 1,
  itemsPerPage: 20,
  pagesCount: 0,
  collectionURI: "",
  itemsAvailable: 0,
  items: []
};

const storiesSectionInitialState: StoriesSectionData = {
  loading: true,
  error: false,
  currentPage: 1,
  itemsPerPage: 20,
  pagesCount: 0,
  collectionURI: "",
  itemsAvailable: 0,
  items: []
};

export {
  charactersSectionInitialState,
  comicsSectionInitialState,
  creatorsSectionInitialState,
  eventsSectionInitialState,
  seriesSectionInitialState,
  storiesSectionInitialState
};
