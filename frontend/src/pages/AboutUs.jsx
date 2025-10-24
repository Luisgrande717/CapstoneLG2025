// frontend/src/pages/AboutUs.jsx
import './AboutUs.css';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import fatimaAboutUsImage from '../assets/fatimaaboutus.webp';
import claretiansAboutUsImage from '../assets/claretiansaboutus.webp';
import officeAboutUsImage from '../assets/officeAboutUs.webp';

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState('our-lady-of-fatima');
  const { t, language } = useLanguage();

  const sections = [
    {
      id: 'our-lady-of-fatima',
      title: language === 'es' ? 'Nuestra Señora de Fátima' : 'Our Lady of Fatima',
      content: {
        image: fatimaAboutUsImage,
        text: '',
        additionalSections: [
          {
            title: language === 'es' ? 'Acerca de Nuestra Parroquia' : 'About Our Parish',
            text: language === 'es' ? (
              <>
                <p>Antecedentes históricos: En un esfuerzo por brindar asistencia espiritual a las familias de habla hispana recién llegadas de su Diócesis de Trenton, el Obispo William A. Griffin dio la bienvenida a los Misioneros Claretianos a Nueva Jersey en 1945. Los primeros misioneros en llegar, los Padres James Tort, Joaquín de Prada, Severino López y Arthur Valve, trabajaron entre los "braceros" que fueron empleados por las compañías ferroviarias. Cuando los "braceros" se fueron, esos misioneros también se fueron. En octubre de 1947, sin embargo, el Padre Tort reanudó el trabajo misionero en la Diócesis, centrando su actividad en Perth Amboy. Durante la primavera de 1948, el Obispo Griffin autorizó la compra de una casa de dos familias en Laurence St. para usar como Centro de Misión. El P. Tort tomó posesión del edificio que se conocería como la "Misión del Inmaculado Corazón de Nuestra Señora de Fátima" en mayo de 1948. Debido a problemas de salud, el P. Tort tuvo que irse y los P. Andrew Roy y Leo Labrador lo reemplazaron. A medida que creció la población española y comenzaron a llegar inmigrantes de habla portuguesa, se compró una casa vecina y se remodeló para convertirse en el "Club Social Fátima".</p>
                <p>El P. Thomas Maticheck, conocido popularmente como P. Thomas Matin, fue nombrado párroco en 1955. Poco después, el Club Social se convirtió en una pequeña iglesia. En 1958, el P. Matin comenzó a alquilar la antigua Iglesia Ucraniana de la Asunción en Wayne St., llamándola "La Asunción". El celo misionero de los Claretianos se extendió incluso más allá de Perth Amboy hasta el Condado de Ocean, donde se abrieron dos iglesias de misión más bajo el patrocinio de San Antonio Claret, primero en Cassville y luego en Lakewood.</p>
                <p>El primer grupo de Catequistas Misioneras de los Sagrados Corazones de Jesús y María llegó de México en 1958. Se hicieron cargo del programa de educación religiosa para niños y familias. La primera comunidad estaba formada por las Hermanas María Victoria Rodríguez, Rosa de Carmen Castro, Guadalupe Alemán y Josefina Maldonado. En 1960, el P. Matin fue reemplazado por el P. Walter Mischke, como párroco de Fátima, que ahora incluía la Iglesia de la Misión de La Asunción y las dos misiones en el Condado de Ocean. Para entonces, Perth Amboy había experimentado cambios tremendos. La gran afluencia de inmigrantes de Puerto Rico, República Dominicana, Cuba y Portugal había hecho de la Parroquia de Nuestra Señora de Fátima un mosaico de culturas españolas y portuguesas. La Parroquia fue incorporada oficialmente bajo las leyes del Estado de Nueva Jersey en diciembre de 1960, aunque ya había sido erigida canónicamente en 1952.</p>
                <p>Los disturbios raciales estallaron en Perth Amboy en julio de 1966. La intervención del P. Raymond Bianchi, el párroco recién nombrado, fue un factor para restaurar la paz. Durante doce años, el P. Bianchi guió a la comunidad parroquial a través de algunos de sus mayores momentos de crecimiento. Cuando el Departamento de Carreteras decidió demoler la capilla en Laurence Street para dar paso a la carretera 440, el P. Bianchi adquirió un edificio de apartamentos en 348 Smith Street, y el amplio garaje se usó como capilla por un tiempo. El Obispo George Ahr dedicó esta capilla el 10 de marzo de 1968. Este edificio permaneció en uso hasta la dedicación de la nueva Iglesia de Nuestra Señora de Fátima el 18 de septiembre de 1971.</p>
                <p>Por un tiempo, la Parroquia de Nuestra Señora de Fátima sirvió a toda la población hispana y portuguesa, pero a medida que creció la población fue necesario dividir la parroquia. Una escuela perteneciente a la iglesia húngara fue remodelada por el Padre Vidal Martínez y recibió el nombre de Iglesia La Asunción y eventualmente se convirtió en una parroquia. La antigua Iglesia de la Asunción fue rebautizada como Nossa Senhora Do Rosario de Fátima para servir al pueblo portugués. La iglesia en 380 Smith Street conservó el título de Nuestra Señora de Fátima.</p>
                <p>En la actualidad: Nuestra Señora de Fátima continúa ministrando a aproximadamente 1,400 familias, la mayoría de las cuales son de origen hispano. Los números más grandes provienen de República Dominicana, Puerto Rico y México. De hecho, hay personas de prácticamente todas las naciones de América Latina. La parroquia actualmente sirve en capacidad bilingüe (español e inglés) ya que las generaciones más jóvenes (tercera, cuarta generaciones de los primeros inmigrantes) son bilingües o hablan solo en inglés. Consideramos que nuestra misión principal aquí es ofrecer a todos esos inmigrantes una comunidad acogedora donde, en primer lugar, puedan sentirse en casa; en segundo lugar, puedan desarrollar su fe y continuar sus costumbres religiosas católicas, al mismo tiempo que aprenden a aceptar y enriquecerse compartiendo sus vidas con personas de otras culturas y costumbres religiosas.</p>
                <p>El lema de nuestra parroquia es "Muchas Culturas, Solo Una Fe". Aunque tenemos personas de muchas nacionalidades, enfatizamos la necesidad de formar una comunidad unida de fe. La mayoría de los grupos nacionales forman sus propias asociaciones y a través de ellas organizan sus propias celebraciones culturales: Fiesta de su patrona, bailes típicos, canciones, etc. Pero todas esas actividades deben ser actividades parroquiales donde todos están invitados.</p>
              </>
            ) : (
              <>
                <p>A historical background: In an effort to provide spiritual assistance to the newly-arrived Spanish-speaking families of his Diocese of Trenton, Bishop William A. Griffin welcomed the Claretian Missionaries to New Jersey in 1945. The first missionaries to arrive, Frs. James Tort, Joaquín de Prada, Severino López and Arthur Valve, worked among the "braceros" who were employed by the railroad companies. When the "braceros" left, those missionaries also left. In October of 1947, however, Father Tort resumed the missionary work in the Diocese, centering his activity in Perth Amboy. During the spring of 1948, Bishop Griffin authorized the purchase of a two-family house in Laurence St. for use as a Mission Center. Fr. Tort took possession of the building which was to be known as the "Immaculate Heart of Our Lady of Fatima Mission" in May, 1948. Because of ill-health, Fr. Tort had to leave and Frs. Andrew Roy and Leo Labrador replaced him. As the Spanish population grew and Portuguese-speaking immigrants began to arrive a neighboring house was purchased and remodeled to become the ¨Fatima Social Club¨.</p>
                <p>Fr. Thomas Maticheck, popularly known as Fr. Thomas Matin, was named pastor in 1955. Soon afterward, the Social Club was changed into a small church. In 1958, Fr. Matin began to rent the former Ukranian Church of the Assumption on Wayne St., calling it "La Asunción". The missionary zeal of the Claretians extended even beyond Perth Amboy into Ocean County, where two more mission churches were opened under the patronage of St. Anthony Claret., first in Cassville and later in Lakewood.</p>
                <p>The first group of Missionary Catechists of the Sacred Hearts of Jesus and Mary arrived from Mexico in 1958. They took charge of the religious education program for children and families. The first community was made up of Sisters María Victoria Rodríguez, Rosa de Carmen Castro, Guadalupe Alemán and Josefina Maldonado.In 1960, Fr. Matin was replaced y Fr. Walter Mischke, as pastor of Fatima, which now included the Mission Church of La Asunción, and the two missions in Ocean County. By this time Perth Amboy had undergone tremendous changes. The heavy influx of immigrants from Puerto Rico, the Dominican Republic, Cuba and Portugal, had made of Our Lady of Fatima Parish a mosaic of Spanish and Portuguese cultures. The Parish was officially incorporated under the laws of the State of New Jersey in December of 1960, even though it had already been canonically erected in 1952.</p>
                <p>Racial disturbances broke out in Perth Amboy in July of 1966. The intervention of Fr. Raymond Bianchi, the recently appointed pastor, was a factor in restoring peace. For twelve years Fr. Bianchi guided the parish-community through some of its greatest moments of growth. When the Highway Department decided to raze the chapel on Laurence Street to make way for the 440 highway, Fr. Bianchi acquired an apartment building on 348 Smith Street, and the ample garage was used as a chapel for a time. Bishop George Ahr dedicated this chapel on March 10, 1968. This building remained in use until the dedication of the new Our Lady of Fatima Church on September 18, 1971.</p>
                <p>For a time Our Lady of Fatima Parish served all the Hispanic and Portuguese population, but as the population grew it was necessary to split the parish. A school belonging to the Hungarian church was remodeled by Father Vidal Martínez and was given the name of La Asunción Church and eventually became a parish. The old Asunción Church was renamed as Nossa Senhora Do Rosario de Fatima to serve the Portuguese people. The church on 380 Smith Street retained the title of Our Lady of Fatima.</p>
                <p>At present: Our Lady of Fatima continues to minister to a number of about 1,400 families, the majority of which are of Hispanic origin. The larger numbers are from the Dominican Republic, Puerto Rico and Mexico. In fact, there are people from practically every nation of Latin America. The parish presently serves in a bilingual capacity (Spanish and English) since the younger generations (third, fourth generations of the first immigrants) are either bilingually fluent or do speak only in English. We consider that our main mission here is to offer to all those immigrants a welcoming community where, first of all, they can feel at home; secondly, they can develop their faith and continue their Catholic religious customs, at the same time that they learn to accept and be enriched in sharing their lives with peoples of other cultures and religious customs.</p>
                <p>The motto of our parish is "Many Cultures, Only One Faith." Though we have people of many nationalities, we emphasize the need to form a united community of faith. Most national groups form their own associations and through them organize their own cultural celebrations: Feast of their patroness, typical dances, songs, etc. But all of those activities must be parish activities where everyone is invited.</p>
              </>
            )
          },
          {
            title: language === 'es' ? 'Nuestra Misión' : 'Our Mission',
            text: language === 'es' ? (
              <p>Impulsada por la enseñanza social católica, Caridades Católicas, la Parroquia Nuestra Señora de Fátima en Perth Amboy, ofrece servicios de calidad con dignidad y respeto a los pobres, vulnerables y a todas las personas diversas que lo necesitan. La Parroquia de Nuestra Señora de Fátima se asocia con familias y comunidades para mejorar su calidad de vida  /  Driven by Catholic social teaching, Catholic Charities, Our Lady of Fatima Parish Perth Amboy provides quality services with dignity and respect to the poor, vulnerable, and all diverse people in need. Our Lady of Fatima Parish partners with families and communities to improve their quality of life.</p>
            ) : (
              <p>Driven by Catholic social teaching, Catholic Charities, Our Lady of Fatima Parish Perth Amboy provides quality services with dignity and respect to the poor, vulnerable, and all diverse people in need. Our Lady of Fatima Parish partners with families and communities to improve their quality of life  /  Impulsada por la enseñanza social católica, Caridades Católicas, la Parroquia Nuestra Señora de Fátima en Perth Amboy, ofrece servicios de calidad con dignidad y respeto a los pobres, vulnerables y a todas las personas diversas que lo necesitan. La Parroquia de Nuestra Señora de Fátima se asocia con familias y comunidades para mejorar su calidad de vida.</p>
            )
          }
        ]
      }
    },
    {
      id: 'claretians',
      title: language === 'es' ? 'Claretianos' : 'Claretians',
      content: {
        image: claretiansAboutUsImage,
        text: '',
        additionalSections: [
          {
            title: language === 'es' ? 'Los Claretianos' : 'The Claretians',
            text: language === 'es' ?
              'Los Claretianos (los Hijos Misioneros del Inmaculado Corazón de María) son una congregación religiosa católica internacional de sacerdotes, hermanos y seminaristas. Como nuestro fundador, San Antonio María Claret, nos esforzamos por reflejar el reino de vida, amor, justicia y paz de Dios a nuestro mundo de hoy, respondiendo a las necesidades más urgentes de la manera más oportuna y efectiva.' :
              'The Claretians (the Missionary Sons of the Immaculate Heart of Mary) are an international Catholic religious congregation of priests, brothers and seminarians. Like our founder, Saint Anthony Mary Claret, we strive to reflect God\'s kingdom of life, love, justice and peace to our world today, responding to the most urgent needs in the most timely and effective way.'
          },
          {
            title: language === 'es' ? '¿Quiénes son los Claretianos?' : 'Who are the Claretians?',
            text: language === 'es' ? 'Somos una comunidad misionera de la Iglesia Católica impulsada por el amor de Cristo y por el espíritu de nuestro fundador, San Antonio María Claret, para:' : 'We are a missionary community of the Catholic Church driven by the love of Christ and by the spirit of our founder, Saint Anthony Mary Claret, to:',
            list: language === 'es' ? [
              'Responder a las necesidades más urgentes de manera más efectiva.',
              'Esforzarnos por todos los medios para reflejar el amor de Dios, especialmente a los más pobres.',
              'Trabajar colaborativamente.',
              'Acompañar a las personas en momentos difíciles de transición.',
              'Buscar el crecimiento espiritual en y a través de la acción social.',
              'Mirar a María, la Madre de Jesús, con devoción e inspiración especiales.'
            ] : [
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
      title: language === 'es' ? 'Personal de Oficina' : 'Office Staff',
      content: {
        image: officeAboutUsImage,
        text: '',
        additionalSections: [
          {
            title: language === 'es' ? 'Nuestro Equipo' : 'Our Team',
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
            title: language === 'es' ? 'Misioneros Claretianos' : 'Claretian Missionaries',
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
              <h3 className="sidebar-title">{t('AboutUs')}</h3>
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
