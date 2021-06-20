import React from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../stores";
import {
  LoadingLogo, ErrorBlock, PageCardLink, Page
} from "../shared";

export const EventsPage = observer(() => {
  const { eventsPageDataStore } = useRootStore();

  const eventsPageCardLinks = eventsPageDataStore.eventsData.length > 0
    ? eventsPageDataStore.eventsData.map((eventData) => (
      <PageCardLink
        key={eventData.id}
        to={`/events/${eventData.id}`}
        thumbnail={{ ...eventData.thumbnail }}
        text={eventData.title}
      />
    ))
    : null;
  return (
    <>
      {eventsPageDataStore.loading ? (
        <LoadingLogo />
      ) : eventsPageDataStore.error ? (
        <ErrorBlock />
      ) : (
        <Page
          pageTitle="Events"
          pageCardLinks={eventsPageCardLinks}
          paginationPagesCount={eventsPageDataStore.pagesCount}
          paginationCurrentPage={eventsPageDataStore.currentPage}
          paginationOnPageChange={eventsPageDataStore.setCurrentPage}
        />
      )}
    </>
  );
});
