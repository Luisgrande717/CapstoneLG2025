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
      volunteer: 'Volunteer',
      donate: 'Donate',
      login: 'Member Login',
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
    volunteer: 'Volunteer',
    volunteerDesc: 'Get involved and make a difference.',
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
    parishAddress: '123 Smith Street, Perth Amboy, NJ',
    massTimesFooter: 'Mass Times: Sat 5PM • Sun 9AM & 11AM',
    connect: 'Connect',
    emailLabel: 'Email: contact@yourparish.org',
    phoneLabel: 'Phone: (732) 555-1234',
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
      volunteer: 'Voluntario',
      donate: 'Donar',
      login: 'Acceso de Miembro',
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
    volunteer: 'Voluntario',
    volunteerDesc: 'Involúcrate y marca la diferencia.',
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
    parishAddress: '123 Smith Street, Perth Amboy, NJ',
    massTimesFooter: 'Horarios de Misa: Sáb 5PM • Dom 9AM y 11AM',
    connect: 'Conectar',
    emailLabel: 'Correo: contact@yourparish.org',
    phoneLabel: 'Teléfono: (732) 555-1234',
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
