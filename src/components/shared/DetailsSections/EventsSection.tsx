import { Link } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import { SectionLoading } from "../SectionLoading/SectionLoading";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";
import { EventLinkItem } from "../../../types";

interface EventsSectionProps {
  loading: boolean;
  error: boolean;
  listItems: EventLinkItem[];
  paginationPagesCount: number;
  paginationCurrentPage: number;
  paginationOnPageChange(newPage: number): void;
}

export const EventsSection = ({
  loading,
  error,
  listItems,
  paginationPagesCount,
  paginationCurrentPage,
  paginationOnPageChange
}: EventsSectionProps) => (
  <div className="details-section">
    <div className="details-section__title">Events</div>
    {loading ? (
      <SectionLoading />
    ) : error ? (
      <ErrorBlock />
    ) : listItems.length > 0 ? (
      <>
        <div className="details-section__list">
          {listItems.map((eventData) => (
            <Link to={`/events/${eventData.id}`} key={eventData.id} className="details-section__list-item">
              {eventData.title}
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
