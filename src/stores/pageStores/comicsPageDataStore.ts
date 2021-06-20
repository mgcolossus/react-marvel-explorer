import { makeAutoObservable, runInAction } from "mobx";
import { ComicCard } from "../../types";

class ComicsPageDataStore {
  loading = true;

  error = false;

  comicsData: ComicCard[] = [];

  currentPage = 1;

  itemsPerPage = 15;

  pagesCount = 1;

  constructor() {
    makeAutoObservable(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.loadComicsData();
  }

  async loadComicsData() {
    const limit = this.itemsPerPage;
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/comics?limit=${limit}&offset=${offset}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.comicsData = jsonData.data.results.map((comicData: ComicCard) => ({
          id: comicData.id,
          title: comicData.title,
          thumbnail: comicData.thumbnail
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
    this.loadComicsData();
  }
}

export { ComicsPageDataStore };
