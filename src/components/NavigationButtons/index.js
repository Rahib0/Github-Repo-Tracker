import React from 'react'
import './style.css'

export default function NavigationButtons({ currentPage, nextPage , setCurrentPage }) {
    
    const handleBackClick = (e) => {
        setCurrentPage(prev => prev - 1)
    }

    const handleNextClick = (e) => {
        setCurrentPage(prev => prev + 1)
    }

    return (
        <>
            {currentPage > 1 && <button className='nav_butt' onClick={handleBackClick}>Back</button>}
            {nextPage && <button className='nav_butt' onClick={handleNextClick}>Next</button>}

        </>
    )
}
