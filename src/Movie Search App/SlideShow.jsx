import { useState, useEffect } from "react";

const moviePosters = [
    'https://m.media-amazon.com/images/M/MV5BOTA1Mzc2N2ItZWRiNS00MjQzLTlmZDQtMjU0NmY1YWRkMGQ4XkEyXkFqcGc@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BZTE5MzFlMTktMzBkOC00ZjMxLThmOTAtOGU3ZGEwZGRlNDdjXkEyXkFqcGc@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMjAxNjY0MTk2MV5BMl5BanBnXkFtZTgwNTU2NDEwMjI@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BMTNjNGU4NTUtYmVjMy00YjRiLTkxMWUtNzZkMDNiYjZhNmViXkEyXkFqcGc@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BNjY0MTc4ZDEtY2MxYi00ODIxLWJlNzQtZTlmZDVkYTYwM2NhXkEyXkFqcGc@._V1_SX300.jpg',
    'https://m.media-amazon.com/images/M/MV5BYzEwZjczOTktYzU1OS00YjJlLTgyY2UtNWEzODBlN2RjZDEwXkEyXkFqcGc@._V1_SX300.jpg',
    
];

const SlideShow = () => {
    const [index, setIndex] = useState(0); // Maintain the current index

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Update the index to the next poster (looping to the first one after the last)
            setIndex((prevIndex) => (prevIndex + 1) % moviePosters.length);
        }, 10000); // Change image every second

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    return <img className="image-slide" src={moviePosters[index]} alt="poster" />;
};

export default SlideShow;
