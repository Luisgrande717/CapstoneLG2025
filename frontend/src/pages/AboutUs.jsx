// frontend/src/pages/AboutUs.jsx
import './AboutUs.css';
import { useState } from 'react';
import fatimaAboutUsImage from '../assets/fatimaaboutus.webp';
import claretiansAboutUsImage from '../assets/claretiansaboutus.webp';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('our-lady-of-fatima');

  const sections = [
    {
      id: 'our-lady-of-fatima',
      title: 'Our Lady of Fatima',
      content: {
        image: fatimaAboutUsImage,
        text: 'Content about Our Lady of Fatima will be added here...',
        additionalSections: [
          {
            title: 'About Our Parish',
            text: 'Information about Our Lady of Fatima parish will be added here...'
          },
          {
            title: 'Our Mission',
            text: 'Details about our parish mission and values will be added here...'
          }
        ]
      }
    },
    {
      id: 'claretians',
      title: 'Claretians',
      content: {
        image: claretiansAboutUsImage,
        text: 'Content about the Claretians will be added here...',
        additionalSections: [
          {
            title: 'The Claretians',
            text: 'The Claretians (the Missionary Sons of the Immaculate Heart of Mary) are an international Catholic religious congregation of priests, brothers and seminarians. Like our founder, Saint Anthony Mary Claret, we strive to reflect God\'s kingdom of life, love, justice and peace to our world today, responding to the most urgent needs in the most timely and effective way.'
          },
          {
            title: 'Who are the Claretians?',
            text: 'We are a missionary community of the Catholic Church driven by the love of Christ and by the spirit of our founder, Saint Anthony Mary Claret, to:',
            list: [
              'Respond to the most urgent needs in a more effective way.',
              'Strive by all means to reflect God\'s love, especially to the poorest.',
              'Work collaboratively.',
              'Accompany people in difficult times of transition.',
              'Seek spiritual growth in and through social action.',
              'Look to Mary, the Mother of Jesus, with special devotion and inspiration.'
            ]
          }
        ]
      }
    },
    {
      id: 'office-staff',
      title: 'Office Staff',
      content: {
        image: '',
        text: 'Content about the Office Staff will be added here...',
        additionalSections: [
          {
            title: 'Our Team',
            text: 'Information about our office staff will be added here...'
          },
          {
            title: 'Contact Information',
            text: 'Staff contact details and office hours will be added here...'
          }
        ]
      }
    }
  ];

  const currentSection = sections.find(section => section.id === activeSection);

  return (
    <section className="about-us-page">
      {/* Main Content with Side Menu */}
      <div className="about-us-main-content">
        <div className="about-us-container">
          {/* Side Menu */}
          <aside className="about-us-sidebar">
            <nav className="sidebar-nav">
              <h3 className="sidebar-title">About Us</h3>
              <ul className="sidebar-menu">
                {sections.map((section) => (
                  <li key={section.id} className="sidebar-item">
                    <button
                      className={`sidebar-link ${activeSection === section.id ? 'active' : ''}`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="about-us-content">
            <div className="content-section">
              <h2 className="section-title">{currentSection.title}</h2>

              {/* Image Container */}
              <div className="content-image-container">
                {currentSection.content.image ? (
                  <img
                    src={currentSection.content.image}
                    alt={currentSection.title}
                    className="content-image"
                  />
                ) : (
                  <div className="image-placeholder">
                    <div className="placeholder-icon">📷</div>
                    <p className="placeholder-text">Image placeholder for {currentSection.title}</p>
                  </div>
                )}
              </div>

              {/* Main Text Content */}
              <div className="content-text">
                <p>{currentSection.content.text}</p>
              </div>

              {/* Section-Specific Additional Content */}
              <div className="content-sections">
                {currentSection.content.additionalSections.map((additionalSection, index) => (
                  <div key={index} className="content-block">
                    <h4>{additionalSection.title}</h4>
                    <p>{additionalSection.text}</p>
                    {additionalSection.list && (
                      <ul>
                        {additionalSection.list.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
