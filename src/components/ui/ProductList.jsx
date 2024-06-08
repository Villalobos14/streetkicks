import React, { useContext, useState } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import { truncateText } from '../../utilities/truncateText';
import { SearchContext } from '../../context/SearchProvider';
import { sneakers } from '../../utilities/sneakers';

const ITEMS_PER_PAGE = 12;

export default function ProductList() {
    const { searchTerm } = useContext(SearchContext);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredSneakers = sneakers.filter((sneaker) =>
        sneaker.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredSneakers.length / ITEMS_PER_PAGE);

    const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
    };

    const currentSneakers = filteredSneakers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (sneakers.length === 0) {
        return (
            <div className='flex justify-center items-center h-[400px] flex-grow text-gray-500 text-sm font-semibold my-12'>
                No tenemos sneakers para mostrarte, pero agregaremos más más adelante, ¡gracias por tu paciencia! :)
            </div>
        );
    }

    if (filteredSneakers.length === 0) {
        return (
            <div className='flex justify-center items-center h-[300px] flex-grow text-gray-500 text-sm font-semibold my-32'>
                No hay resultados disponibles:(
            </div>
        );
    }

    return (
        <div className='mx-auto mt-6'>
            <h3 className='text-lg font-medium'>Recomendados para ti</h3>
            <div className='mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-5 xl:gap-x-12 gap-y-4 overflow-x-auto'>
                {currentSneakers.map((sneaker) => (
                    <Link key={sneaker.id} to={`/sneaker/${sneaker.id}`}>
                        <Card
                            brand={sneaker.brand}
                            name={truncateText(sneaker.name, 35)}
                            price={sneaker.price}
                        />
                    </Link>
                ))}
            </div>
            <div className='flex justify-center mt-4'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handleChangePage(index + 1)}
                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
