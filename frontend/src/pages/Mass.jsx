/**
 * Mass Schedule Page Component
 *
 * Displays Mass times, office hours, and contact information
 * in a responsive carousel format. Optimized for mobile devices.
 *
 * @returns {JSX.Element} Mass schedule carousel component
 */

import './Mass.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useLanguage } from '../context/LanguageContext';

const Mass = () => {
  const { t } = useLanguage();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true, // Helps with mobile layout
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          dots: true,
          fade: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
          fade: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="mass-page">
      <Slider {...settings} className="mass-carousel">
        {/* Slide 1 – Mass Schedule */}
        <div className="carousel-slide">
          <div className="mass-card">
            <h2>{t('massSchedule', { fallback: 'Mass Schedule' })}</h2>

            <div className="mass-section">
              <h3>{t('daily', { fallback: 'Daily' })}</h3>
              <p>
                7:00am (Español)
                <br />
                6:30pm (Español)
              </p>
            </div>

            <div className="mass-section">
              <h3>{t('saturday', { fallback: 'Saturday' })}</h3>
              <p>6:30pm (Español) — Misa Vigilia</p>
            </div>

            <div className="mass-section">
              <h3>{t('sunday', { fallback: 'Sunday' })}</h3>
              <ul>
                <li>9:00am (Español)</li>
                <li>11:00am (English)</li>
                <li>1:00pm (Español)</li>
                <li>5:30pm (Español)</li>
                <li>7:30pm (Bilingual)</li>
              </ul>
            </div>

            <div className="mass-section">
              <h3>{t('confessions', { fallback: 'Confessions' })}</h3>
              <p>{t('confessionTime', { fallback: 'Saturday: 5:00pm – 6:00pm' })}</p>
              <p>
                {t('confessionNote', { fallback: 'Also by appointment through the parish office' })}
              </p>
            </div>

            <img src="/assets/front-office2.jpg" alt="Parish Front Office" className="mass-image" />
          </div>
        </div>

        {/* Slide 2 – Office Hours */}
        <div className="carousel-slide">
          <div className="mass-card">
            <h2>{t('officeHours', { fallback: 'Office Hours' })}</h2>

            <div className="mass-section">
              <h3>{t('mondayFriday', { fallback: 'Monday – Friday' })}</h3>
              <p>{t('officeHoursWeekday', { fallback: '9:00am – 1:00pm | 2:00pm – 5:00pm' })}</p>
              <h3>{t('saturday', { fallback: 'Saturday' })}</h3>
              <p>
                <em>
                  {t('saturdayHours', {
                    fallback: '9:00am – 12:00pm (Closed until further notice)',
                  })}
                </em>
              </p>
              <h3>{t('sunday', { fallback: 'Sunday' })}</h3>
              <p>{t('sundayHours', { fallback: 'CLOSED' })}</p>
            </div>

            <img src="/assets/front-office.jpg" alt="Office Hours" className="mass-image" />
          </div>
        </div>

        {/* Slide 3 – Contact Us */}
        <div className="carousel-slide">
          <div className="mass-card">
            <h2>{t('contactUs', { fallback: 'Contact Us' })}</h2>

            <div className="mass-section">
              <p>380 Smith Street, Perth Amboy, NJ 08861</p>
              <p>{t('parishPhone', { fallback: 'Tel: (732) 442-6634' })}</p>
              <p>{t('parishFax', { fallback: 'Fax: (732) 293-2544' })}</p>
              <p>
                {t('parishEmailMass', { fallback: 'Email: ' })}
                <a href="mailto:olfperthamboy@gmail.com">olfperthamboy@gmail.com</a>
              </p>
            </div>

            <img src="/assets/front-office3.jpg" alt="Contact Office" className="mass-image" />
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Mass;
