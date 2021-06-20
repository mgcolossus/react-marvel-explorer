import { makeAutoObservable, runInAction } from "mobx";
import { CreatorCard } from "../../types";

class CreatorsPageDataStore {
  loading = true;
  error = false;
  creatorsData: CreatorCard[] = [];
  currentPage = 1;
  itemsPerPage = 15;
  pagesCount = 1;

  constructor() {
    makeAutoObservable(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.loadCreatorsData();
  }

  async loadCreatorsData() {
    const limit = this.itemsPerPage;
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/creators?limit=${limit}&offset=${offset}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.creatorsData = jsonData.data.results.map((creatorData: CreatorCard) => ({
          id: creatorData.id,
          fullName: creatorData.fullName,
          thumbnail: creatorData.thumbnail
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
    this.loadCreatorsData();
  }
}

export { CreatorsPageDataStore };
