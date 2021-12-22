import React from "react";
import { Carousel, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import cover1 from "./images/cover1.jpg";
import cover2 from "./images/cover2.jpg";
import cover3 from "./images/cover3.jpg";
import "./homepage.css";
import PetsFeed from "../petsFeed/PetsFeed";

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
                <strong>Don't stay alone during the holidays</strong>
              </h3>
              <p className="subtext-caro">
                <a href="#search">Click here to adopt a friend!</a>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="bottom-page-wrapper">
        <div className="who-are-we-wrapper">
          <h1>Welcome to Pet-AhTikva</h1>
          <span className="info-about-website-homepage">
            So, NO! it's not a website for Petah-Tikva city, we are not even
            based over there!
            <br />
            The idea behind Pet AhTikva, is simple to adopt a brother ("Ah") and
            give it hope ("Tikva")!
            <br />
            Since we founded the website, we helped{" "}
            <span id="numOfAdoption">
              <strong>CHANGE NUMBER</strong>
            </span>{" "}
            pets to find a new loving home.
            <br />
          </span>
          <span>
            <h3>We all love stats, no?</h3>
            Let's take a look at our stats since we started the company!
          </span>
          <div>
            {
              // Need to move table to a component
            }
            <Table className="table-stats" responsive="xl">
              <thead>
                <tr>
                  <th>Pet type</th>
                  <th>Adopted</th>
                  <th>Fostered</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dogs</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
                <tr>
                  <td>Cats</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
                <tr>
                  <td>Parrots</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
                <tr>
                  <td>Rabbits</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                  <td>Table cell</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="pets-feed-wrapper">
          <h3 className="pets-feed-title">Pets feed</h3>
          {
            // will be under map function
          }
          <PetsFeed />
          <PetsFeed />
          <PetsFeed />
          <PetsFeed />
          <PetsFeed />
          <PetsFeed />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
