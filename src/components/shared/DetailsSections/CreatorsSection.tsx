import { Link } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import { SectionLoading } from "../SectionLoading/SectionLoading";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";
import { CreatorLinkItem } from "../../../types";

interface CreatorsSectionProps {
  loading: boolean;
  error: boolean;
  listItems: CreatorLinkItem[];
  paginationPagesCount: number;
  paginationCurrentPage: number;
  paginationOnPageChange(newPage: number): void;
}

export const CreatorsSection = ({
  loading,
  error,
  listItems,
  paginationPagesCount,
  paginationCurrentPage,
  paginationOnPageChange
}: CreatorsSectionProps) => (
  <div className="details-section">
    <div className="details-section__title">Creators</div>
    {loading ? (
      <SectionLoading />
    ) : error ? (
      <ErrorBlock />
    ) : listItems.length > 0 ? (
      <>
        <div className="details-section__list">
          {listItems.map((creatorData) => (
            <Link to={`/creators/${creatorData.id}`} key={creatorData.id} className="details-section__list-item">
              {creatorData.fullName}
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
