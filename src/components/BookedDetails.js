import React, { useEffect, useMemo, useState } from 'react'
import '../styles/BookedDetails.css'
import { airlineNamefinder, logofinder, months3char } from './Constant';

export default function BookedDetails() {
    const [bookedshow, setbookedshow] = useState("flights");
    const [bookeddata, setbookeddata] = useState();
    const [togglecardfulldetails, settogglecardfulldetails] = useState({});


    //------------------------------flights moreInfo Div popup--------------------------------------

    function togglecarddetails(val) {
        settogglecardfulldetails({})
        settogglecardfulldetails({ [val]: !togglecardfulldetails[val] });
    }
    //---------------------------price convert integer to comma---------------------------

    function numberwithComma(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const fetchbookeddata = useMemo(async () => {
        try {
            const response = await (await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/booking/`,
                {
                    method: "GET",
                    headers: {
                        projectID: "mhroh2oic5sz",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                }
            )).json();
            setbookeddata(response.data);
        } catch (error) {
            alert(error);
        }
    }, [])
    useEffect(() => {
        fetchbookeddata;
    })
    function visiblebooked(val) {
        setbookedshow(val);
    }
    return (
        <div className="bookedDetailsMain">
            {bookeddata &&
                <div>
                    <div className={`flex g10 historylogoOuterDiv`}>
                        <div className='Historylogo'>Booking Details</div>
                    </div>
                    <div className={`flex g10 historyButtonOuterDiv`}>
                        <p className='FlightHistoryButton flexja' onClick={() => { visiblebooked("flights") }}>Flights</p>
                        <p className='HotelHistoryButton flexja' onClick={() => { visiblebooked("hotels") }}>Hotels</p>
                    </div>
                    <div className='bookedDetailsOverflow'>
                        {bookedshow == "flights" &&
                            <div className={`flex flexc g10`}>
                                {bookeddata.map((item, index) => (item.flight && (
                                    <div key={index} className='flightResultcardInner flexa'>
                                        <div className='flightResultcardheader flexa flexc g20'>
                                            <div className='flexja g10'>
                                                <div className='bookingdate'>
                                                    <p className='nowrap'>Booked At:</p>
                                                    <p className={`posteddate nowrap`}>{item.start_date[8]}{item.start_date[9]}{months3char[(parseInt(item.start_date[5] == 1 ? 10 : 0) + parseInt(item.start_date[6])) - 1]}, {item.start_date[0]}{item.start_date[1]}{item.start_date[2]}{item.start_date[3]}</p>
                                                </div>
                                                <img src={logofinder(item.flight)} />
                                                <div >
                                                    <p className='flightName'>{airlineNamefinder(item.flight)}</p>
                                                    <p className='flightid'>{`${item.flight.flightID[0]}${item.flight.flightID[1]}-${item.flight.flightID[item.flight.flightID.length - 3] + item.flight.flightID[item.flight.flightID.length - 2] + item.flight.flightID[item.flight.flightID.length - 1]}`}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flightResultdepartureTime'>{item.flight.departureTime}</div>
                                        <div className='flightResultDuration flexja flexc'><p className='flightresultduration'>{item.flight.duration}h 00m</p><div className='flightdurationandstopSeperator flexja'><div></div></div><p className='flightresultstops'>{item.flight.stops == 0 ? "Non-stop" : item.flight.stops == 1 ? item.flight.stops + " Stop" : item.flight.stops + " Stops"}</p></div>
                                        <div className='fligthResultArrivalTime'>{item.flight.arrivalTime}</div>
                                        <div className='flightprice'>₹{numberwithComma(item.flight.ticketPrice)}</div>
                                    </div>
                                )))}
                            </div>
                        }

                        {bookedshow == "hotels" && <div className={`flex flexc g10`}>
                            {bookeddata.map((item, index) => (item.hotel && (
                                <div key={index} className={`flex flex g10 `}>
                                    <div className='bookingdate'>
                                        <p className='nowrap'>Booked At:</p>
                                        <p className={`posteddate nowrap`}>{item.start_date[8]}{item.start_date[9]}{months3char[(parseInt(item.start_date[5] == 1 ? 10 : 0) + parseInt(item.start_date[6])) - 1]}, {item.start_date[0]}{item.start_date[1]}{item.start_date[2]}{item.start_date[3]}</p>
                                    </div>
                                    <div>{item.hotel.name},<br/>
                                    {item.hotel.location}</div>
                                </div>
                            )))}
                        </div>}
                    </div>
                </div>
            }
        </div>
    )
}
