import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useRootStore } from "../../stores";
import { LoadingLogo, ErrorBlock, Pagination } from "../shared";

export const StoriesPage = observer(() => {
  const { storiesPageDataStore } = useRootStore();
  return (
    <>
      {storiesPageDataStore.loading ? (
        <LoadingLogo />
      ) : storiesPageDataStore.error ? (
        <ErrorBlock />
      ) : (
        <section className="stories-page">
          <div className="container">
            <div className="stories-page-title">Stories</div>
            <div className="stories-card-links">
              {storiesPageDataStore.storiesData.length > 0 ? (
                <>
                  {storiesPageDataStore.storiesData.map((storyData) => (
                    <Link className="story-link" key={storyData.id} to={`stories/${storyData.id}`}>
                      <div className="story-link__footer">
                        <div className="story-link__footer-text">{storyData.title}</div>
                      </div>
                    </Link>
                  ))}
                </>
              ) : null}
            </div>
            <Pagination
              pagesCount={storiesPageDataStore.pagesCount}
              currentPage={storiesPageDataStore.currentPage}
              onPageChange={storiesPageDataStore.setCurrentPage}
            />
          </div>
        </section>
      )}
    </>
  );
});
