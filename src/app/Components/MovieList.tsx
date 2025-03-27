import { VideoData } from "./BillBoard";
import MovieCard from "./MovieCard";

interface MovieListProps {
    data: VideoData[] | undefined;
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
    const movies = Array.isArray(data) ? data : [];

    if (movies.length === 0) {
        return null;
    }

    return (
        <div className="px-4 md:px-12 mt-4 space-y-4">
            <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold">{title}</h2>
            <div className="grid grid-cols-4 gap-2">
                {movies.map((movie) => (
                    <div key={movie.id}>
                        <MovieCard data={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;
