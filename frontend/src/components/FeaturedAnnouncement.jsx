/**
 * Featured Announcement Component
 * Displays active parish flyer/announcement on homepage
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import './FeaturedAnnouncement.css';

const FeaturedAnnouncement = () => {
  const { t, language } = useLanguage();
  const [announcement, setAnnouncement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActiveAnnouncement();
  }, []);

  const fetchActiveAnnouncement = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/announcements/active');
      setAnnouncement(response.data.data);
    } catch (error) {
      console.error('Error fetching announcement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !announcement) return null;

  const getFileUrl = (url) => 'http://localhost:8080' + url;

  return (
    <section className="featured-announcement">
      <div className="announcement-container">
        <h2 className="announcement-header">
          {t('announcement.title', { fallback: 'Special Announcement' })}
        </h2>
        <div className="announcement-content">
          <div className="announcement-text">
            <h3>{announcement.title[language] || announcement.title.en}</h3>
            {announcement.description[language] && (
              <p>{announcement.description[language] || announcement.description.en}</p>
            )}
          </div>
          <div className="announcement-file">
            {announcement.fileType === 'image' ? (
              <img
                src={getFileUrl(announcement.fileUrl)}
                alt={announcement.title[language] || announcement.title.en}
                className="announcement-image"
              />
            ) : (
              <div className="file-download">
                <div className="file-icon">
                  {announcement.fileType === 'pdf' && '📄'}
                  {announcement.fileType === 'doc' && '📝'}
                  {announcement.fileType === 'docx' && '📝'}
                </div>
                <a
                  href={getFileUrl(announcement.fileUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-link"
                >
                  {t('announcement.download', { fallback: 'Download Flyer' })}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAnnouncement;
