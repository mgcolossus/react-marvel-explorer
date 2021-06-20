import { Link } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
import { SectionLoading } from "../SectionLoading/SectionLoading";
import { ErrorBlock } from "../ErrorBlock/ErrorBlock";
import { CharacterLinkItem } from "../../../types";

interface CharactersSectionProps {
  loading: boolean;
  error: boolean;
  listItems: CharacterLinkItem[];
  paginationPagesCount: number;
  paginationCurrentPage: number;
  paginationOnPageChange(newPage: number): void;
}

export const CharactersSection = ({
  loading,
  error,
  listItems,
  paginationPagesCount,
  paginationCurrentPage,
  paginationOnPageChange
}: CharactersSectionProps) => (
  <div className="details-section">
    <div className="details-section__title">Characters</div>
    {loading ? (
      <SectionLoading />
    ) : error ? (
      <ErrorBlock />
    ) : listItems.length > 0 ? (
      <>
        <div className="details-section__list">
          {listItems.map((characterData) => (
            <Link to={`/characters/${characterData.id}`} key={characterData.id} className="details-section__list-item">
              {characterData.name}
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
