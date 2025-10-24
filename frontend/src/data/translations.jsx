/**
 * Translation Data for Bilingual Parish Website
 *
 * Centralized translation management for English and Spanish
 * Organized by feature areas for better maintainability
 *
 * @version 2.0.0
 */

export const translations = {
  en: {
    // Parish branding
    parishName: 'Our Lady of Fatima',
    logoAlt: 'Our Lady of Fatima Parish Logo',

    // Navigation
    nav: {
      home: 'Home',
      mass: 'Mass Times',
      events: 'Events',
      readings: 'Daily Readings',
      sacraments: 'Sacraments',
      aboutUs: 'About Us',
      donate: 'Donate',
    },

    // Common UI elements
    toggleMenu: 'Toggle navigation menu',
    toggleLanguage: 'Switch to Spanish',
    loading: 'Loading...',
    error: 'An error occurred',
    tryAgain: 'Try Again',
    goHome: 'Go Home',
    readMore: 'Read More',

    // Homepage
    welcome: 'Welcome to Our Parish',
    heroTitle: 'Welcome to Our Lady of Fatima Parish',
    heroSubtitle: '"Many Cultures, One Faith"',
    quickAccess: 'Quick Access',

    // Hero Section Buttons
    massTimesBtn: 'Mass Times',
    eventsBtn: 'Events',
    donateBtn: 'Donate',

    // Quick Access Cards
    sacraments: 'Sacraments',
    sacramentsDesc: 'Learn about Baptism, Communion, and Confirmation.',
    aboutUs: 'About Us',
    aboutUsDesc: 'Learn about our diverse community and faith.',
    dailyReadingsCard: 'Daily Readings',
    dailyReadingsDesc: "Reflect on today's scripture.",
    donateCard: 'Donate',
    donateDesc: "Support our parish's mission.",

    // Events Carousel
    upcomingEventsTitle: 'Upcoming Events',
    communityRosary: 'Community Rosary',
    communityRosaryDate: 'July 20, 2025',
    communityRosaryTime: '7:00 PM',
    communityRosaryDesc: 'Join us in prayer and fellowship every Thursday evening.',
    youthRetreat: 'Youth Retreat',
    youthRetreatDate: 'August 2–4, 2025',
    youthRetreatTime: 'All Day',
    youthRetreatDesc: 'A weekend of spiritual renewal for teens and young adults.',
    backToSchool: 'Back-to-School Blessing',
    backToSchoolDate: 'August 18, 2025',
    backToSchoolTime: '11:00 AM Mass',
    backToSchoolDesc: "We'll celebrate and pray for students as the new year begins.",

    // Footer
    parishAddress: '380 Smith Street, Perth Amboy, NJ',
    massTimesFooter: 'Office Hours Mon - Fri 9:00am - 01:00pm (01:00pm - 02:00pm Lunch) 02:00pm - 05:00pm:: Sat 09:00am - 12:00pm • Sun CLOSED',
    connect: 'Connect',
    emailLabel: 'Email: olfperthamboy@gmail.com',
    phoneLabel: 'Phone: (732) 442-6634',
    stayConnected: 'Stay Connected',
    emailRequired: 'Email is required',
    subscribing: 'Subscribing...',
    subscriptionError: 'Failed to subscribe. Please try again.',

    // Admin System
    admin: {
      login: {
        title: 'Admin Login',
        subtitle: 'Parish Administration Portal',
        loading: 'Loading...',
        labels: {
          credential: 'Email or Username',
          password: 'Password'
        },
        placeholders: {
          credential: 'Enter your email or username',
          password: 'Enter your password'
        },
        buttons: {
          sign_in: 'Sign In',
          signing_in: 'Signing In...'
        },
        footer: {
          authorized: 'Authorized Personnel Only',
          contact: 'For access, contact the parish office'
        },
        errors: {
          credentialRequired: 'Email or username is required',
          passwordRequired: 'Password is required',
          passwordTooShort: 'Password must be at least 6 characters',
          loginFailed: 'Login failed. Please check your credentials.',
          serverError: 'Server error. Please try again later.'
        }
      },
      dashboard: {
        title: 'Parish Admin',
        welcome: 'Welcome back, {{name}}!',
        subtitle: 'Manage parish events and content from your dashboard.',
        loading: 'Loading statistics...',
        logout: {
          title: 'Logout',
          button: 'Logout',
          confirm: 'Are you sure you want to logout?'
        },
        tabs: {
          overview: 'Overview',
          events: 'Events',
          calendar: 'Calendar',
          profile: 'Profile'
        },
        stats: {
          total: 'Total Events',
          published: 'Published',
          upcoming: 'Upcoming',
          drafts: 'Drafts'
        },
        quickActions: 'Quick Actions',
        actions: {
          createEvent: 'Create Event',
          manageEvents: 'Manage Events',
          viewCalendar: 'View Calendar'
        },
        profile: {
          title: 'Profile Settings',
          name: 'Full Name',
          email: 'Email',
          role: 'Role',
          lastLogin: 'Last Login',
          editProfile: 'Edit Profile',
          changePassword: 'Change Password'
        },
        calendar: {
          title: 'Event Calendar',
          coming_soon: 'Calendar management coming soon...'
        }
      },
      events: {
        title: 'Event Management',
        loading: 'Loading events...',
        createNew: 'Create Event',
        search: 'Search events...',
        saved: 'Event saved successfully!',
        error: 'Error saving event. Please try again.',
        deleted: 'Event deleted successfully!',
        deleteError: 'Error deleting event. Please try again.',
        deleteConfirm: 'Are you sure you want to delete this event?',
        noEvents: 'No events found.',
        filters: {
          all: 'All',
          published: 'Published',
          draft: 'Draft',
          upcoming: 'Upcoming'
        },
        form: {
          title: 'Title',
          description: 'Description',
          startDate: 'Start Date',
          endDate: 'End Date',
          startTime: 'Start Time',
          endTime: 'End Time',
          category: 'Category',
          location: 'Location',
          contact: 'Contact Information',
          published: 'Published',
          featured: 'Featured',
          registration: 'Registration Required',
          cancel: 'Cancel',
          create: 'Create Event',
          update: 'Update Event'
        },
        createEvent: 'Create New Event',
        editEvent: 'Edit Event'
      }
    },
    emailPlaceholder: 'Your email',
    subscribe: 'Subscribe',
    copyright: '© 2025 Our Lady of Fatima. All rights reserved.',

    // Mass times
    massSchedule: 'Mass Schedule',
    weekdayMass: 'Weekday Mass',
    weekendMass: 'Weekend Mass',
    officeHours: 'Office Hours',
    contactUs: 'Contact Us',

    // Mass Page Content
    daily: 'Daily',
    saturday: 'Saturday',
    sunday: 'Sunday',
    confessions: 'Confessions',
    confessionTime: 'Saturday: 5:00pm – 6:00pm',
    confessionNote: 'Also by appointment through the parish office',
    mondayFriday: 'Monday – Friday',
    officeHoursWeekday: '9:00am – 1:00pm | 2:00pm – 5:00pm',
    saturdayHours: '9:00am – 12:00pm (Closed until further notice)',
    sundayHours: 'CLOSED',
    parishPhone: 'Tel: (732) 442-6634',
    parishFax: 'Fax: (732) 293-2544',
    parishEmailMass: 'Email: olfperthamboy@gmail.com',

    // Events
    upcomingEvents: 'Upcoming Events',
    eventDetails: 'Event Details',
    events: {
      title: 'Events Calendar',
      loading: 'Loading events...',
      retry: 'Try Again',
      eventsOn: 'Events on {{date}}',
      time: 'Time:',
      location: 'Location:',
      category: 'Category:',
      contact: 'Contact:',
      registrationRequired: 'Registration Required',
      noEvents: 'No events scheduled for this day.',
      upcomingEvents: 'All Upcoming Events'
    },

    // Readings
    dailyReadings: 'Daily Scripture Readings',
    todaysReading: "Today's Reading",

    // Footer
    contactInfo: 'Contact Information',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',

    // Forms
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    required: 'Required field',

    // About Us Page
    aboutUsPage: {
      title: 'About Us',
      sections: {
        ourLadyOfFatima: 'Our Lady of Fatima',
        claretians: 'Claretians',
        officeStaff: 'Office Staff'
      },
      ourLadyOfFatima: {
        aboutParish: 'About Our Parish',
        historyIntro: 'A historical background: In an effort to provide spiritual assistance to the newly-arrived Spanish-speaking families of his Diocese of Trenton, Bishop William A. Griffin welcomed the Claretian Missionaries to New Jersey in 1945. The first missionaries to arrive, Frs. James Tort, Joaquín de Prada, Severino López and Arthur Valve, worked among the "braceros" who were employed by the railroad companies. When the "braceros" left, those missionaries also left. In October of 1947, however, Father Tort resumed the missionary work in the Diocese, centering his activity in Perth Amboy. During the spring of 1948, Bishop Griffin authorized the purchase of a two-family house in Laurence St. for use as a Mission Center. Fr. Tort took possession of the building which was to be known as the "Immaculate Heart of Our Lady of Fatima Mission" in May, 1948. Because of ill-health, Fr. Tort had to leave and Frs. Andrew Roy and Leo Labrador replaced him. As the Spanish population grew and Portuguese-speaking immigrants began to arrive a neighboring house was purchased and remodeled to become the ¨Fatima Social Club¨.',
        parishGrowth: 'Fr. Thomas Maticheck, popularly known as Fr. Thomas Matin, was named pastor in 1955. Soon afterward, the Social Club was changed into a small church. In 1958, Fr. Matin began to rent the former Ukranian Church of the Assumption on Wayne St., calling it "La Asunción". The missionary zeal of the Claretians extended even beyond Perth Amboy into Ocean County, where two more mission churches were opened under the patronage of St. Anthony Claret., first in Cassville and later in Lakewood.',
        missionaryCatechists: 'The first group of Missionary Catechists of the Sacred Hearts of Jesus and Mary arrived from Mexico in 1958. They took charge of the religious education program for children and families. The first community was made up of Sisters María Victoria Rodríguez, Rosa de Carmen Castro, Guadalupe Alemán and Josefina Maldonado.In 1960, Fr. Matin was replaced y Fr. Walter Mischke, as pastor of Fatima, which now included the Mission Church of La Asunción, and the two missions in Ocean County. By this time Perth Amboy had undergone tremendous changes. The heavy influx of immigrants from Puerto Rico, the Dominican Republic, Cuba and Portugal, had made of Our Lady of Fatima Parish a mosaic of Spanish and Portuguese cultures. The Parish was officially incorporated under the laws of the State of New Jersey in December of 1960, even though it had already been canonically erected in 1952.',
        challengesAndGrowth: 'Racial disturbances broke out in Perth Amboy in July of 1966. The intervention of Fr. Raymond Bianchi, the recently appointed pastor, was a factor in restoring peace. For twelve years Fr. Bianchi guided the parish-community through some of its greatest moments of growth. When the Highway Department decided to raze the chapel on Laurence Street to make way for the 440 highway, Fr. Bianchi acquired an apartment building on 348 Smith Street, and the ample garage was used as a chapel for a time. Bishop George Ahr dedicated this chapel on March 10, 1968. This building remained in use until the dedication of the new Our Lady of Fatima Church on September 18, 1971.',
        parishDivision: 'For a time Our Lady of Fatima Parish served all the Hispanic and Portuguese population, but as the population grew it was necessary to split the parish. A school belonging to the Hungarian church was remodeled by Father Vidal Martínez and was given the name of La Asunción Church and eventually became a parish. The old Asunción Church was renamed as Nossa Senhora Do Rosario de Fatima to serve the Portuguese people. The church on 380 Smith Street retained the title of Our Lady of Fatima.',
        presentDay: 'At present: Our Lady of Fatima continues to minister to a number of about 1,400 families, the majority of which are of Hispanic origin. The larger numbers are from the Dominican Republic, Puerto Rico and Mexico. In fact, there are people from practically every nation of Latin America. The parish presently serves in a bilingual capacity (Spanish and English) since the younger generations (third, fourth generations of the first immigrants) are either bilingually fluent or do speak only in English. We consider that our main mission here is to offer to all those immigrants a welcoming community where, first of all, they can feel at home; secondly, they can develop their faith and continue their Catholic religious customs, at the same time that they learn to accept and be enriched in sharing their lives with peoples of other cultures and religious customs.',
        parishMotto: 'The motto of our parish is "Many Cultures, Only One Faith." Though we have people of many nationalities, we emphasize the need to form a united community of faith. Most national groups form their own associations and through them organize their own cultural celebrations: Feast of their patroness, typical dances, songs, etc. But all of those activities must be parish activities where everyone is invited.',
        ourMission: 'Our Mission',
        missionText: 'Driven by Catholic social teaching, Catholic Charities, Our Lady of Fatima Parish Perth Amboy provides quality services with dignity and respect to the poor, vulnerable, and all diverse people in need. Our Lady of Fatima Parish partners with families and communities to improve their quality of life  /  Impulsada por la enseñanza social católica, Caridades Católicas, la Parroquia Nuestra Señora de Fátima en Perth Amboy, ofrece servicios de calidad con dignidad y respeto a los pobres, vulnerables y a todas las personas diversas que lo necesitan. La Parroquia de Nuestra Señora de Fátima se asocia con familias y comunidades para mejorar su calidad de vida.'
      },
      claretians: {
        title: 'The Claretians',
        description: 'The Claretians (the Missionary Sons of the Immaculate Heart of Mary) are an international Catholic religious congregation of priests, brothers and seminarians. Like our founder, Saint Anthony Mary Claret, we strive to reflect God\'s kingdom of life, love, justice and peace to our world today, responding to the most urgent needs in the most timely and effective way.',
        whoWeAre: 'Who are the Claretians?',
        whoWeAreText: 'We are a missionary community of the Catholic Church driven by the love of Christ and by the spirit of our founder, Saint Anthony Mary Claret, to:',
        mission1: 'Respond to the most urgent needs in a more effective way.',
        mission2: 'Strive by all means to reflect God\'s love, especially to the poorest.',
        mission3: 'Work collaboratively.',
        mission4: 'Accompany people in difficult times of transition.',
        mission5: 'Seek spiritual growth in and through social action.',
        mission6: 'Look to Mary, the Mother of Jesus, with special devotion and inspiration.'
      },
      officeStaff: {
        ourTeam: 'Our Team',
        claretiansTitle: 'Claretian Missionaries'
      }
    },
  },

  es: {
    // Parish branding
    parishName: 'Nuestra Señora de Fátima',
    logoAlt: 'Logo de la Parroquia Nuestra Señora de Fátima',

    // Navigation
    nav: {
      home: 'Inicio',
      mass: 'Horarios de Misa',
      events: 'Eventos',
      readings: 'Lecturas Diarias',
      sacraments: 'Sacramentos',
      aboutUs: 'Acerca de Nosotros',
      donate: 'Donar',
    },

    // Common UI elements
    toggleMenu: 'Alternar menú de navegación',
    toggleLanguage: 'Cambiar a inglés',
    loading: 'Cargando...',
    error: 'Ocurrió un error',
    tryAgain: 'Intentar de Nuevo',
    goHome: 'Ir al Inicio',
    readMore: 'Leer Más',

    // Homepage
    welcome: 'Bienvenido a Nuestra Parroquia',
    heroTitle: 'Bienvenidos a la Parroquia Nuestra Señora de Fátima',
    heroSubtitle: '"Muchas Culturas, Una Fe"',
    quickAccess: 'Acceso Rápido',

    // Hero Section Buttons
    massTimesBtn: 'Horarios de Misa',
    eventsBtn: 'Eventos',
    donateBtn: 'Donar',

    // Quick Access Cards
    sacraments: 'Sacramentos',
    sacramentsDesc: 'Aprende sobre Bautismo, Comunión y Confirmación.',
    aboutUs: 'Acerca de Nosotros',
    aboutUsDesc: 'Conoce nuestra diversa comunidad y fe.',
    dailyReadingsCard: 'Lecturas Diarias',
    dailyReadingsDesc: 'Reflexiona sobre las escrituras de hoy.',
    donateCard: 'Donar',
    donateDesc: 'Apoya la misión de nuestra parroquia.',

    // Events Carousel
    upcomingEventsTitle: 'Próximos Eventos',
    communityRosary: 'Rosario Comunitario',
    communityRosaryDate: '20 de Julio, 2025',
    communityRosaryTime: '7:00 PM',
    communityRosaryDesc: 'Únete a nosotros en oración y hermandad cada jueves por la noche.',
    youthRetreat: 'Retiro Juvenil',
    youthRetreatDate: '2–4 de Agosto, 2025',
    youthRetreatTime: 'Todo el Día',
    youthRetreatDesc:
      'Un fin de semana de renovación espiritual para adolescentes y adultos jóvenes.',
    backToSchool: 'Bendición de Regreso a Clases',
    backToSchoolDate: '18 de Agosto, 2025',
    backToSchoolTime: 'Misa de 11:00 AM',
    backToSchoolDesc: 'Celebraremos y oraremos por los estudiantes al comenzar el nuevo año.',

    // Footer
    parishAddress: '380 Smith Street, Perth Amboy, NJ',
    massTimesFooter: 'Horario de Oficina: Lun - Vie 9:00am - 01:00pm (01:00pm - 02:00pm Almuerzo) 02:00pm - 05:00pm:: Sáb 09:00am - 12:00pm • Dom CERRADO',
    connect: 'Conectar',
    emailLabel: 'Correo: olfperthamboy@gmail.com',
    phoneLabel: 'Teléfono: (732) 442-6634',
    stayConnected: 'Mantente Conectado',
    emailPlaceholder: 'Tu correo electrónico',
    subscribe: 'Suscribirse',
    emailRequired: 'El correo es requerido',
    subscribing: 'Suscribiendo...',
    subscriptionError: 'Error al suscribirse. Inténtelo de nuevo.',
    copyright: '© 2025 Nuestra Señora de Fátima. Todos los derechos reservados.',

    // Mass times
    massSchedule: 'Horario de Misas',
    weekdayMass: 'Misa Entre Semana',
    weekendMass: 'Misa de Fin de Semana',
    officeHours: 'Horarios de Oficina',
    contactUs: 'Contáctenos',

    // Mass Page Content
    daily: 'Diario',
    saturday: 'Sábado',
    sunday: 'Domingo',
    confessions: 'Confesiones',
    confessionTime: 'Sábado: 5:00pm – 6:00pm',
    confessionNote: 'También por cita a través de la oficina parroquial',
    mondayFriday: 'Lunes – Viernes',
    officeHoursWeekday: '9:00am – 1:00pm | 2:00pm – 5:00pm',
    saturdayHours: '9:00am – 12:00pm (Cerrado hasta nuevo aviso)',
    sundayHours: 'CERRADO',
    parishPhone: 'Tel: (732) 442-6634',
    parishFax: 'Fax: (732) 293-2544',
    parishEmailMass: 'Correo: olfperthamboy@gmail.com',

    // Events
    upcomingEvents: 'Próximos Eventos',
    eventDetails: 'Detalles del Evento',
    events: {
      title: 'Calendario de Eventos',
      loading: 'Cargando eventos...',
      retry: 'Intentar de Nuevo',
      eventsOn: 'Eventos el {{date}}',
      time: 'Hora:',
      location: 'Ubicación:',
      category: 'Categoría:',
      contact: 'Contacto:',
      registrationRequired: 'Registro Requerido',
      noEvents: 'No hay eventos programados para este día.',
      upcomingEvents: 'Todos los Próximos Eventos'
    },

    // Readings
    dailyReadings: 'Lecturas Bíblicas Diarias',
    todaysReading: 'Lectura de Hoy',

    // Footer
    contactInfo: 'Información de Contacto',
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Correo Electrónico',

    // Forms
    submit: 'Enviar',
    cancel: 'Cancelar',
    save: 'Guardar',
    required: 'Campo requerido',

    // About Us Page (Spanish)
    aboutUsPage: {
      title: 'Acerca de Nosotros',
      sections: {
        ourLadyOfFatima: 'Nuestra Señora de Fátima',
        claretians: 'Claretianos',
        officeStaff: 'Personal de Oficina'
      },
      ourLadyOfFatima: {
        aboutParish: 'Acerca de Nuestra Parroquia',
        historyIntro: 'Antecedentes históricos: En un esfuerzo por brindar asistencia espiritual a las familias de habla hispana recién llegadas de su Diócesis de Trenton, el Obispo William A. Griffin dio la bienvenida a los Misioneros Claretianos a Nueva Jersey en 1945. Los primeros misioneros en llegar, los Padres James Tort, Joaquín de Prada, Severino López y Arthur Valve, trabajaron entre los "braceros" que fueron empleados por las compañías ferroviarias. Cuando los "braceros" se fueron, esos misioneros también se fueron. En octubre de 1947, sin embargo, el Padre Tort reanudó el trabajo misionero en la Diócesis, centrando su actividad en Perth Amboy. Durante la primavera de 1948, el Obispo Griffin autorizó la compra de una casa de dos familias en Laurence St. para usar como Centro de Misión. El P. Tort tomó posesión del edificio que se conocería como la "Misión del Inmaculado Corazón de Nuestra Señora de Fátima" en mayo de 1948. Debido a problemas de salud, el P. Tort tuvo que irse y los P. Andrew Roy y Leo Labrador lo reemplazaron. A medida que creció la población española y comenzaron a llegar inmigrantes de habla portuguesa, se compró una casa vecina y se remodeló para convertirse en el "Club Social Fátima".',
        parishGrowth: 'El P. Thomas Maticheck, conocido popularmente como P. Thomas Matin, fue nombrado párroco en 1955. Poco después, el Club Social se convirtió en una pequeña iglesia. En 1958, el P. Matin comenzó a alquilar la antigua Iglesia Ucraniana de la Asunción en Wayne St., llamándola "La Asunción". El celo misionero de los Claretianos se extendió incluso más allá de Perth Amboy hasta el Condado de Ocean, donde se abrieron dos iglesias de misión más bajo el patrocinio de San Antonio Claret, primero en Cassville y luego en Lakewood.',
        missionaryCatechists: 'El primer grupo de Catequistas Misioneras de los Sagrados Corazones de Jesús y María llegó de México en 1958. Se hicieron cargo del programa de educación religiosa para niños y familias. La primera comunidad estaba formada por las Hermanas María Victoria Rodríguez, Rosa de Carmen Castro, Guadalupe Alemán y Josefina Maldonado. En 1960, el P. Matin fue reemplazado por el P. Walter Mischke, como párroco de Fátima, que ahora incluía la Iglesia de la Misión de La Asunción y las dos misiones en el Condado de Ocean. Para entonces, Perth Amboy había experimentado cambios tremendos. La gran afluencia de inmigrantes de Puerto Rico, República Dominicana, Cuba y Portugal había hecho de la Parroquia de Nuestra Señora de Fátima un mosaico de culturas españolas y portuguesas. La Parroquia fue incorporada oficialmente bajo las leyes del Estado de Nueva Jersey en diciembre de 1960, aunque ya había sido erigida canónicamente en 1952.',
        challengesAndGrowth: 'Los disturbios raciales estallaron en Perth Amboy en julio de 1966. La intervención del P. Raymond Bianchi, el párroco recién nombrado, fue un factor para restaurar la paz. Durante doce años, el P. Bianchi guió a la comunidad parroquial a través de algunos de sus mayores momentos de crecimiento. Cuando el Departamento de Carreteras decidió demoler la capilla en Laurence Street para dar paso a la carretera 440, el P. Bianchi adquirió un edificio de apartamentos en 348 Smith Street, y el amplio garaje se usó como capilla por un tiempo. El Obispo George Ahr dedicó esta capilla el 10 de marzo de 1968. Este edificio permaneció en uso hasta la dedicación de la nueva Iglesia de Nuestra Señora de Fátima el 18 de septiembre de 1971.',
        parishDivision: 'Por un tiempo, la Parroquia de Nuestra Señora de Fátima sirvió a toda la población hispana y portuguesa, pero a medida que creció la población fue necesario dividir la parroquia. Una escuela perteneciente a la iglesia húngara fue remodelada por el Padre Vidal Martínez y recibió el nombre de Iglesia La Asunción y eventualmente se convirtió en una parroquia. La antigua Iglesia de la Asunción fue rebautizada como Nossa Senhora Do Rosario de Fátima para servir al pueblo portugués. La iglesia en 380 Smith Street conservó el título de Nuestra Señora de Fátima.',
        presentDay: 'En la actualidad: Nuestra Señora de Fátima continúa ministrando a aproximadamente 1,400 familias, la mayoría de las cuales son de origen hispano. Los números más grandes provienen de República Dominicana, Puerto Rico y México. De hecho, hay personas de prácticamente todas las naciones de América Latina. La parroquia actualmente sirve en capacidad bilingüe (español e inglés) ya que las generaciones más jóvenes (tercera, cuarta generaciones de los primeros inmigrantes) son bilingües o hablan solo en inglés. Consideramos que nuestra misión principal aquí es ofrecer a todos esos inmigrantes una comunidad acogedora donde, en primer lugar, puedan sentirse en casa; en segundo lugar, puedan desarrollar su fe y continuar sus costumbres religiosas católicas, al mismo tiempo que aprenden a aceptar y enriquecerse compartiendo sus vidas con personas de otras culturas y costumbres religiosas.',
        parishMotto: 'El lema de nuestra parroquia es "Muchas Culturas, Solo Una Fe". Aunque tenemos personas de muchas nacionalidades, enfatizamos la necesidad de formar una comunidad unida de fe. La mayoría de los grupos nacionales forman sus propias asociaciones y a través de ellas organizan sus propias celebraciones culturales: Fiesta de su patrona, bailes típicos, canciones, etc. Pero todas esas actividades deben ser actividades parroquiales donde todos están invitados.',
        ourMission: 'Nuestra Misión',
        missionText: 'Impulsada por la enseñanza social católica, Caridades Católicas, la Parroquia Nuestra Señora de Fátima en Perth Amboy, ofrece servicios de calidad con dignidad y respeto a los pobres, vulnerables y a todas las personas diversas que lo necesitan. La Parroquia de Nuestra Señora de Fátima se asocia con familias y comunidades para mejorar su calidad de vida  /  Driven by Catholic social teaching, Catholic Charities, Our Lady of Fatima Parish Perth Amboy provides quality services with dignity and respect to the poor, vulnerable, and all diverse people in need. Our Lady of Fatima Parish partners with families and communities to improve their quality of life.'
      },
      claretians: {
        title: 'Los Claretianos',
        description: 'Los Claretianos (los Hijos Misioneros del Inmaculado Corazón de María) son una congregación religiosa católica internacional de sacerdotes, hermanos y seminaristas. Como nuestro fundador, San Antonio María Claret, nos esforzamos por reflejar el reino de vida, amor, justicia y paz de Dios a nuestro mundo de hoy, respondiendo a las necesidades más urgentes de la manera más oportuna y efectiva.',
        whoWeAre: '¿Quiénes son los Claretianos?',
        whoWeAreText: 'Somos una comunidad misionera de la Iglesia Católica impulsada por el amor de Cristo y por el espíritu de nuestro fundador, San Antonio María Claret, para:',
        mission1: 'Responder a las necesidades más urgentes de manera más efectiva.',
        mission2: 'Esforzarnos por todos los medios para reflejar el amor de Dios, especialmente a los más pobres.',
        mission3: 'Trabajar colaborativamente.',
        mission4: 'Acompañar a las personas en momentos difíciles de transición.',
        mission5: 'Buscar el crecimiento espiritual en y a través de la acción social.',
        mission6: 'Mirar a María, la Madre de Jesús, con devoción e inspiración especiales.'
      },
      officeStaff: {
        ourTeam: 'Nuestro Equipo',
        claretiansTitle: 'Misioneros Claretianos'
      }
    },

    // Admin System (Spanish)
    admin: {
      login: {
        title: 'Inicio de Sesión Admin',
        subtitle: 'Portal de Administración Parroquial',
        loading: 'Cargando...',
        labels: {
          credential: 'Correo o Usuario',
          password: 'Contraseña'
        },
        placeholders: {
          credential: 'Ingrese su correo o usuario',
          password: 'Ingrese su contraseña'
        },
        buttons: {
          sign_in: 'Iniciar Sesión',
          signing_in: 'Iniciando Sesión...'
        },
        footer: {
          authorized: 'Solo Personal Autorizado',
          contact: 'Para acceso, contacte la oficina parroquial'
        },
        errors: {
          credentialRequired: 'Correo o usuario es requerido',
          passwordRequired: 'Contraseña es requerida',
          passwordTooShort: 'La contraseña debe tener al menos 6 caracteres',
          loginFailed: 'Inicio de sesión falló. Verifique sus credenciales.',
          serverError: 'Error del servidor. Intente de nuevo más tarde.'
        }
      },
      dashboard: {
        title: 'Admin Parroquial',
        welcome: '¡Bienvenido de vuelta, {{name}}!',
        subtitle: 'Administre eventos y contenido parroquial desde su panel.',
        loading: 'Cargando estadísticas...',
        logout: {
          title: 'Cerrar Sesión',
          button: 'Cerrar Sesión',
          confirm: '¿Está seguro que desea cerrar sesión?'
        },
        tabs: {
          overview: 'Resumen',
          events: 'Eventos',
          calendar: 'Calendario',
          profile: 'Perfil'
        },
        stats: {
          total: 'Total de Eventos',
          published: 'Publicados',
          upcoming: 'Próximos',
          drafts: 'Borradores'
        },
        quickActions: 'Acciones Rápidas',
        actions: {
          createEvent: 'Crear Evento',
          manageEvents: 'Administrar Eventos',
          viewCalendar: 'Ver Calendario'
        },
        profile: {
          title: 'Configuración de Perfil',
          name: 'Nombre Completo',
          email: 'Correo',
          role: 'Rol',
          lastLogin: 'Último Inicio de Sesión',
          editProfile: 'Editar Perfil',
          changePassword: 'Cambiar Contraseña'
        },
        calendar: {
          title: 'Calendario de Eventos',
          coming_soon: 'Administración de calendario próximamente...'
        }
      },
      events: {
        title: 'Administración de Eventos',
        loading: 'Cargando eventos...',
        createNew: 'Crear Evento',
        search: 'Buscar eventos...',
        saved: '¡Evento guardado exitosamente!',
        error: 'Error guardando evento. Intente de nuevo.',
        deleted: '¡Evento eliminado exitosamente!',
        deleteError: 'Error eliminando evento. Intente de nuevo.',
        deleteConfirm: '¿Está seguro que desea eliminar este evento?',
        noEvents: 'No se encontraron eventos.',
        filters: {
          all: 'Todos',
          published: 'Publicados',
          draft: 'Borradores',
          upcoming: 'Próximos'
        },
        form: {
          title: 'Título',
          description: 'Descripción',
          startDate: 'Fecha de Inicio',
          endDate: 'Fecha de Fin',
          startTime: 'Hora de Inicio',
          endTime: 'Hora de Fin',
          category: 'Categoría',
          location: 'Ubicación',
          contact: 'Información de Contacto',
          published: 'Publicado',
          featured: 'Destacado',
          registration: 'Registro Requerido',
          cancel: 'Cancelar',
          create: 'Crear Evento',
          update: 'Actualizar Evento'
        },
        createEvent: 'Crear Nuevo Evento',
        editEvent: 'Editar Evento'
      }
    },
  },
};
