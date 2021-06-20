import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useRootStore } from "../../stores";
import {
  LoadingLogo,
  ErrorBlock,
  CharactersSection,
  CreatorsSection,
  ComicsSection,
  SeriesSection,
  StoriesSection
} from "../shared";

export const EventDetails = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { eventDetailsDataStore } = useRootStore();

  useEffect(() => {
    eventDetailsDataStore.setEvent(id);
    return () => {
      eventDetailsDataStore.resetEventData();
    };
  }, [eventDetailsDataStore, id]);

  return (
    <>
      {eventDetailsDataStore.loading ? (
        <LoadingLogo />
      ) : eventDetailsDataStore.error ? (
        <ErrorBlock />
      ) : (
        <div className="details">
          <div className="container">
            <div className="details-body">
              <div className="details-image-wrapper">
                {eventDetailsDataStore.eventData.thumbnail ? (
                  <img
                    src={`${eventDetailsDataStore.eventData.thumbnail.path}/portrait_uncanny.${eventDetailsDataStore.eventData.thumbnail.extension}`}
                    alt="event"
                  />
                ) : null}
              </div>
              <div className="details-text-wrapper">
                <div className="details-main-info">
                  <div className="details-main-info__name">{eventDetailsDataStore.eventData.title}</div>
                  <div className="details-main-info__description">{eventDetailsDataStore.eventData.description}</div>
                </div>
                {eventDetailsDataStore.eventData.charactersAvailable > 0 ? (
                  <CharactersSection
                    loading={eventDetailsDataStore.eventCharactersData.loading}
                    error={eventDetailsDataStore.eventCharactersData.error}
                    listItems={eventDetailsDataStore.eventCharactersData.items}
                    paginationPagesCount={eventDetailsDataStore.eventCharactersData.pagesCount}
                    paginationCurrentPage={eventDetailsDataStore.eventCharactersData.currentPage}
                    paginationOnPageChange={eventDetailsDataStore.changeCharactersSectionPage}
                  />
                ) : null}
                {eventDetailsDataStore.eventData.creatorsAvailable > 0 ? (
                  <CreatorsSection
                    loading={eventDetailsDataStore.eventCreatorsData.loading}
                    error={eventDetailsDataStore.eventCreatorsData.error}
                    listItems={eventDetailsDataStore.eventCreatorsData.items}
                    paginationPagesCount={eventDetailsDataStore.eventCreatorsData.pagesCount}
                    paginationCurrentPage={eventDetailsDataStore.eventCreatorsData.currentPage}
                    paginationOnPageChange={eventDetailsDataStore.changeCreatorsSectionPage}
                  />
                ) : null}
                {eventDetailsDataStore.eventData.comicsAvailable > 0 ? (
                  <ComicsSection
                    loading={eventDetailsDataStore.eventComicsData.loading}
                    error={eventDetailsDataStore.eventComicsData.error}
                    listItems={eventDetailsDataStore.eventComicsData.items}
                    paginationPagesCount={eventDetailsDataStore.eventComicsData.pagesCount}
                    paginationCurrentPage={eventDetailsDataStore.eventComicsData.currentPage}
                    paginationOnPageChange={eventDetailsDataStore.changeComicsSectionPage}
                  />
                ) : null}
                {eventDetailsDataStore.eventData.seriesAvailable > 0 ? (
                  <SeriesSection
                    loading={eventDetailsDataStore.eventSeriesData.loading}
                    error={eventDetailsDataStore.eventSeriesData.error}
                    listItems={eventDetailsDataStore.eventSeriesData.items}
                    paginationPagesCount={eventDetailsDataStore.eventSeriesData.pagesCount}
                    paginationCurrentPage={eventDetailsDataStore.eventSeriesData.currentPage}
                    paginationOnPageChange={eventDetailsDataStore.changeSeriesSectionPage}
                  />
                ) : null}
                {eventDetailsDataStore.eventData.storiesAvailable > 0 ? (
                  <StoriesSection
                    loading={eventDetailsDataStore.eventStoriesData.loading}
                    error={eventDetailsDataStore.eventStoriesData.error}
                    listItems={eventDetailsDataStore.eventStoriesData.items}
                    paginationPagesCount={eventDetailsDataStore.eventStoriesData.pagesCount}
                    paginationCurrentPage={eventDetailsDataStore.eventStoriesData.currentPage}
                    paginationOnPageChange={eventDetailsDataStore.changeStoriesSectionPage}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
