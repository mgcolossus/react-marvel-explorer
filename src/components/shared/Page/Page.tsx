import React from "react";
import { Pagination } from "../Pagination/Pagination";

interface PageProps {
  pageCardLinks: JSX.Element[] | null;
  paginationPagesCount: number;
  paginationCurrentPage: number;
  pageTitle: string,
  paginationOnPageChange(newPage: number): void;
}

export const Page = ({
  pageCardLinks, paginationPagesCount, paginationCurrentPage, paginationOnPageChange, pageTitle
}: PageProps) => (
  <section className="page">
    <div className="container">
      <div className="page-title">{pageTitle}</div>
      <div className="page-body">{pageCardLinks}</div>
      <Pagination
        pagesCount={paginationPagesCount}
        currentPage={paginationCurrentPage}
        onPageChange={paginationOnPageChange}
      />
    </div>
  </section>
);
