"use client";
import useMovielist from '@/hook/useMovielist';
import useFavoritemovies from '@/hook/useFavoritemovies';
import React, { useCallback } from 'react';
import MovieList from './MovieList';

const MainContent: React.FC = () => {
    const { data, isLoading } = useMovielist();
    const { MovieData, error, isfavloading } = useFavoritemovies();


    if (isLoading || isfavloading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">Error loading favorites</div>;
    }
    return (
        <div className="flex w-full h-full flex-col">
          
            <MovieList title="Trending Movies" data={data?.movies || []} />
            <MovieList title="My Favorites" data={MovieData.movies || []} />
        </div>
    );
};

export default MainContent;
