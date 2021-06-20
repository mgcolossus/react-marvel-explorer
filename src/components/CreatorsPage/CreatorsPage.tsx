import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../stores";
import {
  LoadingLogo, ErrorBlock, PageCardLink, Page
} from "../shared";

export const CreatorsPage = observer(() => {
  const { creatorsPageDataStore } = useRootStore();

  const creatorsPageCardLinks = creatorsPageDataStore.creatorsData.length > 0
    ? creatorsPageDataStore.creatorsData.map((creatorData) => (
      <PageCardLink
        key={creatorData.id}
        to={`/creators/${creatorData.id}`}
        thumbnail={{ ...creatorData.thumbnail }}
        text={creatorData.fullName}
      />
    ))
    : null;
  return (
    <>
      {creatorsPageDataStore.loading ? (
        <LoadingLogo />
      ) : creatorsPageDataStore.error ? (
        <ErrorBlock />
      ) : (
        <Page
          pageTitle="Creators"
          pageCardLinks={creatorsPageCardLinks}
          paginationPagesCount={creatorsPageDataStore.pagesCount}
          paginationCurrentPage={creatorsPageDataStore.currentPage}
          paginationOnPageChange={creatorsPageDataStore.setCurrentPage}
        />
      )}
    </>
  );
});
