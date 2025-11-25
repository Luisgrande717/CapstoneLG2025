/**
 * Sacraments Page Component
 *
 * Displays information about the seven sacraments with tabbed navigation
 * Similar design to AboutUs page with sidebar menu
 *
 * @author Parish Development Team
 * @version 2.0.0
 */

import './Sacraments.css';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Sacraments = () => {
  const [activeSacrament, setActiveSacrament] = useState('baptism');
  const { t, language } = useLanguage();

  const sacraments = [
    {
      id: 'baptism',
      title: language === 'es' ? 'Bautismo' : 'Baptism',
      icon: '💧',
      content: {
        description: language === 'es'
          ? 'El Bautismo es el primer sacramento de iniciación cristiana y la puerta de entrada a la vida en Cristo y la Iglesia.'
          : 'Baptism is the first sacrament of Christian initiation and the doorway to life in Christ and the Church.',
        sections: [
          {
            title: language === 'es' ? 'Acerca del Bautismo' : 'About Baptism',
            text: language === 'es'
              ? 'El Bautismo es el primer paso en un viaje de fe de por vida. A través del agua y el Espíritu Santo, nos convertimos en hijos e hijas de Dios y miembros del Cuerpo de Cristo, la Iglesia.'
              : 'Baptism is the first step in a lifelong journey of faith. Through water and the Holy Spirit, we become children of God and members of the Body of Christ, the Church.'
          },
          {
            title: language === 'es' ? 'Preparación' : 'Preparation',
            text: language === 'es'
              ? 'Ofrecemos ceremonias para bebés y clases de preparación para padres y padrinos. Las clases cubren el significado del sacramento, las responsabilidades de los padres y padrinos, y la importancia de criar a los niños en la fe católica.'
              : 'We offer ceremonies for infants and preparation classes for parents and godparents. Classes cover the meaning of the sacrament, responsibilities of parents and godparents, and the importance of raising children in the Catholic faith.'
          },
          {
            title: language === 'es' ? 'Requisitos' : 'Requirements',
            list: language === 'es' ? [
              'Certificado de nacimiento del niño',
              'Padres y padrinos deben ser católicos practicantes',
              'Los padrinos deben haber recibido los sacramentos de Bautismo, Confirmación y Eucaristía',
              'Asistir a la clase de preparación pre-bautismal',
              'Completar el formulario de registro'
            ] : [
              'Child\'s birth certificate',
              'Parents and godparents must be practicing Catholics',
              'Godparents must have received the sacraments of Baptism, Confirmation, and Eucharist',
              'Attend pre-baptismal preparation class',
              'Complete registration form'
            ]
          },
          {
            title: language === 'es' ? 'Información de Contacto' : 'Contact Information',
            text: language === 'es'
              ? 'Para programar un bautismo o inscribirse en las clases de preparación, por favor contacte a la oficina parroquial al (732) 442-6634 o visite durante el horario de oficina.'
              : 'To schedule a baptism or enroll in preparation classes, please contact the parish office at (732) 442-6634 or visit during office hours.'
          }
        ]
      }
    },
    {
      id: 'reconciliation',
      title: language === 'es' ? 'Reconciliación (Confesión)' : 'Reconciliation (Confession)',
      icon: '✝️',
      content: {
        description: language === 'es'
          ? 'El Sacramento de la Reconciliación es el sacramento de sanación espiritual donde recibimos el perdón de Dios por nuestros pecados.'
          : 'The Sacrament of Reconciliation is the sacrament of spiritual healing where we receive God\'s forgiveness for our sins.',
        sections: [
          {
            title: language === 'es' ? 'Acerca de la Reconciliación' : 'About Reconciliation',
            text: language === 'es'
              ? 'También conocida como Confesión o Penitencia, este sacramento nos permite experimentar la misericordia de Dios y ser reconciliados con Él y con la Iglesia.'
              : 'Also known as Confession or Penance, this sacrament allows us to experience God\'s mercy and be reconciled with Him and the Church.'
          },
          {
            title: language === 'es' ? 'Horario de Confesiones' : 'Confession Schedule',
            text: language === 'es'
              ? 'Las confesiones están disponibles todos los sábados de 4:00 PM a 4:45 PM, o con cita previa llamando a la oficina parroquial.'
              : 'Confessions are available every Saturday from 4:00 PM to 4:45 PM, or by appointment by calling the parish office.'
          },
          {
            title: language === 'es' ? 'Primera Confesión' : 'First Confession',
            text: language === 'es'
              ? 'Los niños generalmente reciben su Primera Confesión en segundo grado como parte de su preparación para la Primera Comunión. Las clases de educación religiosa preparan a los niños para este sacramento.'
              : 'Children typically receive their First Confession in second grade as part of their preparation for First Communion. Religious education classes prepare children for this sacrament.'
          }
        ]
      }
    },
    {
      id: 'eucharist',
      title: language === 'es' ? 'Eucaristía (Primera Comunión)' : 'Eucharist (First Communion)',
      icon: '🍞',
      content: {
        description: language === 'es'
          ? 'La Eucaristía es la fuente y cumbre de la vida cristiana, donde recibimos el Cuerpo y la Sangre de Cristo.'
          : 'The Eucharist is the source and summit of Christian life, where we receive the Body and Blood of Christ.',
        sections: [
          {
            title: language === 'es' ? 'Acerca de la Primera Comunión' : 'About First Communion',
            text: language === 'es'
              ? 'Los niños generalmente reciben la Primera Comunión alrededor de los 7-8 años después de completar la educación religiosa. Nuestros catequistas ayudan a preparar tanto los corazones como las mentes.'
              : 'Children typically receive First Communion around age 7-8 after completing religious education. Our catechists help prepare both hearts and minds.'
          },
          {
            title: language === 'es' ? 'Programa de Preparación' : 'Preparation Program',
            text: language === 'es'
              ? 'El programa de preparación para la Primera Comunión incluye educación religiosa, aprendizaje de oraciones, estudio de la Misa y el significado de la Eucaristía. Los padres también participan en la preparación de sus hijos.'
              : 'The First Communion preparation program includes religious education, learning prayers, studying the Mass and the meaning of the Eucharist. Parents also participate in preparing their children.'
          },
          {
            title: language === 'es' ? 'Requisitos' : 'Requirements',
            list: language === 'es' ? [
              'Estar bautizado en la Iglesia Católica',
              'Completar al menos dos años de educación religiosa',
              'Haber recibido el Sacramento de la Reconciliación',
              'Asistencia regular a Misa',
              'Participación de los padres en sesiones de preparación'
            ] : [
              'Be baptized in the Catholic Church',
              'Complete at least two years of religious education',
              'Have received the Sacrament of Reconciliation',
              'Regular Mass attendance',
              'Parent participation in preparation sessions'
            ]
          }
        ]
      }
    },
    {
      id: 'confirmation',
      title: language === 'es' ? 'Confirmación' : 'Confirmation',
      icon: '🕊️',
      content: {
        description: language === 'es'
          ? 'La Confirmación completa la iniciación cristiana y fortalece nuestra fe a través de los dones del Espíritu Santo.'
          : 'Confirmation completes Christian initiation and strengthens our faith through the gifts of the Holy Spirit.',
        sections: [
          {
            title: language === 'es' ? 'Acerca de la Confirmación' : 'About Confirmation',
            text: language === 'es'
              ? 'La Confirmación completa la iniciación en la Iglesia. Nuestro programa apoya a jóvenes y adultos en abrazar su madurez espiritual a través del estudio, servicio y oración.'
              : 'Confirmation completes initiation into the Church. Our program supports youth and adults in embracing their spiritual maturity through study, service, and prayer.'
          },
          {
            title: language === 'es' ? 'Programa para Jóvenes' : 'Youth Program',
            text: language === 'es'
              ? 'El programa de Confirmación para jóvenes generalmente comienza en el grado 9 o 10 e incluye clases, retiros, servicio comunitario y preparación espiritual. Los candidatos eligen un santo patrón y un padrino para acompañarlos en su jornada.'
              : 'The Confirmation program for youth typically begins in grade 9 or 10 and includes classes, retreats, community service, and spiritual preparation. Candidates choose a patron saint and sponsor to accompany them on their journey.'
          },
          {
            title: language === 'es' ? 'Confirmación de Adultos (RCIA)' : 'Adult Confirmation (RCIA)',
            text: language === 'es'
              ? 'Los adultos que no han sido confirmados pueden unirse a nuestro programa RCIA (Rito de Iniciación Cristiana para Adultos). Este programa ofrece instrucción integral en la fe católica y preparación para los sacramentos.'
              : 'Adults who have not been confirmed can join our RCIA program (Rite of Christian Initiation for Adults). This program provides comprehensive instruction in the Catholic faith and preparation for the sacraments.'
          }
        ]
      }
    },
    {
      id: 'matrimony',
      title: language === 'es' ? 'Matrimonio' : 'Matrimony',
      icon: '💑',
      content: {
        description: language === 'es'
          ? 'El Matrimonio es un sacramento de amor y compromiso que une a un hombre y una mujer en una alianza sagrada.'
          : 'Matrimony is a sacrament of love and commitment that unites a man and woman in a sacred covenant.',
        sections: [
          {
            title: language === 'es' ? 'Acerca del Matrimonio' : 'About Matrimony',
            text: language === 'es'
              ? 'El Sacramento del Matrimonio es un don de Dios que establece un vínculo permanente entre esposos. A través de este sacramento, la pareja recibe la gracia para amarse mutuamente como Cristo ama a la Iglesia.'
              : 'The Sacrament of Matrimony is a gift from God that establishes a permanent bond between spouses. Through this sacrament, the couple receives the grace to love each other as Christ loves the Church.'
          },
          {
            title: language === 'es' ? 'Preparación Matrimonial' : 'Marriage Preparation',
            text: language === 'es'
              ? 'Las parejas deben contactar a la parroquia al menos 6 meses antes de la fecha deseada de la boda. La preparación incluye sesiones de Pre-Cana, inventario de compatibilidad y reuniones con el sacerdote celebrante.'
              : 'Couples should contact the parish at least 6 months before the desired wedding date. Preparation includes Pre-Cana sessions, compatibility inventory, and meetings with the celebrating priest.'
          },
          {
            title: language === 'es' ? 'Requisitos' : 'Requirements',
            list: language === 'es' ? [
              'Al menos un miembro de la pareja debe ser católico bautizado',
              'Certificados de bautismo recientes (emitidos dentro de los 6 meses)',
              'Asistir al programa de preparación matrimonial Pre-Cana',
              'Completar el inventario FOCCUS u otra herramienta de evaluación',
              'Libertad para casarse (no estar casado anteriormente, o anulación aprobada)',
              'Reservar la fecha con 6 meses de anticipación'
            ] : [
              'At least one member of the couple must be a baptized Catholic',
              'Recent baptism certificates (issued within 6 months)',
              'Attend Pre-Cana marriage preparation program',
              'Complete FOCCUS inventory or other assessment tool',
              'Freedom to marry (not previously married, or approved annulment)',
              'Book date 6 months in advance'
            ]
          }
        ]
      }
    },
    {
      id: 'holy-orders',
      title: language === 'es' ? 'Orden Sagrado' : 'Holy Orders',
      icon: '📿',
      content: {
        description: language === 'es'
          ? 'El Orden Sagrado es el sacramento a través del cual los hombres son ordenados como obispos, sacerdotes o diáconos para servir a la Iglesia.'
          : 'Holy Orders is the sacrament through which men are ordained as bishops, priests, or deacons to serve the Church.',
        sections: [
          {
            title: language === 'es' ? 'Acerca del Orden Sagrado' : 'About Holy Orders',
            text: language === 'es'
              ? 'El Sacramento del Orden Sagrado confiere un carácter espiritual permanente y faculta a los ordenados para actuar en la persona de Cristo como cabeza de la Iglesia.'
              : 'The Sacrament of Holy Orders confers a permanent spiritual character and empowers the ordained to act in the person of Christ as head of the Church.'
          },
          {
            title: language === 'es' ? 'Vocación Sacerdotal' : 'Priestly Vocation',
            text: language === 'es'
              ? 'Si sientes un llamado al sacerdocio o al diaconado, te invitamos a hablar con nuestro párroco o el director vocacional de la diócesis. El discernimiento vocacional es un proceso de oración y reflexión.'
              : 'If you feel called to the priesthood or diaconate, we invite you to speak with our pastor or the diocesan vocation director. Vocational discernment is a process of prayer and reflection.'
          },
          {
            title: language === 'es' ? 'Información de Contacto' : 'Contact Information',
            text: language === 'es'
              ? 'Para más información sobre vocaciones al sacerdocio o diaconado, contacte la Oficina Vocacional de la Diócesis de Metuchen o hable con el Padre Gilles después de la Misa.'
              : 'For more information about vocations to the priesthood or diaconate, contact the Vocation Office of the Diocese of Metuchen or speak with Father Gilles after Mass.'
          }
        ]
      }
    },
    {
      id: 'anointing',
      title: language === 'es' ? 'Unción de los Enfermos' : 'Anointing of the Sick',
      icon: '🙏',
      content: {
        description: language === 'es'
          ? 'La Unción de los Enfermos es un sacramento de sanación para quienes están gravemente enfermos o enfrentan cirugía mayor.'
          : 'Anointing of the Sick is a sacrament of healing for those who are seriously ill or facing major surgery.',
        sections: [
          {
            title: language === 'es' ? 'Acerca de la Unción' : 'About Anointing',
            text: language === 'es'
              ? 'Este sacramento proporciona fortaleza espiritual, paz y valor para soportar las dificultades de la enfermedad o vejez. A través de la unción con óleo sagrado y oración, el enfermo recibe la gracia sanadora de Cristo.'
              : 'This sacrament provides spiritual strength, peace, and courage to endure the difficulties of illness or old age. Through anointing with holy oil and prayer, the sick person receives Christ\'s healing grace.'
          },
          {
            title: language === 'es' ? 'Cuándo Solicitar' : 'When to Request',
            text: language === 'es'
              ? 'El sacramento puede recibirse en caso de enfermedad grave, antes de cirugía mayor, o cuando la salud se deteriora significativamente debido a la edad avanzada. Puede administrarse repetidamente si la condición empeora.'
              : 'The sacrament may be received in cases of serious illness, before major surgery, or when health deteriorates significantly due to advanced age. It can be administered repeatedly if the condition worsens.'
          },
          {
            title: language === 'es' ? 'Cómo Solicitar' : 'How to Request',
            text: language === 'es'
              ? 'Para solicitar la Unción de los Enfermos, por favor contacte la oficina parroquial al (732) 442-6634. Para emergencias después del horario de oficina, llame al mismo número y siga las instrucciones para emergencias.'
              : 'To request Anointing of the Sick, please contact the parish office at (732) 442-6634. For after-hours emergencies, call the same number and follow the prompts for emergencies.'
          },
          {
            title: language === 'es' ? 'Visitas a Hospitales y Hogares' : 'Hospital and Home Visits',
            text: language === 'es'
              ? 'Nuestros sacerdotes están disponibles para visitar enfermos en hospitales y hogares. También ofrecemos Comunión para los confinados en casa. Por favor, notifíquenos si un miembro de la familia está hospitalizado o no puede asistir a Misa.'
              : 'Our priests are available to visit the sick in hospitals and homes. We also offer Communion for the homebound. Please notify us if a family member is hospitalized or unable to attend Mass.'
          }
        ]
      }
    }
  ];

  const currentSacrament = sacraments.find(s => s.id === activeSacrament);

  return (
    <section className="sacraments-page">
      {/* Main Content with Side Menu */}
      <div className="sacraments-main-content">
        <div className="sacraments-container">
          {/* Side Menu */}
          <aside className="sacraments-sidebar">
            <nav className="sidebar-nav">
              <h3 className="sidebar-title">
                {language === 'es' ? 'Los Sacramentos' : 'The Sacraments'}
              </h3>
              <ul className="sidebar-menu">
                {sacraments.map((sacrament) => (
                  <li key={sacrament.id} className="sidebar-item">
                    <button
                      className={`sidebar-link ${activeSacrament === sacrament.id ? 'active' : ''}`}
                      onClick={() => setActiveSacrament(sacrament.id)}
                    >
                      <span className="sacrament-icon">{sacrament.icon}</span>
                      {sacrament.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="sacraments-content">
            <div className="content-section">
              <h2 className="section-title">
                <span className="title-icon">{currentSacrament.icon}</span>
                {currentSacrament.title}
              </h2>

              {/* Description */}
              <div className="sacrament-description">
                <p>{currentSacrament.content.description}</p>
              </div>

              {/* Section-Specific Content */}
              <div className="content-sections">
                {currentSacrament.content.sections.map((section, index) => (
                  <div key={index} className="content-block">
                    <h4>{section.title}</h4>
                    <p>{section.text}</p>
                    {section.list && (
                      <ul className="requirements-list">
                        {section.list.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="contact-cta">
                <p>
                  {language === 'es'
                    ? '¿Tiene preguntas? Contacte nuestra oficina parroquial:'
                    : 'Have questions? Contact our parish office:'}
                </p>
                <div className="contact-info">
                  <p>📞 (732) 442-6634</p>
                  <p>📧 olfperthamboy@gmail.com</p>
                  <p>📍 380 Smith Street, Perth Amboy, NJ</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Sacraments;
