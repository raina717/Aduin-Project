import { Text } from "components";
import React from "react";

import ReactPaginate from "react-paginate";

const NotifPagination = ({
  handlePageClick,
  pageCount,
  limit,
  initialPage,
}) => {
  const pageNumClassName = `font-poppins font-normal min-w-[20px] flex justify-center items-center text-sm
  font-poppins font-normal min-w-[20px] flex justify-center items-center text-sm text-primary pointer-events-none`;

  const prevClassName = `font-poppins font-normal min-w-[30px] flex justify-center items-center text-2xl rounded-l-[4px] text-primary`;

  const nextClassname = `font-poppins font-normal min-w-[30px] flex justify-center items-center text-2xl  rounded-r-[4px] text-primary`;

  const countTotal = 10 * initialPage;

  return (
    <div className="flex items-center">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        pageCount={pageCount}
        previousLabel="<"
        pageLabelBuilder={(page) => (
          <Text>
            {countTotal + 1} - {10 + countTotal}
          </Text>
        )}
        renderOnZeroPageCount={null}
        pageLinkClassName={pageNumClassName}
        previousLinkClassName={prevClassName}
        nextLinkClassName={nextClassname}
        breakLinkClassName={pageNumClassName}
        initialPage={initialPage}
        forcePage={initialPage}
        containerClassName="flex items-center"
        disabledClassName="[&>a]:text-gray-600 [&>a]:cursor-default"
      />
    </div>
  );
};

export default NotifPagination;
