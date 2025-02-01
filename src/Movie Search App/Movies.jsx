import LayOut from "./LayOut";
import { Form, Button, Table } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
export default function FindMovie() {
    const [movie, setMovie] = useState([]);
    const [movieSearch, setmovieSearch] = useState('');
    const [error, setError] = useState('');
    const [isMovieFound, setIsMovieFound] = useState(false);
    const [loading, setLoading] = useState(false)
    const inputValue = useRef()
    console.log(error);
    useEffect(() => {
        if (movieSearch) {
            setLoading(true)
            fetch(`https://www.omdbapi.com/?t=${movieSearch}&apikey=c81c109f`)
                .then(res => res.json())
                .then(data => {
                    setLoading(false)
                    if (data.Error) {
                        setError(data.Error);
                        setIsMovieFound(false);
                        setMovie([]);
                        return;
                    } else {
                        setMovie(data);
                        setIsMovieFound(true);
                        setError('');
                    }
                })
                .catch(err => console.error(err)
                )
        } else {
            setMovie([]);
            setmovieSearch('');
        }
    }, [movieSearch])

    const LadingEffect = () => {
        return <>
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-light " role="status">
                </div>
            </div>
        </>
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const movie = inputValue.current.value.trim();
        if (movie === '') {
            setError('Please search for a movie')
        } else {
            setmovieSearch(movie);
        }
    }

    return <>
        <LayOut />
        <section className="p-3 mx-4">
            <div className="d-flex flex-column align-items-center">
                <Form className="d-flex justify-content-center gap-4" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control className="p-2" type="text" placeholder="Enter movie title" ref={inputValue} />
                    </Form.Group>
                    <Button type="submit" className="btn btn-secondary">Search</Button>
                </Form>
                {error && <div className="m-3 text-danger">{error}</div>}
            </div>
            <div>
                {loading && <LadingEffect />}
                {isMovieFound &&
                    <>
                        <div className="p-3 d-flex align-items-start gap-3 movie-info">
                            <div className="poster">
                                <img className="text-white" src={movie.Poster} alt={movie.Title} />
                            </div>
                            <div className="text-white">
                                <h1 className="fs-4 text-white text-center">{movie.Title}</h1>
                                <p>Type: <span className="badge bg-primary">{movie.Type}</span></p>
                                <p>Language: <span className="badge bg-primary p-1">{movie.Language}</span></p>
                                <p>Country: <span className="badge bg-primary p-1">{movie.Country}</span></p>
                                <p>Rate: <span className="badge bg-primary rate">{movie.imdbRating}</span></p>
                                <p>Box Office: <span className="text-danger">{movie.BoxOffice}</span></p>
                                <p>Awards: <span className="text-danger">{movie.Awards}</span></p>
                                <h3>Plot:</h3>
                                <p>{movie.Plot}</p>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <Table className="m-4" striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Year</th>
                                        <th>Rated</th>
                                        <th>Released</th>
                                        <th>Runtime</th>
                                        <th>Genre</th>
                                        <th>Director</th>
                                        <th>Writer</th>
                                        <th>Actors</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{movie.Year}</td>
                                        <td>{movie.Rated}</td>
                                        <td>{movie.Released}</td>
                                        <td>{movie.Runtime}</td>
                                        <td>{movie.Genre}</td>
                                        <td>{movie.Director}</td>
                                        <td>{movie.Writer}</td>
                                        <td>{movie.Actors}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                    </>
                }
            </div>
        </section>
    </>
}