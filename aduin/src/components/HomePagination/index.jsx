import React from "react";

import ReactPaginate from "react-paginate";

const HomePagination = ({ handlePageClick, pageCount, limit, initialPage }) => {
  const hoverClassname = "hover:bg-primary hover:text-white-A700_01";

  const pageNumClassName = `font-poppins font-normal min-w-[40px] min-h-[40px] flex justify-center items-center border-t border-r border-b border-[#CBD5E0] text-sm bg-white-A700_01
  font-poppins font-normal min-w-[40px] min-h-[40px] flex justify-center items-center border-t border-r border-b border-[#CBD5E0] text-sm bg-white-A700_01 text-primary ${hoverClassname}`;

  const prevClassName = `font-poppins font-normal min-w-[50px] min-h-[40px] flex justify-center items-center border border-[#CBD5E0] text-sm rounded-l-[4px] bg-white-A700_01 text-primary ${hoverClassname}`;

  const nextClassname = `font-poppins font-normal min-w-[50px] min-h-[40px] flex justify-center items-center border-t border-r border-b border-[#CBD5E0] text-sm  rounded-r-[4px] bg-white-A700_01 text-primary ${hoverClassname}`;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={limit}
      pageCount={pageCount}
      previousLabel="Prev"
      renderOnZeroPageCount={null}
      pageLinkClassName={pageNumClassName}
      previousLinkClassName={prevClassName}
      nextLinkClassName={nextClassname}
      breakLinkClassName={pageNumClassName}
      initialPage={initialPage}
      forcePage={initialPage}
      containerClassName="flex w-full items-center justify-center"
      activeClassName="[&>a]:text-white-A700_01 [&>a]:bg-primary"
    />
  );
};

export default HomePagination;
