import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../stores";
import { LoadingLogo, ErrorBlock, PageCardLink, Page } from "../shared";

export const SeriesPage = observer(() => {
  const { seriesPageDataStore } = useRootStore();

  const seriesPageCardLinks = seriesPageDataStore.seriesData.length > 0
    ? seriesPageDataStore.seriesData.map((seriesData) => (
      <PageCardLink
        key={seriesData.id}
        to={`/series/${seriesData.id}`}
        thumbnail={{ ...seriesData.thumbnail }}
        text={seriesData.title}
      />
    ))
    : null;
  return (
    <>
      {seriesPageDataStore.loading ? (
        <LoadingLogo />
      ) : seriesPageDataStore.error ? (
        <ErrorBlock />
      ) : (
        <Page
          pageTitle="Series"
          pageCardLinks={seriesPageCardLinks}
          paginationPagesCount={seriesPageDataStore.pagesCount}
          paginationCurrentPage={seriesPageDataStore.currentPage}
          paginationOnPageChange={seriesPageDataStore.setCurrentPage}
        />
      )}
    </>
  );
});
