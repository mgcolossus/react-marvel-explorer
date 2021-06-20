import { Link } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import { SectionLoading } from "../SectionLoading/SectionLoading";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";
import { ComicLinkItem } from "../../../types";

interface ComicsSectionProps {
  loading: boolean;
  error: boolean;
  listItems: ComicLinkItem[];
  paginationPagesCount: number;
  paginationCurrentPage: number;
  paginationOnPageChange(newPage: number): void;
}

export const ComicsSection = ({
  loading,
  error,
  listItems,
  paginationPagesCount,
  paginationCurrentPage,
  paginationOnPageChange
}: ComicsSectionProps) => (
  <div className="details-section">
    <div className="details-section__title">Comics</div>
    {loading ? (
      <SectionLoading />
    ) : error ? (
      <ErrorBlock />
    ) : listItems.length > 0 ? (
      <>
        <div className="details-section__list">
          {listItems.map((comicData) => (
            <Link to={`/comics/${comicData.id}`} key={comicData.id} className="details-section__list-item">
              {comicData.title}
            </Link>
          ))}
        </div>
        {paginationPagesCount >= 2 ? (
          <div className="details-section__pagination">
            <Pagination
              pagesCount={paginationPagesCount}
              currentPage={paginationCurrentPage}
              onPageChange={paginationOnPageChange}
            />
          </div>
        ) : null}
      </>
    ) : null}
  </div>
);
