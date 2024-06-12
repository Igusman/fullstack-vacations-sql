import React from 'react';
import './pagination.css';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (page: number) => {
        onPageChange(page);
    };

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => handleClick(i)}
                className={i === currentPage ? 'active' : ''}
            >
                {i}
            </button>
        );
    }

    return (
        <div className="pagination">
            {pages}
        </div>
    );
};

export default Pagination;
