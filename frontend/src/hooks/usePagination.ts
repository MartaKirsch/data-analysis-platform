import { useEffect, useMemo, useState } from "react";

type UsePaginationDeps<T> = {
  pageSize?: number;
  items: T[];
};

export const usePagination = <T>({
  pageSize = 10,
  items,
}: UsePaginationDeps<T>) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState<T[]>([]);

  useEffect(() => {
    setCurrentPage(
      items.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
    );
  }, [items, pageNumber, pageSize]);

  const goNextPage = () => {
    const newPageNumber = pageNumber + 1;
    setPageNumber(newPageNumber);
  };

  const goPrevPage = () => {
    const newPageNumber = pageNumber - 1;
    setPageNumber(newPageNumber);
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
