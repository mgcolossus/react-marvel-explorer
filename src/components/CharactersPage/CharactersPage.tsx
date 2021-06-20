import { observer } from "mobx-react-lite";
import { useRootStore } from "../../stores";
import {
  LoadingLogo, ErrorBlock, PageCardLink, Page
} from "../shared";

export const CharactersPage = observer(() => {
  const { charactersPageDataStore } = useRootStore();

  const charactersPageCardLinks = charactersPageDataStore.charactersData.length > 0
    ? charactersPageDataStore.charactersData.map((characterData) => (
      <PageCardLink
        key={characterData.id}
        to={`/characters/${characterData.id}`}
        thumbnail={{ ...characterData.thumbnail }}
        text={characterData.name}
      />
    ))
    : null;

  return (
    <>
      {charactersPageDataStore.loading ? (
        <LoadingLogo />
      ) : charactersPageDataStore.error ? (
        <ErrorBlock />
      ) : (
        <Page
          pageTitle="Characters"
          pageCardLinks={charactersPageCardLinks}
          paginationPagesCount={charactersPageDataStore.pagesCount}
          paginationCurrentPage={charactersPageDataStore.currentPage}
          paginationOnPageChange={charactersPageDataStore.setCurrentPage}
        />
      )}
    </>
  );
});
