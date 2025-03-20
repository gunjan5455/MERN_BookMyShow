import { getAllMovies } from "../../calls/movies";
import { Col, Flex, Input, Row } from "antd";
import { useEffect, useState } from "react";
import Navbar from "../../components/MoviList/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const Home = () => {
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const fetchMovies = async () => {
    const res = await getAllMovies();
    setMovies(res.data);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  const onSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <Navbar />
      <Row
        style={{ justifyContent: "center", marginTop: "20px" }}
        className="d-flex justify-content-center w-100"
      >
        <Col lg={{ span: 12 }} xs={{ span: 24 }}>
          <Input
            value={search}
            onChange={onSearch}
            placeholder="Type here to search for movies"
          />
        </Col>
      </Row>
      <Flex
        wrap
        gap="large"
        justify="center"
        align="center"
        style={{ marginTop: "10px", padding: "30px" }}
      >
        {movies &&
          movies
            .filter((movie) =>
              movie.moviename.toLowerCase().includes(search.toLowerCase())
            )
            .map((movie) => {
              return (
                <div
                  key={movie._id}
                  className="mb-5"
                  span={{
                    lg: 10,
                    xs: 24,
                    md: 12,
                  }}
                >
                  <div
                    className="text-center cursor-pointer"
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                  >
                    <img
                      width={250}
                      src={movie.poster}
                      style={{ borderRadius: "8px" }}
                    />
                    <h3>{movie.moviename}</h3>
                  </div>
                </div>
              );
            })}
      </Flex>
    </div>
  );
};
export default Home;
