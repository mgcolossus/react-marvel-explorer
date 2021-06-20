import { makeAutoObservable, runInAction } from "mobx";
import { StoryCard } from "../../types";

class StoriesPageDataStore {
  loading = true;
  error = false;
  storiesData: StoryCard[] = [];
  currentPage = 1;
  itemsPerPage = 15;
  pagesCount = 1;

  constructor() {
    makeAutoObservable(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.loadStoriesData();
  }

  async loadStoriesData() {
    const limit = this.itemsPerPage;
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/stories?limit=${limit}&offset=${offset}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.storiesData = jsonData.data.results.map((storyData: StoryCard) => ({
          id: storyData.id,
          title: storyData.title
        }));
        this.pagesCount = Math.ceil(jsonData.data.total / this.itemsPerPage);
        this.loading = false;
      });
    } catch (error) {
      this.error = true;
      this.loading = false;
      console.error(error);
    }
  }

  setCurrentPage(newPageNumber: number) {
    this.currentPage = newPageNumber;
    this.loadStoriesData();
  }
}

export { StoriesPageDataStore };
