import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useRootStore } from "../../stores";
import {
  LoadingLogo,
  ErrorBlock,
  CharactersSection,
  ComicsSection,
  CreatorsSection,
  EventsSection,
  StoriesSection
} from "../shared";

export const SeriesDetails = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { seriesDetailsDataStore } = useRootStore();

  useEffect(() => {
    seriesDetailsDataStore.setSeries(id);

    seriesDetailsDataStore.resetSeriesData();
  }, [seriesDetailsDataStore, id]);

  return (
    <>
      {seriesDetailsDataStore.loading ? (
        <LoadingLogo />
      ) : seriesDetailsDataStore.error ? (
        <ErrorBlock />
      ) : (
        <div className="details">
          <div className="container">
            <div className="details-body">
              <div className="details-image-wrapper">
                {seriesDetailsDataStore.seriesData.thumbnail ? (
                  <img
                    src={`${seriesDetailsDataStore.seriesData.thumbnail.path}/portrait_uncanny.${seriesDetailsDataStore.seriesData.thumbnail.extension}`}
                    alt="creator"
                  />
                ) : null}
              </div>
              <div className="details-text-wrapper">
                <div className="details-main-info">
                  <div className="details-main-info__name">{seriesDetailsDataStore.seriesData.title}</div>
                  <div className="details-main-info__description">{seriesDetailsDataStore.seriesData.description}</div>
                </div>
                {seriesDetailsDataStore.seriesData.charactersAvailable > 0 ? (
                  <CharactersSection
                    loading={seriesDetailsDataStore.seriesCharactersData.loading}
                    error={seriesDetailsDataStore.seriesCharactersData.error}
                    listItems={seriesDetailsDataStore.seriesCharactersData.items}
                    paginationPagesCount={seriesDetailsDataStore.seriesCharactersData.pagesCount}
                    paginationCurrentPage={seriesDetailsDataStore.seriesCharactersData.currentPage}
                    paginationOnPageChange={seriesDetailsDataStore.changeCharactersSectionPage}
                  />
                ) : null}
                {seriesDetailsDataStore.seriesData.comicsAvailable > 0 ? (
                  <ComicsSection
                    loading={seriesDetailsDataStore.seriesComicsData.loading}
                    error={seriesDetailsDataStore.seriesComicsData.error}
                    listItems={seriesDetailsDataStore.seriesComicsData.items}
                    paginationPagesCount={seriesDetailsDataStore.seriesComicsData.pagesCount}
                    paginationCurrentPage={seriesDetailsDataStore.seriesComicsData.currentPage}
                    paginationOnPageChange={seriesDetailsDataStore.changeComicsSectionPage}
                  />
                ) : null}
                {seriesDetailsDataStore.seriesData.creatorsAvailable > 0 ? (
                  <CreatorsSection
                    loading={seriesDetailsDataStore.seriesCreatorsData.loading}
                    error={seriesDetailsDataStore.seriesCreatorsData.error}
                    listItems={seriesDetailsDataStore.seriesCreatorsData.items}
                    paginationPagesCount={seriesDetailsDataStore.seriesCreatorsData.pagesCount}
                    paginationCurrentPage={seriesDetailsDataStore.seriesCreatorsData.currentPage}
                    paginationOnPageChange={seriesDetailsDataStore.changeCreatorsSectionPage}
                  />
                ) : null}
                {seriesDetailsDataStore.seriesData.eventsAvailable > 0 ? (
                  <EventsSection
                    loading={seriesDetailsDataStore.seriesEventsData.loading}
                    error={seriesDetailsDataStore.seriesEventsData.error}
                    listItems={seriesDetailsDataStore.seriesEventsData.items}
                    paginationPagesCount={seriesDetailsDataStore.seriesEventsData.pagesCount}
                    paginationCurrentPage={seriesDetailsDataStore.seriesEventsData.currentPage}
                    paginationOnPageChange={seriesDetailsDataStore.changeEventsSectionPage}
                  />
                ) : null}
                {seriesDetailsDataStore.seriesData.storiesAvailable > 0 ? (
                  <StoriesSection
                    loading={seriesDetailsDataStore.seriesStoriesData.loading}
                    error={seriesDetailsDataStore.seriesStoriesData.error}
                    listItems={seriesDetailsDataStore.seriesStoriesData.items}
                    paginationPagesCount={seriesDetailsDataStore.seriesStoriesData.pagesCount}
                    paginationCurrentPage={seriesDetailsDataStore.seriesStoriesData.currentPage}
                    paginationOnPageChange={seriesDetailsDataStore.changeStoriesSectionPage}
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
