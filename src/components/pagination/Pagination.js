import React from 'react'
import { UseFoodContext } from '../../context/Context'
import "./Pagination.sass"

const LEFT_PAGE = "LEFT"
const RIGHT_PAGE = "Right"

// Helper Method to create range of numbers for pagination neighbors
const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i)
        i += step;
    }

    return range
}


export default function Pagination() {
    let { recipeState, handlePaginationData, search } = UseFoodContext()
    const pages = fetchPageNumbers()


    function fetchPageNumbers() {
        const totalPages = parseInt(recipeState.maxPages)
        const currentPage = recipeState.pageShown
        const pageNeighbor = 1
        
        // Total Numbers: Total page to show on control
        // Blocks: + 2 to cover for the left and right control
        const totalControlNumbers = (pageNeighbor * 2) + 3
        const totalBlocks = totalControlNumbers + 2;

        if(totalPages > totalBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbor);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbor)
            let pages = range(startPage, endPage)

            // has__Spill: has hidden pages to left/right
            // SpillOffset: # of hidden pages
            const hasLeftSpill = startPage > 2
            const hasRightSpill = (totalPages - endPage) > 1
            const spillOffset = totalControlNumbers - (pages.length + 1)

            let extraPages
            switch(true) {
                case (hasLeftSpill && !hasRightSpill):  
                    extraPages = range(startPage - spillOffset, startPage - 1)
                    pages = [LEFT_PAGE, ...extraPages, ...pages]
                    break
                case (!hasLeftSpill && hasRightSpill):
                    extraPages = range(endPage + 1, endPage + spillOffset)
                    pages = [...pages, ...extraPages, RIGHT_PAGE]
                    break;
                case (hasLeftSpill && hasRightSpill):
                default: {
                    pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
                    break
                }
            }

            return [1, ...pages, totalPages]
        }

        return range(1, totalPages)
    }


    const handleClick = page => evt => {
        evt.preventDefault()
        handlePaginationData(page)
    }

    const handleMoveLeft = evt => {
        evt.preventDefault()
        handlePaginationData(recipeState.pageShown - 1)
    }

    const handleMoveRight = evt => {
        evt.preventDefault()
        handlePaginationData(recipeState.pageShown + 1)
    }

    return (
        <div className="pag-ctr">
            <div className="results-shown">
                { recipeState.recipes.length > 0 && `Showing Results ${recipeState.offset}-${recipeState.offset+10} for search ${search}`} 
            </div>
            <nav>
               <ul className="pagination">
                    { pages.map((page, index) => {
                        if(page === LEFT_PAGE) return (
                            <li key={index} className="page-item">
                                <a className="page-link" href="#" onClick={handleMoveLeft}>
                                    Prev
                                </a>
                            </li>
                        )

                        if(page === RIGHT_PAGE) return (
                            <li key={index} className="page-item">
                                <a className="page-link" href="#" onClick={handleMoveRight}>
                                    Next
                                </a>
                            </li>
                        )

                        return (
                            <li key={index} className={`page-item ${recipeState.pageShown === page ? 'active' : ''}`}>
                                <a className="page-link" href="#" onClick={handleClick(page)}>
                                    {page}
                                </a>
                            </li>
                        )  
                    })

                    }
               </ul>
            </nav>
        </div>
    )
}
