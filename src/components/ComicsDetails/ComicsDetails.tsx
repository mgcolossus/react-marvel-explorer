import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../stores";
import {
  LoadingLogo, ErrorBlock, CharactersSection, CreatorsSection, EventsSection, StoriesSection
} from "../shared";

export const ComicsDetails = observer(() => {
  const { comicDetailsDataStore } = useRootStore();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    comicDetailsDataStore.setComic(id);
    return () => {
      comicDetailsDataStore.resetComicData();
    };
  }, [comicDetailsDataStore, id]);

  return (
    <>
      {comicDetailsDataStore.loading ? (
        <LoadingLogo />
      ) : comicDetailsDataStore.error ? (
        <ErrorBlock />
      ) : (
        <div className="details">
          <div className="container">
            <div className="details-body">
              <div className="details-image-wrapper">
                {comicDetailsDataStore.comicData.thumbnail ? (
                  <img
                    src={`${comicDetailsDataStore.comicData.thumbnail.path}/portrait_uncanny.${comicDetailsDataStore.comicData.thumbnail.extension}`}
                    alt="comic"
                  />
                ) : null}
              </div>
              <div className="details-text-wrapper">
                <div className="details-main-info">
                  <div className="details-main-info__name">{comicDetailsDataStore.comicData.title}</div>
                  <div className="details-main-info__description">{comicDetailsDataStore.comicData.description}</div>
                </div>
                {comicDetailsDataStore.comicData.charactersAvailable > 0 ? (
                  <CharactersSection
                    loading={comicDetailsDataStore.comicCharactersData.loading}
                    error={comicDetailsDataStore.comicCharactersData.error}
                    listItems={comicDetailsDataStore.comicCharactersData.items}
                    paginationPagesCount={comicDetailsDataStore.comicCharactersData.pagesCount}
                    paginationCurrentPage={comicDetailsDataStore.comicCharactersData.currentPage}
                    paginationOnPageChange={comicDetailsDataStore.changeCharactersSectionPage}
                  />
                ) : null}
                {comicDetailsDataStore.comicData.creatorsAvailable > 0 ? (
                  <CreatorsSection
                    loading={comicDetailsDataStore.comicCreatorsData.loading}
                    error={comicDetailsDataStore.comicCreatorsData.error}
                    listItems={comicDetailsDataStore.comicCreatorsData.items}
                    paginationPagesCount={comicDetailsDataStore.comicCreatorsData.pagesCount}
                    paginationCurrentPage={comicDetailsDataStore.comicCreatorsData.currentPage}
                    paginationOnPageChange={comicDetailsDataStore.changeCreatorsSectionPage}
                  />
                ) : null}
                {comicDetailsDataStore.comicData.eventsAvailable > 0 ? (
                  <EventsSection
                    loading={comicDetailsDataStore.comicEventsData.loading}
                    error={comicDetailsDataStore.comicEventsData.error}
                    listItems={comicDetailsDataStore.comicEventsData.items}
                    paginationPagesCount={comicDetailsDataStore.comicEventsData.pagesCount}
                    paginationCurrentPage={comicDetailsDataStore.comicEventsData.currentPage}
                    paginationOnPageChange={comicDetailsDataStore.changeEventsSectionPage}
                  />
                ) : null}
                {comicDetailsDataStore.comicSeriesData.name ? (
                  <div className="details-section">
                    <div className="details-section__title">Series</div>
                    <div className="details-section__list">
                      <Link
                        to={`/series/${comicDetailsDataStore.comicSeriesData.id}`}
                        className="details-section__list-item"
                      >
                        {comicDetailsDataStore.comicSeriesData.name}
                      </Link>
                    </div>
                  </div>
                ) : null}
                {comicDetailsDataStore.comicData.storiesAvailable > 0 ? (
                  <StoriesSection
                    loading={comicDetailsDataStore.comicStoriesData.loading}
                    error={comicDetailsDataStore.comicStoriesData.error}
                    listItems={comicDetailsDataStore.comicStoriesData.items}
                    paginationPagesCount={comicDetailsDataStore.comicStoriesData.pagesCount}
                    paginationCurrentPage={comicDetailsDataStore.comicStoriesData.currentPage}
                    paginationOnPageChange={comicDetailsDataStore.changeStoriesSectionPage}
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
