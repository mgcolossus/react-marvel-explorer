import { makeAutoObservable, runInAction } from "mobx";
import { SeriesCard } from "../../types";

class SeriesPageDataStore {
  loading = true;
  error = false;
  seriesData: SeriesCard[] = [];
  currentPage = 1;
  itemsPerPage = 15;

  pagesCount = 1;

  constructor() {
    makeAutoObservable(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.loadSeriesData();
  }

  async loadSeriesData() {
    const limit = this.itemsPerPage;
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/series?limit=${limit}&offset=${offset}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.seriesData = jsonData.data.results.map((seriesData: SeriesCard) => ({
          id: seriesData.id,
          title: seriesData.title,
          thumbnail: seriesData.thumbnail
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
    this.loadSeriesData();
  }
}

export { SeriesPageDataStore };
