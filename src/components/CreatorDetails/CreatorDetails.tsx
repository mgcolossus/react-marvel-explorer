import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useRootStore } from "../../stores";
import {
  LoadingLogo, ErrorBlock, ComicsSection, EventsSection, SeriesSection, StoriesSection
} from "../shared";

export const CreatorDetails = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { creatorDetailsDataStore } = useRootStore();

  useEffect(() => {
    creatorDetailsDataStore.setCreator(id);

    return () => {
      creatorDetailsDataStore.resetCreatorData();
    };
  }, [creatorDetailsDataStore, id]);

  return (
    <>
      {creatorDetailsDataStore.loading ? (
        <LoadingLogo />
      ) : creatorDetailsDataStore.error ? (
        <ErrorBlock />
      ) : (
        <div className="details">
          <div className="container">
            <div className="details-body">
              <div className="details-image-wrapper">
                {creatorDetailsDataStore.creatorData.thumbnail ? (
                  <img
                    src={`${creatorDetailsDataStore.creatorData.thumbnail.path}/portrait_uncanny.${creatorDetailsDataStore.creatorData.thumbnail.extension}`}
                    alt="creator"
                  />
                ) : null}
              </div>
              <div className="details-text-wrapper">
                <div className="details-main-info">
                  <div className="details-main-info__name">{creatorDetailsDataStore.creatorData.fullName}</div>
                </div>
                {creatorDetailsDataStore.creatorData.comicsAvailable > 0 ? (
                  <ComicsSection
                    loading={creatorDetailsDataStore.creatorComicsData.loading}
                    error={creatorDetailsDataStore.creatorComicsData.error}
                    listItems={creatorDetailsDataStore.creatorComicsData.items}
                    paginationPagesCount={creatorDetailsDataStore.creatorComicsData.pagesCount}
                    paginationCurrentPage={creatorDetailsDataStore.creatorComicsData.currentPage}
                    paginationOnPageChange={creatorDetailsDataStore.changeComicsSectionPage}
                  />
                ) : null}
                {creatorDetailsDataStore.creatorData.eventsAvailable > 0 ? (
                  <EventsSection
                    loading={creatorDetailsDataStore.creatorEventsData.loading}
                    error={creatorDetailsDataStore.creatorEventsData.error}
                    listItems={creatorDetailsDataStore.creatorEventsData.items}
                    paginationPagesCount={creatorDetailsDataStore.creatorEventsData.pagesCount}
                    paginationCurrentPage={creatorDetailsDataStore.creatorEventsData.currentPage}
                    paginationOnPageChange={creatorDetailsDataStore.changeEventsSectionPage}
                  />
                ) : null}
                {creatorDetailsDataStore.creatorData.seriesAvailable > 0 ? (
                  <SeriesSection
                    loading={creatorDetailsDataStore.creatorSeriesData.loading}
                    error={creatorDetailsDataStore.creatorSeriesData.error}
                    listItems={creatorDetailsDataStore.creatorSeriesData.items}
                    paginationPagesCount={creatorDetailsDataStore.creatorSeriesData.pagesCount}
                    paginationCurrentPage={creatorDetailsDataStore.creatorSeriesData.currentPage}
                    paginationOnPageChange={creatorDetailsDataStore.changeSeriesSectionPage}
                  />
                ) : null}
                {creatorDetailsDataStore.creatorData.storiesAvailable > 0 ? (
                  <StoriesSection
                    loading={creatorDetailsDataStore.creatorStoriesData.loading}
                    error={creatorDetailsDataStore.creatorStoriesData.error}
                    listItems={creatorDetailsDataStore.creatorStoriesData.items}
                    paginationPagesCount={creatorDetailsDataStore.creatorStoriesData.pagesCount}
                    paginationCurrentPage={creatorDetailsDataStore.creatorStoriesData.currentPage}
                    paginationOnPageChange={creatorDetailsDataStore.changeStoriesSectionPage}
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
