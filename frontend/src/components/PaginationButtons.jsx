import React from 'react'
import ReactPaginate from 'react-paginate'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
const PaginationButtons = () => {
  return (
    <div >
        <ReactPaginate
        className='flex flex-row mb-4'
        breakLabel={<span className='mr-4'>...</span>}
        nextLabel={<span className='w-10 h-10 flex items-center justify-center bg-white rounded-md mr-4'>
            <MdOutlineKeyboardArrowRight />
        </span>}
        // onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={40}
        previousLabel={<span className='w-10 h-10 flex items-center justify-center rounded-md bg-white'>
            <MdOutlineKeyboardArrowLeft />
        </span>}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName='block border- border-solid  border-lightGray hover:bg-lightGray w-10 h-10 flex items-center justify-center rounded-md'
        activeClassName={`style: className:"bg-purple"`}
      />
    </div>
  )
}

export default PaginationButtons