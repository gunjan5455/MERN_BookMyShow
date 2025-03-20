import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesById } from "../../calls/movies";
import Navbar from "../../components/MoviList/navbar/Navbar";
import { Flex, Input, Row, Col } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getAllShowsForAMovie } from "../../calls/show";
const SingleMovie = () => {
  const [movie, setMovie] = useState(null);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [showsData, setShowsData] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);
  const getData = async () => {
    const resData = await getMoviesById(params.id);
    setMovie(resData.data.data);
    // console.log(resData.data.data);
  };
  const getAllShowsForSelectetMovie = async () => {
    const showData = await getAllShowsForAMovie(params.id, date);
    console.log(showData.data.data);
    setShowsData(showData.data.data);
  };
  useEffect(() => {
    getAllShowsForSelectetMovie();
  }, [date]);
  useEffect(() => {
    getData();
  }, []);
  const handleDate = (e) => {
    setDate(e.target.value);
    navigate(`/movie/${params.id}?date=${e.target.value}`);
  };
  return (
    <div>
      <Navbar />
      {movie && (
        <Flex gap="large" justify="center" items="center">
          <div
            style={{
              margin: "20px",
            }}
          >
            <img
              src={movie.poster}
              width={200}
              style={{ borderRadius: "20px" }}
            />
          </div>
          <div>
            <h1>{movie.moviename}</h1>
            <hr />
            <p>Language: {movie.language}</p>
            <p>Genre: {movie.genre}</p>
            <p>Releas date: {movie.releasedate}</p>
            <p>duration: {movie.duration}</p>
            <hr />
            <div>
              <label>Choose the date: </label>
              <Input onChange={handleDate} value={date} type="date" />
            </div>
          </div>
        </Flex>
      )}
      {showsData && showsData.length === 0 && (
        <div className="pt-3 m-5">
          <h2 style={{ marginLeft: "500px" }} className="blue-clr">
            Currently, No Theatres available for this movie!
          </h2>
        </div>
      )}
      {showsData && showsData.length > 0 && (
        <div style={{ marginLeft: "520px" }} className="m-3">
          <h2> Theatres </h2>

          {showsData.map((showsData) => {
            const theatreId = showsData.theatreId;
            const theatreDetails = showsData.theatreDetails;
            const allShowsForThisTheatre =
              showsData.allShowsForParticularTheatre;

            return (
              <div>
                <Row gutter={24}>
                  <Col lg={{ span: 8 }}>
                    <h3> {theatreDetails.name} </h3>
                    <p> {theatreDetails.address}</p>
                  </Col>

                  <Col lg={{ span: 16 }}>
                    <ul className="show-ul">
                      {allShowsForThisTheatre.map((singleShow) => {
                        return (
                          <li
                            onClick={() => {
                              navigate(`book-show/${singleShow._id}`);
                            }}
                          >
                            {" "}
                            {singleShow.time}{" "}
                          </li>
                        );
                      })}
                    </ul>
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default SingleMovie;
