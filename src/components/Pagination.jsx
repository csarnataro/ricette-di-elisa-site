import React from 'react'

const paginationClassnames = `bg-orange-300 hover:bg-red-700 text-black hover:text-white mx-1 px-3 py-1 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 inline-block`

const disabledPaginationClassnames = `bg-orange-300 text-black mx-1 px-3 py-1 rounded inline-block opacity-50 cursor-not-allowed
`

const Pagination = ({
  currentPage,
  getData,
  pageSize,
  setCurrentPage,
  totalCount
}) => {
  const pageNumberIntegerDivision = Math.floor(totalCount / pageSize)
  const pageNumber =
    totalCount / pageSize - pageNumberIntegerDivision === 0
      ? pageNumberIntegerDivision
      : pageNumberIntegerDivision + 1
  const pages = [...Array(pageNumber).keys()]

  return (
    <div className='m-6 text-center'>
      <button
        disabled={currentPage === 0}
        className={
          currentPage === 0
            ? disabledPaginationClassnames
            : paginationClassnames
        }
        onClick={() => {
          getData({
            variables: {
              first: pageSize,
              skip: (currentPage - 1) * pageSize
            }
          })
          setCurrentPage(currentPage - 1)
        }}
      >
        ← Pagina precedente
      </button>
      <div className='inline mx-4'>
        {pages.map((pageNumber, index) => (
          <React.Fragment key={pageNumber}>
            <button
              className={index === currentPage ? 'text-red-600' : ''}
              onClick={() => {
                getData({
                  variables: {
                    first: pageSize,
                    skip: index * pageSize
                  }
                })
                setCurrentPage(index)
              }}
            >
              {pageNumber + 1}
            </button>
            <span className='mx-2'>{index < pages.length - 1 ? '|' : ''}</span>
          </React.Fragment>
        ))}
      </div>
      <button
        disabled={currentPage >= pageNumber - 1}
        className={
          currentPage >= pageNumber - 1
            ? disabledPaginationClassnames
            : paginationClassnames
        }
        onClick={() => {
          getData({
            variables: {
              first: pageSize,
              skip: (currentPage + 1) * pageSize
            }
          })
          setCurrentPage(currentPage + 1)
        }}
      >
        Pagina successiva →
      </button>
    </div>
  )
}

export default Pagination
