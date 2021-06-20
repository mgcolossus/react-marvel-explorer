import { Link } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import { SectionLoading } from "../SectionLoading/SectionLoading";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";
import { SeriesLinkItem } from "../../../types";

interface SeriesSectionProps {
  loading: boolean;
  error: boolean;
  listItems: SeriesLinkItem[];
  paginationPagesCount: number;
  paginationCurrentPage: number;
  paginationOnPageChange(newPage: number): void;
}

export const SeriesSection = ({
  loading,
  error,
  listItems,
  paginationPagesCount,
  paginationCurrentPage,
  paginationOnPageChange
}: SeriesSectionProps) => (
  <div className="details-section">
    <div className="details-section__title">Series</div>
    {loading ? (
      <SectionLoading />
    ) : error ? (
      <ErrorBlock />
    ) : listItems.length > 0 ? (
      <>
        <div className="details-section__list">
          {listItems.map((seriesData) => (
            <Link to={`/series/${seriesData.id}`} key={seriesData.id} className="details-section__list-item">
              {seriesData.title}
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
