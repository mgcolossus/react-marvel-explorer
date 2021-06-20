import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LoadingLogo, ErrorBlock, ComicsSection, EventsSection, SeriesSection, StoriesSection } from "../shared";
import { useRootStore } from "../../stores";

export const CharacterDetails = observer(() => {
  const { characterDetailsDataStore } = useRootStore();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    characterDetailsDataStore.setCharacter(id);

    return () => {
      characterDetailsDataStore.resetCharacterData();
    };
  }, [characterDetailsDataStore, id]);

  return (
    <>
      {characterDetailsDataStore.loading ? (
        <LoadingLogo />
      ) : characterDetailsDataStore.error ? (
        <ErrorBlock />
      ) : (
        <div className="details">
          <div className="container">
            <div className="details-body">
              <div className="details-image-wrapper">
                {characterDetailsDataStore.characterData.thumbnail ? (
                  <img
                    src={`${characterDetailsDataStore.characterData.thumbnail.path}/portrait_uncanny.${characterDetailsDataStore.characterData.thumbnail.extension}`}
                    alt="character"
                  />
                ) : null}
              </div>
              <div className="details-text-wrapper">
                <div className="details-main-info">
                  <div className="details-main-info__name">{characterDetailsDataStore.characterData.name}</div>
                  <div className="details-main-info__description">
                    {characterDetailsDataStore.characterData.description}
                  </div>
                </div>
                {characterDetailsDataStore.characterData.comicsAvailable > 0 ? (
                  <ComicsSection
                    loading={characterDetailsDataStore.characterComicsData.loading}
                    error={characterDetailsDataStore.characterComicsData.error}
                    listItems={characterDetailsDataStore.characterComicsData.items}
                    paginationPagesCount={characterDetailsDataStore.characterComicsData.pagesCount}
                    paginationCurrentPage={characterDetailsDataStore.characterComicsData.currentPage}
                    paginationOnPageChange={characterDetailsDataStore.changeComicsSectionPage}
                  />
                ) : null}
                {characterDetailsDataStore.characterData.eventsAvailable > 0 ? (
                  <EventsSection
                    loading={characterDetailsDataStore.characterEventsData.loading}
                    error={characterDetailsDataStore.characterEventsData.error}
                    listItems={characterDetailsDataStore.characterEventsData.items}
                    paginationPagesCount={characterDetailsDataStore.characterEventsData.pagesCount}
                    paginationCurrentPage={characterDetailsDataStore.characterEventsData.currentPage}
                    paginationOnPageChange={characterDetailsDataStore.changeEventsSectionPage}
                  />
                ) : null}
                {characterDetailsDataStore.characterData.seriesAvailable > 0 ? (
                  <SeriesSection
                    loading={characterDetailsDataStore.characterSeriesData.loading}
                    error={characterDetailsDataStore.characterSeriesData.error}
                    listItems={characterDetailsDataStore.characterSeriesData.items}
                    paginationPagesCount={characterDetailsDataStore.characterSeriesData.pagesCount}
                    paginationCurrentPage={characterDetailsDataStore.characterSeriesData.currentPage}
                    paginationOnPageChange={characterDetailsDataStore.changeSeriesSectionPage}
                  />
                ) : null}
                {characterDetailsDataStore.characterData.storiesAvailable > 0 ? (
                  <StoriesSection
                    loading={characterDetailsDataStore.characterStoriesData.loading}
                    error={characterDetailsDataStore.characterStoriesData.error}
                    listItems={characterDetailsDataStore.characterStoriesData.items}
                    paginationPagesCount={characterDetailsDataStore.characterStoriesData.pagesCount}
                    paginationCurrentPage={characterDetailsDataStore.characterStoriesData.currentPage}
                    paginationOnPageChange={characterDetailsDataStore.changeStoriesSectionPage}
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
