import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

class GoogleCalendarService {
  constructor() {
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  setCredentials(tokens) {
    this.oauth2Client.setCredentials(tokens);
  }

  async listEvents(calendarId = 'primary', timeMin = new Date()) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    
    try {
      const response = await calendar.events.list({
        calendarId,
        timeMin: timeMin.toISOString(),
        maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items.map(event => ({
        title: {
          en: event.summary,
          es: event.summary // You might want to implement translation here
        },
        description: {
          en: event.description || '',
          es: event.description || '' // You might want to implement translation here
        },
        startDate: event.start.dateTime || event.start.date,
        endDate: event.end.dateTime || event.end.date,
        startTime: event.start.dateTime ? new Date(event.start.dateTime).toTimeString().slice(0, 5) : '00:00',
        endTime: event.end.dateTime ? new Date(event.end.dateTime).toTimeString().slice(0, 5) : '23:59',
        location: event.location || 'Our Lady of Fatima Parish',
        category: 'Community', // Default category, you might want to map Google Calendar categories
        published: true,
        featured: false,
        googleCalendarEventId: event.id,
        googleCalendarId: calendarId
      }));
    } catch (error) {
      console.error('Error fetching Google Calendar events:', error);
      throw error;
    }
  }

  async addEvent(eventData, calendarId = 'primary') {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    
    const event = {
      summary: eventData.title.en,
      description: eventData.description.en,
      start: {
        dateTime: new Date(eventData.startDate + 'T' + eventData.startTime).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: new Date(eventData.endDate + 'T' + eventData.endTime).toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      location: eventData.location,
    };

    try {
      const response = await calendar.events.insert({
        calendarId,
        resource: event,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding event to Google Calendar:', error);
      throw error;
    }
  }

  getAuthUrl() {
    const scopes = [
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/calendar.readonly'
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });
  }

  async getTokens(code) {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }
}

export default new GoogleCalendarService();