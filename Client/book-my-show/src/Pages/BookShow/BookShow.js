import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowsByIdAPI } from "../../calls/show";
import { Card, Row, Col, Button, message } from "antd";
import Navbar from "../../components/MoviList/navbar/Navbar";
import StripeCheckout from "react-stripe-checkout";
import { bookingAPI, makePaymentAPI } from "../../calls/booking";
const BookShow = () => {
  const params = useParams();
  const showId = params.showId;
  const [showDetails, setShowDetails] = useState(null);
  const [selectedSeat, setSelctedSeat] = useState([]);
  const [isBookingSuccess, setIsBookingSuccess] = useState(null);
  const getSeates = () => {
    const columns = 12;
    const totalseats = 120;
    const rows = totalseats / columns;
    let allRows = [];
    let allColumns = [];

    for (let i = 0; i < rows; i++) {
      allRows.push(i);
    }
    for (let j = 0; j < columns; j++) {
      allColumns.push(j);
    }
    const onSeatSlect = (seatno) => {
      console.log(`seate ${seatno} clicked`);
      if (showDetails.bookedSeats.includes(seatno)) {
        return;
      }
      if (!selectedSeat.includes(seatno)) {
        setSelctedSeat([...selectedSeat, seatno]);
        return;
      }
      const updateSelectedSeate = selectedSeat.filter((seat) => seat != seatno);
      setSelctedSeat(updateSelectedSeate);
    };
    console.log(allRows);
    console.log(allColumns);
    return (
      <div className="seat-ul">
        <div>
          {allRows.map((rows) => {
            return (
              <div className="d-flex">
                {allColumns.map((col) => {
                  let seatNumber = rows * columns + col + 1;

                  const isSeatBooked = showDetails.bookedSeats.includes(
                    seatNumber
                    // .toString()
                  );
                  let seatClass = "seat-btn";
                  console.log(isSeatBooked);

                  if (isSeatBooked) {
                    seatClass += " seat-btn-booked";
                  }
                  if (selectedSeat.includes(seatNumber)) {
                    seatClass += " seat-btn-selected";
                  }
                  return (
                    <button
                      onClick={() => {
                        onSeatSlect(seatNumber);
                      }}
                      className={seatClass}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeat.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeat.length * showDetails.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };
  const onToken = async (token) => {
    const response = await makePaymentAPI({
      amount: selectedSeat.length * showDetails.ticketPrice,
      token: token,
    });
    if (response.data.success) {
      message.success(response.data.message);
    }
    const bookingResponse = await bookingAPI({
      show: showDetails._id,
      seats: [...selectedSeat],
      transactionId: response.data.data,
    });
    let success = bookingResponse.data.success;
    setIsBookingSuccess(success);
    if (success) {
      message.success(bookingResponse.data.message);
    } else {
      message.error("Payment failed!");
    }
    console.log(bookingResponse);
    return success;
  };
  const fetchshow = async () => {
    const response = await getShowsByIdAPI(showId);
    console.log(response);
    setShowDetails(response.data.data);
  };
  useEffect(() => {
    if (isBookingSuccess) {
      fetchshow();
    }
  }, [isBookingSuccess]);
  useEffect(() => {
    fetchshow();
  }, []);
  console.log(showId);
  return (
    <>
      <Navbar />
      {showDetails && (
        <div>
          <Row gutter={24}>
            <Col span={24}>
              <Card
                title={
                  <div>
                    <h1> {showDetails.movie.moviename}</h1>
                    <p>
                      Theatre : {showDetails.theater.name},{" "}
                      {showDetails.theater.address}
                    </p>
                  </div>
                }
                extra={
                  <>
                    <div>
                      <h3> Show Name : {showDetails.name} </h3>
                    </div>

                    <h4>Ticket Price : {showDetails.ticketPrice}</h4>

                    <h4>Total Seats : {showDetails.totalSeats}</h4>

                    <h4>
                      Available Seats :{" "}
                      {showDetails.totalSeats - showDetails.bookedSeats.length}
                    </h4>
                  </>
                }
                style={{ width: "100%" }}
              >
                {getSeates()}

                {selectedSeat.length > 0 && (
                  <StripeCheckout
                    token={onToken}
                    stripeKey="pk_test_51Pk5XWKp25HZoc30bcTmozGCabcS6KEKI7isIVopkB8TmzislgHqHIY3fzvxstSTY6bSN6LhQeW3z7oYpkc242Sd008g8PAKBI"
                  />
                )}
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default BookShow;
