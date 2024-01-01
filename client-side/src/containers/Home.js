import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/index.layout";
import { Container, Spinner } from "react-bootstrap";
import VenueCard from "../components/UI/VenueCard";
import { useDispatch, useSelector } from "react-redux";
import { getVenues } from "../actions/venue.actions";
import { getPublicURL } from "../urlConfig";
import { Link } from "react-router-dom";
import { isEmpty } from "../helpers/isObjEmpty";
import Footer from "./Footer";
import spic1 from './Assets/s1.png';
import spic2 from './Assets/s2.png';
import spic3 from './Assets/s3.png';
import spic4 from './Assets/s4.png';
import spic5 from './Assets/s5.png';
import spic6 from './Assets/s6.png';
import spic7 from './Assets/s7.png';
// Add imports for other category images


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { scrollUP } from "./ScrollTop/ScrollTop";

function Home() {
  document.title = "WaGe | Home";
  const allVenuesInfo = useSelector((state) => state.allVenuesInfo);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const categoryImages = {
    'Electrician': spic1,
    'Carpenter': spic2,
    'Plumber': spic4,
    'Floor Cleaning':spic3,
    'Laundry':spic7,
    'Painting':spic5,
    'Car Wash':spic6,
    'Bathroom Cleaning':spic3,
    // Add mapp:ings for other categories
  };
  

  useEffect(() => {
    dispatch(getVenues());
  }, []);

  if (allVenuesInfo.loading) {
    return (
      <Layout>
        <div className="text-center" style={{ marginTop: "60px" }}>
          <h1>Get ready to hire</h1>
          <Spinner animation="border" variant="success" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <div className="row">
          {isEmpty(allVenuesInfo.allVenues) ? (
            <div className="text-center" style={{ marginTop: "60px" }}>
              <h1>
                No Venues currently 😢<br></br>
                Check again after sometime
              </h1>
            </div>
          ) : (
            allVenuesInfo.allVenues.map((venue) => {
              const {
                _id,
                venueName,
                address,
                location,
                category,
                price,
                ownerId,
              } = venue;
              {/* console.log("This is the venuePictures", venuePictures); */}
              return (
                <div className="col-md-4" key={_id}>
                  <VenueCard
                    // img1={venuePictures[0].img}
                    // img2={venuePictures[1].img}
                    img1={categoryImages[category]} // Use the category image based on the mapping
                    venueName={venueName}
                    _id={_id}
                    userId={auth.user._id}
                    category={category}
                    address={address}
                    location={location}
                    price={price}
                    ownerId={ownerId}
                    style={{ width: "800px", height: "200px" }}
                  />
                </div>
              );
            })
          )}
        </div>
      </Container>

      <Footer/>
    </Layout>
  );
}

export default Home;
