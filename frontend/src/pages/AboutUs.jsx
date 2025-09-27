// frontend/src/pages/AboutUs.jsx
import './AboutUs.css';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import fatimaAboutUsImage from '../assets/fatimaaboutus.webp';
import claretiansAboutUsImage from '../assets/claretiansaboutus.webp';
import officeAboutUsImage from '../assets/officeAboutUs.webp';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('our-lady-of-fatima');
  const { t } = useLanguage();

  const sections = [
    {
      id: 'our-lady-of-fatima',
      title: t('aboutUsPage.sections.ourLadyOfFatima'),
      content: {
        image: fatimaAboutUsImage,
        text: '',
        additionalSections: [
          {
            title: t('aboutUsPage.ourLadyOfFatima.aboutParish'),
            text: (
              <>
                <p>{t('aboutUsPage.ourLadyOfFatima.historyIntro')}</p>
                <p>{t('aboutUsPage.ourLadyOfFatima.parishGrowth')}</p>
                <p>{t('aboutUsPage.ourLadyOfFatima.missionaryCatechists')}</p>
                <p>{t('aboutUsPage.ourLadyOfFatima.challengesAndGrowth')}</p>
                <p>{t('aboutUsPage.ourLadyOfFatima.parishDivision')}</p>
                <p>{t('aboutUsPage.ourLadyOfFatima.presentDay')}</p>
                <p>{t('aboutUsPage.ourLadyOfFatima.parishMotto')}</p>
              </>
            )
          },
          {
            title: t('aboutUsPage.ourLadyOfFatima.ourMission'),
            text: <p>{t('aboutUsPage.ourLadyOfFatima.missionText')}</p>
          }
        ]
      }
    },
    {
      id: 'claretians',
      title: t('aboutUsPage.sections.claretians'),
      content: {
        image: claretiansAboutUsImage,
        text: '',
        additionalSections: [
          {
            title: t('aboutUsPage.claretians.title'),
            text: t('aboutUsPage.claretians.description')
          },
          {
            title: t('aboutUsPage.claretians.whoWeAre'),
            text: t('aboutUsPage.claretians.whoWeAreText'),
            list: [
              t('aboutUsPage.claretians.mission1'),
              t('aboutUsPage.claretians.mission2'),
              t('aboutUsPage.claretians.mission3'),
              t('aboutUsPage.claretians.mission4'),
              t('aboutUsPage.claretians.mission5'),
              t('aboutUsPage.claretians.mission6')
            ]
          }
        ]
      }
    },
    {
      id: 'office-staff',
      title: t('aboutUsPage.sections.officeStaff'),
      content: {
        image: officeAboutUsImage,
        text: '',
        additionalSections: [
          {
            title: t('aboutUsPage.officeStaff.ourTeam'),
            text: (
              <ul>
                <li>Blanca Martinez (Secretary) Ext- 21</li>
                <li>Rosario Camilo (Secretary) Ext-21</li>
                <li>Laly Calderon (Office Administrator) Ext-21</li>
                <li>Dario Gomez (Maintenance Supervisor)</li>
              </ul>
            )
          },
          {
            title: t('aboutUsPage.officeStaff.claretiansTitle'),
            text: (
              <ul>
                <li>Rev. Gilles Njobam, CMF (Pastor)</li>
                <li>Rev. Thomas Mallavarapu, CMF (Associate)</li>
                <li>Rev. Antonio (Tony) Diaz, CMF (In Residence)</li>
                <li>Rev. Alberto Ruiz, CMF (In Residence)</li>
              </ul>
            )
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
              <h3 className="sidebar-title">{t('aboutUsPage.title')}</h3>
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
