import { useMemo, useState } from "react";

type UsePaginationDeps<T> = {
  pageSize?: number;
  items: T[];
};

export const usePagination = <T>({
  pageSize = 10,
  items,
}: UsePaginationDeps<T>) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(
    items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  );

  const goNextPage = () => {
    const newPageNumber = pageNumber + 1;
    setPageNumber(newPageNumber);

    const newPage = items.slice(
      (newPageNumber - 1) * pageSize,
      newPageNumber * pageSize
    );
    setCurrentPage(newPage);
  };

  const goPrevPage = () => {
    const newPageNumber = pageNumber - 1;
    setPageNumber(newPageNumber);

    const newPage = items.slice(
      (newPageNumber - 1) * pageSize,
      newPageNumber * pageSize
    );
    setCurrentPage(newPage);
  };

  const canGoPrevPage = useMemo(() => pageNumber > 1, [pageNumber]);

  const canGoNextPage = useMemo(
    () => items.length > pageNumber * pageSize,
    [pageNumber, pageSize, items]
  );

  return {
    canGoPrevPage,
    goPrevPage,
    canGoNextPage,
    goNextPage,
    pageNumber,
    currentPage,
  };
};
