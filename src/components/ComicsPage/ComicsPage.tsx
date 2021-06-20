import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../stores";
import {
  LoadingLogo, ErrorBlock, PageCardLink, Page
} from "../shared";

export const ComicsPage = observer(() => {
  const { comicsPageDataStore } = useRootStore();

  const comicsPageCardLinks = comicsPageDataStore.comicsData.length > 0
    ? comicsPageDataStore.comicsData.map((comicData) => (
      <PageCardLink
        key={comicData.id}
        to={`/comics/${comicData.id}`}
        thumbnail={{ ...comicData.thumbnail }}
        text={comicData.title}
      />
    ))
    : null;

  return (
    <>
      {comicsPageDataStore.loading ? (
        <LoadingLogo />
      ) : comicsPageDataStore.error ? (
        <ErrorBlock />
      ) : (
        <Page
          pageTitle="Comics"
          pageCardLinks={comicsPageCardLinks}
          paginationPagesCount={comicsPageDataStore.pagesCount}
          paginationCurrentPage={comicsPageDataStore.currentPage}
          paginationOnPageChange={comicsPageDataStore.setCurrentPage}
        />
      )}
    </>
  );
});
