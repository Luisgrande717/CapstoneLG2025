/**
 * Bulletin Preview Component
 *
 * Eye-catching preview card displaying the current bulletin's first page
 * Serves as a call-to-action to view the full bulletin
 *
 * @module components/BulletinPreview
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './BulletinPreview.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const BulletinPreview = () => {
  const [bulletin, setBulletin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const fetchBulletin = async () => {
      try {
        const response = await fetch(`${API_URL}/api/bulletins/current`);

        if (!response.ok) {
          throw new Error('No bulletin available');
        }

        const data = await response.json();
        setBulletin(data.bulletin);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBulletin();
  }, []);

  // Don't render anything if there's no bulletin
  if (loading || error || !bulletin) {
    return null;
  }

  const bulletinUrl = `${API_URL}/api/bulletins/file/${bulletin.filename}`;

  return (
    <div className="bulletin-preview-container">
      <div className="bulletin-preview-badge">
        <span className="badge-icon">📰</span>
        <span className="badge-text">
          {language === 'es' ? '¡NUEVO BOLETÍN!' : 'NEW BULLETIN!'}
        </span>
      </div>

      <Link to="/bulletin" className="bulletin-preview-card">
        <div className="bulletin-preview-header">
          <h3 className="bulletin-preview-title">
            {language === 'es' ? 'Boletín Semanal' : 'Weekly Bulletin'}
          </h3>
          <p className="bulletin-preview-week">
            {new Date(bulletin.weekOf).toLocaleDateString(
              language === 'es' ? 'es-ES' : 'en-US',
              { month: 'long', day: 'numeric', year: 'numeric' }
            )}
          </p>
        </div>

        <div className="bulletin-preview-thumbnail">
          <div className="bulletin-pdf-wrapper">
            <Document
              file={bulletinUrl}
              loading={
                <div className="bulletin-preview-loading">
                  <div className="loading-spinner-small"></div>
                </div>
              }
              error={
                <div className="bulletin-preview-placeholder">
                  <span className="placeholder-icon">📄</span>
                  <p>{bulletin.title}</p>
                </div>
              }
            >
              <Page
                pageNumber={1}
                width={300}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>

          <div className="bulletin-preview-overlay">
            <div className="preview-overlay-content">
              <span className="overlay-icon">👁️</span>
              <p className="overlay-text">
                {language === 'es' ? 'Ver Boletín' : 'View Bulletin'}
              </p>
            </div>
          </div>
        </div>

        <div className="bulletin-preview-footer">
          <div className="bulletin-info">
            <h4>{bulletin.title}</h4>
            {bulletin.description && (
              <p className="bulletin-description">{bulletin.description}</p>
            )}
          </div>
          <div className="bulletin-cta">
            <span className="cta-text">
              {language === 'es' ? 'Leer Más' : 'Read More'}
            </span>
            <span className="cta-arrow">→</span>
          </div>
        </div>
      </Link>

      <div className="bulletin-preview-pulse"></div>
    </div>
  );
};

export default BulletinPreview;
