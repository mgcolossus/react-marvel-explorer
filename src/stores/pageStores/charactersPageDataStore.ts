import { makeAutoObservable, runInAction } from "mobx";
import { CharacterCard } from "../../types";

class CharactersPageDataStore {
  loading = true;
  error = false;
  charactersData: CharacterCard[] = [];
  currentPage = 1;
  itemsPerPage = 15;
  pagesCount = 1;

  constructor() {
    makeAutoObservable(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.loadCharactersData();
  }

  async loadCharactersData() {
    const limit = this.itemsPerPage;
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    try {
      this.loading = true;
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&apikey=0371a0f228ec1edcadf75f4c703ff2cd`
      );
      const jsonData = await response.json();
      runInAction(() => {
        this.charactersData = jsonData.data.results.map((characterData: CharacterCard) => ({
          id: characterData.id,
          name: characterData.name,
          thumbnail: characterData.thumbnail
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
    this.loadCharactersData();
  }
}

export { CharactersPageDataStore };
