import { useEffect } from "react";
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
  SeriesSection
} from "../shared";

export const StoryDetails = observer(() => {
  const { id } = useParams<{ id: string }>();
  const { storyDetailsDataStore } = useRootStore();

  useEffect(() => {
    storyDetailsDataStore.setStory(id);

    return () => {
      storyDetailsDataStore.resetStoryData();
    };
  }, [storyDetailsDataStore, id]);

  return (
    <>
      {storyDetailsDataStore.loading ? (
        <LoadingLogo />
      ) : storyDetailsDataStore.error ? (
        <ErrorBlock />
      ) : (
        <div className="details">
          <div className="container">
            <div className="details-body">
              <div className="details-text-wrapper">
                <div className="details-main-info">
                  <div className="details-main-info__name">{storyDetailsDataStore.storyData.title}</div>
                  <div className="details-main-info__description">{storyDetailsDataStore.storyData.description}</div>
                </div>
                {storyDetailsDataStore.storyData.charactersAvailable > 0 ? (
                  <CharactersSection
                    loading={storyDetailsDataStore.storyCharactersData.loading}
                    error={storyDetailsDataStore.storyCharactersData.error}
                    listItems={storyDetailsDataStore.storyCharactersData.items}
                    paginationPagesCount={storyDetailsDataStore.storyCharactersData.pagesCount}
                    paginationCurrentPage={storyDetailsDataStore.storyCharactersData.currentPage}
                    paginationOnPageChange={storyDetailsDataStore.changeCharactersSectionPage}
                  />
                ) : null}
                {storyDetailsDataStore.storyData.comicsAvailable > 0 ? (
                  <ComicsSection
                    loading={storyDetailsDataStore.storyComicsData.loading}
                    error={storyDetailsDataStore.storyComicsData.error}
                    listItems={storyDetailsDataStore.storyComicsData.items}
                    paginationPagesCount={storyDetailsDataStore.storyComicsData.pagesCount}
                    paginationCurrentPage={storyDetailsDataStore.storyComicsData.currentPage}
                    paginationOnPageChange={storyDetailsDataStore.changeComicsSectionPage}
                  />
                ) : null}
                {storyDetailsDataStore.storyData.creatorsAvailable > 0 ? (
                  <CreatorsSection
                    loading={storyDetailsDataStore.storyCreatorsData.loading}
                    error={storyDetailsDataStore.storyCreatorsData.error}
                    listItems={storyDetailsDataStore.storyCreatorsData.items}
                    paginationPagesCount={storyDetailsDataStore.storyCreatorsData.pagesCount}
                    paginationCurrentPage={storyDetailsDataStore.storyCreatorsData.currentPage}
                    paginationOnPageChange={storyDetailsDataStore.changeCreatorsSectionPage}
                  />
                ) : null}
                {storyDetailsDataStore.storyData.eventsAvailable > 0 ? (
                  <EventsSection
                    loading={storyDetailsDataStore.storyEventsData.loading}
                    error={storyDetailsDataStore.storyEventsData.error}
                    listItems={storyDetailsDataStore.storyEventsData.items}
                    paginationPagesCount={storyDetailsDataStore.storyEventsData.pagesCount}
                    paginationCurrentPage={storyDetailsDataStore.storyEventsData.currentPage}
                    paginationOnPageChange={storyDetailsDataStore.changeEventsSectionPage}
                  />
                ) : null}
                {storyDetailsDataStore.storyData.seriesAvailable > 0 ? (
                  <SeriesSection
                    loading={storyDetailsDataStore.storySeriesData.loading}
                    error={storyDetailsDataStore.storySeriesData.error}
                    listItems={storyDetailsDataStore.storySeriesData.items}
                    paginationPagesCount={storyDetailsDataStore.storySeriesData.pagesCount}
                    paginationCurrentPage={storyDetailsDataStore.storySeriesData.currentPage}
                    paginationOnPageChange={storyDetailsDataStore.changeSeriesSectionPage}
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
