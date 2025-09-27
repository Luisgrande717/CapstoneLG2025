// frontend/src/pages/AboutUs.jsx
import './AboutUs.css';
import { useState } from 'react';
import fatimaAboutUsImage from '../assets/fatimaaboutus.webp';
import claretiansAboutUsImage from '../assets/claretiansaboutus.webp';
import officeAboutUsImage from '../assets/officeAboutUs.webp';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('our-lady-of-fatima');

  const sections = [
    {
      id: 'our-lady-of-fatima',
      title: 'Our Lady of Fatima',
      content: {
        image: fatimaAboutUsImage,
        text: '',
        additionalSections: [
          {
            title: 'About Our Parish',
            text: <p>A historical background: In an effort to provide spiritual assistance
              to the newly-arrived Spanish-speaking families of his Diocese of Trenton,
              Bishop William A. Griffin welcomed the Claretian Missionaries to New Jersey in 1945.
              The first missionaries to arrive, Frs. James Tort, Joaquín de Prada, Severino López and
              Arthur Valve, worked among the “braceros” who were employed by the railroad companies.
              When the “braceros” left, those missionaries also left.  In October of 1947, however,
              Father Tort resumed the missionary work in the Diocese, centering his activity in
              Perth Amboy.  During the spring of 1948, Bishop Griffin authorized the purchase of a
              two-family house in Laurence St. for use as a Mission Center.
              Fr. Tort took possession of the building which was to be known as the “Immaculate Heart
              of Our Lady of Fatima Mission” in May, 1948.  Because of ill-health, Fr.
              Tort had to leave and Frs. Andrew Roy and Leo Labrador replaced him.
              As the Spanish population grew and Portuguese-speaking immigrants began to arrive a
              neighboring house was purchased and remodeled to become the ¨Fatima Social Club¨.

              <p>
                Fr. Thomas Maticheck, popularly known as Fr. Thomas Matin, was named pastor in 1955.
                Soon afterward, the Social Club was changed into a small church.
                In 1958, Fr. Matin began to rent the former Ukranian Church of the Assumption on Wayne St., calling it “La Asunción”.
                The missionary zeal of the Claretians extended even beyond Perth Amboy into Ocean County, where two more mission churches
                were opened under the patronage of St. Anthony Claret., first in Cassville and later in Lakewood.
              </p>

              <p>The first group of Missionary Catechists of the Sacred Hearts of Jesus and Mary arrived
                from Mexico in 1958.  They took charge of the religious education program for children
                and families. The first community was made up of Sisters María Victoria Rodríguez,
                Rosa de Carmen Castro, Guadalupe Alemán and Josefina Maldonado.In 1960, Fr. Matin was
                replaced y Fr. Walter Mischke, as pastor of Fatima, which now included the Mission
                Church of La Asunción, and the two missions in Ocean County.
                By this time Perth Amboy had undergone tremendous changes.
                The heavy influx of immigrants from Puerto Rico, the Dominican Republic,
                Cuba and Portugal, had made of Our Lady of Fatima Parish a mosaic of Spanish and
                Portuguese cultures.  The Parish was officially incorporated under the laws of the
                State of New Jersey in December of 1960, even though it had already been canonically
                erected in 1952.
              </p>

              <p>
                Racial disturbances broke out in Perth Amboy in July of 1966.
                The intervention of Fr. Raymond Bianchi, the recently appointed pastor, was a factor
                in restoring peace.  For twelve years Fr. Bianchi guided the parish-community through
                some of its greatest moments of growth.  When the Highway Department decided to raze
                the chapel on Laurence Street to make way for the 440 highway,
                Fr. Bianchi acquired an apartment building on 348 Smith Street,
                and the ample garage was used as a chapel for a time.
                Bishop George Ahr dedicated this chapel on March 10, 1968.
                This building remained in use until the dedication of the
                new Our Lady of Fatima Church on September 18, 1971.
              </p>
              <p>
                For a time Our Lady of Fatima Parish served all the Hispanic and Portuguese population,
                but as the population grew it was necessary to split the parish.
                A school belonging to the Hungarian church was remodeled
                by Father Vidal Martínez and was given the name of La Asunción Church and eventually
                became a parish.  The old Asunción Church was renamed as Nossa Senhora
                Do Rosario de Fatima to serve the Portuguese people.
                The church on 380 Smith Street retained the title of Our Lady of Fatima.
              </p>
              <p>
                At present: Our Lady of Fatima continues to minister to a number of about 1,400 families,
                the majority of which are of Hispanic origin.  The larger numbers are from the Dominican Republic,
                Puerto Rico and Mexico. In fact, there are people from practically every nation of Latin America.
                The parish presently serves in a bilingual capacity (Spanish and English)
                since the younger generations (third, fourth generations of the first immigrants)
                are either bilingually fluent or do speak only in English.
                We consider that our main mission here is to offer to all those immigrants a
                welcoming community where, first of all, they can feel at home; secondly,
                they can develop their faith and continue their Catholic religious customs,
                at the same time that they learn to accept and be enriched in sharing their lives
                with peoples of other cultures and religious customs.
              </p>
              <p>
                The motto of our parish is “Many Cultures, Only One Faith.”
                Though we have people of many nationalities, we emphasize the need to form a
                united community of faith.  Most national groups form their own associations
                and through them organize their own cultural celebrations: Feast of their patroness,
                typical dances, songs, etc.  But all of those activities must be parish activities
                where everyone is invited.
              </p>
            </p>

          },
          {
            title: 'Our Mission',
            text: <p>
              Driven by Catholic social teaching, Catholic Charities,
              Our Lady of Fatima Parish Perth Amboy provides quality services with dignity and respect
              to the poor, vulnerable, and all diverse people in need.
              Our Lady of Fatima Parish partners with families and communities to improve their
              quality of life  /  Impulsada por la enseñanza social católica, Caridades Católicas,
              la Parroquia Nuestra Señora de Fátima en Perth Amboy, ofrece servicios de calidad con
              dignidad y respeto a los pobres, vulnerables y a todas las personas diversas que lo
              necesitan. La Parroquia de Nuestra Señora de Fátima se asocia con familias y
              comunidades para mejorar su calidad de vida.
            </p>
          }
        ]
      }
    },
    {
      id: 'claretians',
      title: 'Claretians',
      content: {
        image: claretiansAboutUsImage,
        text: '',
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
        image: officeAboutUsImage,
        text: '',
        additionalSections: [
          {
            title: 'Our Team',
            text: <ul>
              <li>Blanca Martinez (Secretary) Ext- 21</li>

              <li>Rosario Camilo (Secretary) Ext-21</li>

              <li>Laly Calderon (Office Administrator) Ext-21</li>

              <li>Dario Gomez (Maintenance Supervisor)</li>
            </ul>
          },
          {
            title: 'Claretian Missionaries',
            text: <ul>
              <li>Rev. Gilles Njobam, CMF (Pastor)</li>

              <li>Rev. Thomas Mallavarapu, CMF (Associate)</li>

              <li>Rev. Antonio (Tony) Diaz, CMF (In Residence)</li>

              <li>Rev. Alberto Ruiz, CMF (In Residence)</li>
            </ul>
          },

          // {
          //   title: 'Contact Information',
          //   text: 'Staff contact details and office hours will be added here...'
          // }
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
