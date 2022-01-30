import React from "react";
import { Carousel } from "react-bootstrap";
import cover1 from "./images/cover1.jpg";
import cover2 from "./images/cover2.jpg";
import cover3 from "./images/cover3.jpg";
import InfoCard from "./InfoCard";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./homepage.css";

function HomePage() {
  return (
    <div className="homepage-wrapper">
      <div className="carousel-wrapper">
        <Carousel>
          <Carousel.Item className="card-overlay" interval={5000}>
            <img className="d-block w-100" src={cover1} alt="First slide" />
            <Carousel.Caption className="d-flex flex-column align-items-center">
              <h3 className="display-3">
                <strong>We are Pet-AhTikva</strong>
              </h3>
              <p className="subtext-caro">
                <strong>We give hope for pets.</strong>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img className="d-block w-100" src={cover2} alt="Second slide" />
            <Carousel.Caption>
              <h3 className="display-3">
                <strong>Thank you adopters.</strong>
              </h3>
              <p className="subtext-caro">
                <strong>
                  150 happy families adopted a new friend last month
                </strong>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img className="d-block w-100" src={cover3} alt="Third slide" />
            <Carousel.Caption>
              <h3 className="display-3">
                <strong>Don't stay alone!</strong>
              </h3>
              <p className="subtext-caro">
                <Link to="/adopt">Click here to adopt a friend!</Link>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="bottom-page-wrapper">
        <div className="adoption-process-wrapper">
          <div className="single-info-card">
            <InfoCard
              stepNumber="1"
              header="Join The Family"
              title="We are, the pet lovers."
              text="Browse for your next family member, they are expecting to see you and have a warm home"
            />
          </div>
          <div>
            <BsFillArrowRightSquareFill className="arrow-info-card" />
          </div>

          <div className="single-info-card">
            <InfoCard
              stepNumber="2"
              header="Easy Adoption Process"
              title="You choose, we do the rest."
              text="Did you find your match? just click and we will contact you ASAP to arrange the exciting meeting!"
            />
          </div>
          <div>
            <BsFillArrowRightSquareFill className="arrow-info-card" />
          </div>
          <div className="single-info-card">
            <InfoCard
              stepNumber="3"
              header="Grow Your Family"
              title="Happy days!"
              text="By this stage, you probably found your soulmate, you both will find an inner happiness!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
