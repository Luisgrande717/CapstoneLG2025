// frontend/src/pages/Mass.jsx
import './mass.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const Mass = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <section className="mass-page">
      <Slider {...settings} className="mass-carousel">
        {/* Slide 1 – Mass Schedule */}
        <div className="carousel-slide">
          <div className="mass-card">
            <h2>Mass Schedule</h2>

            <div className="mass-section">
              <h3>Daily</h3>
              <p>7:00am (Español)<br />6:30pm (Español)</p>
            </div>

            <div className="mass-section">
              <h3>Saturday</h3>
              <p>6:30pm (Español) — Misa Vigilia</p>
            </div>

            <div className="mass-section">
              <h3>Sunday</h3>
              <ul>
                <li>9:00am (Español)</li>
                <li>11:00am (English)</li>
                <li>1:00pm (Español)</li>
                <li>5:30pm (Español)</li>
                <li>7:30pm (Bilingual)</li>
              </ul>
            </div>

            <div className="mass-section">
              <h3>Confessions</h3>
              <p>Saturday: 5:00pm – 6:00pm</p>
              <p>Also by appointment through the parish office</p>
            </div>

            <img
              src="/assets/front-office2.jpg"
              alt="Parish Front Office"
              className="mass-image"
            />
          </div>
        </div>

        {/* Slide 2 – Office Hours */}
        <div className="carousel-slide">
          <div className="mass-card">
            <h2>Office Hours</h2>

            <div className="mass-section">
              <h3>Monday – Friday</h3>
              <p>9:00am – 1:00pm | 2:00pm – 5:00pm</p>
              <h3>Saturday</h3>
              <p>9:00am – 12:00pm <em>(Closed until further notice)</em></p>
              <h3>Sunday</h3>
              <p>CLOSED</p>
            </div>

            <img
              src="/assets/front-office.jpg"
              alt="Office Hours"
              className="mass-image"
            />
          </div>
        </div>

        {/* Slide 3 – Contact Us */}
        <div className="carousel-slide">
          <div className="mass-card">
            <h2>Contact Us</h2>

            <div className="mass-section">
              <p>380 Smith Street, Perth Amboy, NJ 08861</p>
              <p>Tel: (732) 442-6634</p>
              <p>Fax: (732) 293-2544</p>
              <p>Email: <a href="mailto:olfperthamboy@gmail.com">olfperthamboy@gmail.com</a></p>
            </div>

            <img
              src="/assets/front-office3.jpg"
              alt="Contact Office"
              className="mass-image"
            />
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Mass;