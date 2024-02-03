import React from "react";

import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageClick, pageCount, initialPage }) => {
  const hoverClassname = "hover:bg-primary hover:text-white-A700";

  const pageNumClassName = `font-poppins font-normal min-w-[40px] min-h-[40px] flex justify-center items-center border-t border-r border-b border-[#CBD5E0] text-sm bg-white-A700
  font-poppins font-normal min-w-[40px] min-h-[40px] flex justify-center items-center border-t border-r border-b border-[#CBD5E0] text-sm bg-white-A700 text-primary ${hoverClassname}`;

  const prevClassName = `font-poppins font-normal min-w-[40px] min-h-[40px] flex justify-center items-center border border-[#CBD5E0] text-sm rounded-l-[4px] bg-white-A700 text-primary ${hoverClassname}`;

  const nextClassname = `font-poppins font-normal min-w-[40px] min-h-[40px] flex justify-center items-center border-t border-r border-b border-[#CBD5E0] text-sm  rounded-r-[4px] bg-white-A700 text-primary ${hoverClassname}`;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={0}
      marginPagesDisplayed={0}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      pageLinkClassName={pageNumClassName}
      previousLinkClassName={prevClassName}
      nextLinkClassName={nextClassname}
      breakLinkClassName={pageNumClassName}
      initialPage={initialPage}
      forcePage={initialPage}
      containerClassName="flex items-center "
      activeClassName="[&>a]:text-white-A700 [&>a]:bg-primary"
      disabledClassName="[&>a]:bg-gray-300 [&>a]:pointer-events-none"
    />
  );
};

export default Pagination;
