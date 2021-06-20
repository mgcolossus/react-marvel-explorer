interface Thumbnail {
  path: string;
  extension: string;
}

interface CharacterLinkItem {
  id: number;
  name: string;
}

interface CreatorLinkItem {
  id: number;
  fullName: string;
}

interface ComicLinkItem {
  id: number;
  title: string;
}

interface EventLinkItem {
  id: number;
  title: string;
}

interface SeriesLinkItem {
  id: number;
  title: string;
}

interface StoryLinkItem {
  id: number;
  title: string;
}

interface CharacterCard extends CharacterLinkItem {
  thumbnail: Thumbnail;
}

interface CreatorCard extends CreatorLinkItem {
  thumbnail: Thumbnail;
}

interface ComicCard extends ComicLinkItem {
  thumbnail: Thumbnail;
}

interface EventCard extends EventLinkItem {
  thumbnail: Thumbnail;
}

interface SeriesCard extends SeriesLinkItem {
  thumbnail: Thumbnail;
}

type StoryCard = StoryLinkItem;

interface DetailsSectionBase {
  loading: boolean;
  error: boolean;
  currentPage: number;
  itemsPerPage: number;
  pagesCount: number;
  collectionURI: string;
  itemsAvailable: number;
}

interface CharactersSectionData extends DetailsSectionBase {
  items: CharacterLinkItem[];
}

interface ComicsSectionData extends DetailsSectionBase {
  items: ComicLinkItem[];
}

interface CreatorsSectionData extends DetailsSectionBase {
  items: CreatorLinkItem[];
}

interface EventsSectionData extends DetailsSectionBase {
  items: EventLinkItem[];
}

interface SeriesSectionData extends DetailsSectionBase {
  items: SeriesLinkItem[];
}

interface StoriesSectionData extends DetailsSectionBase {
  items: StoryLinkItem[];
}

interface CharacterDetailsData {
  id: null | number;
  name: string;
  description: string;
  thumbnail: null | Thumbnail;
  comicsAvailable: number;
  eventsAvailable: number;
  seriesAvailable: number;
  storiesAvailable: number;
}

interface ComicDetailsData {
  id: null | number;
  title: string;
  description: string;
  thumbnail: null | Thumbnail;
  charactersAvailable: number;
  creatorsAvailable: number;
  eventsAvailable: number;
  storiesAvailable: number;
}

interface СreatorDetailsData {
  id: null | number;
  fullName: string;
  thumbnail: null | Thumbnail;
  comicsAvailable: number;
  eventsAvailable: number;
  seriesAvailable: number;
  storiesAvailable: number;
}

interface SeriesDetailsData {
  id: null | number;
  title: string;
  description: string;
  thumbnail: null | Thumbnail;
  charactersAvailable: number;
  comicsAvailable: number;
  creatorsAvailable: number;
  eventsAvailable: number;
  storiesAvailable: number;
}

interface EventDetailsData {
  id: null | number;
  title: string;
  description: string;
  thumbnail: null | Thumbnail;
  creatorsAvailable: number;
  charactersAvailable: number;
  storiesAvailable: number;
  comicsAvailable: number;
  seriesAvailable: number;
}

interface StoryDetailsData {
  id: null | number;
  title: string;
  description: string;
  charactersAvailable: number;
  comicsAvailable: number;
  creatorsAvailable: number;
  eventsAvailable: number;
  seriesAvailable: number;
}

export type {
  CharacterLinkItem,
  CreatorLinkItem,
  ComicLinkItem,
  EventLinkItem,
  SeriesLinkItem,
  StoryLinkItem,
  Thumbnail,
  CharacterCard,
  CreatorCard,
  ComicCard,
  EventCard,
  SeriesCard,
  StoryCard,
  CharactersSectionData,
  ComicsSectionData,
  CreatorsSectionData,
  EventsSectionData,
  SeriesSectionData,
  StoriesSectionData,
  CharacterDetailsData,
  ComicDetailsData,
  СreatorDetailsData,
  EventDetailsData,
  SeriesDetailsData,
  StoryDetailsData
};
