/**
 * Bulletin Page Component
 *
 * Displays the current weekly parish bulletin as a PDF flipbook
 * Features responsive design for all devices with page navigation
 *
 * @module pages/Bulletin
 */

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './Bulletin.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const Bulletin = () => {
  const [bulletin, setBulletin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageWidth, setPageWidth] = useState(600);
  const language = localStorage.getItem('language') || 'en';

  // Calculate page width based on screen size
  useEffect(() => {
    const updatePageWidth = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setPageWidth(width - 40); // Mobile: full width minus padding
      } else if (width < 768) {
        setPageWidth(width - 80); // Tablet: with more padding
      } else if (width < 1024) {
        setPageWidth(700); // Medium screens
      } else {
        setPageWidth(800); // Desktop
      }
    };

    updatePageWidth();
    window.addEventListener('resize', updatePageWidth);
    return () => window.removeEventListener('resize', updatePageWidth);
  }, []);

  // Fetch current bulletin
  useEffect(() => {
    const fetchBulletin = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/bulletins/current`);

        if (!response.ok) {
          throw new Error('No bulletin available');
        }

        const data = await response.json();
        setBulletin(data.bulletin);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBulletin();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, numPages));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(numPages);
  };

  if (loading) {
    return (
      <div className="bulletin-page">
        <div className="bulletin-container">
          <div className="bulletin-loading">
            <div className="loading-spinner"></div>
            <p>{language === 'es' ? 'Cargando boletín...' : 'Loading bulletin...'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !bulletin) {
    return (
      <div className="bulletin-page">
        <div className="bulletin-container">
          <div className="bulletin-error">
            <h2>{language === 'es' ? 'Boletín No Disponible' : 'Bulletin Not Available'}</h2>
            <p>
              {language === 'es'
                ? 'Lo sentimos, no hay boletín disponible en este momento. Por favor, vuelva más tarde.'
                : 'Sorry, there is no bulletin available at this time. Please check back later.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const bulletinUrl = `${API_URL}/api/bulletins/file/${bulletin.filename}`;

  return (
    <div className="bulletin-page">
      <div className="bulletin-header">
        <h1>{language === 'es' ? 'Boletín Parroquial' : 'Parish Bulletin'}</h1>
        <div className="bulletin-info">
          <h2>{bulletin.title}</h2>
          {bulletin.description && <p>{bulletin.description}</p>}
          <p className="bulletin-date">
            {language === 'es' ? 'Semana de: ' : 'Week of: '}
            {new Date(bulletin.weekOf).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="bulletin-container">
        <div className="bulletin-viewer">
          <div className="pdf-container">
            <Document
              file={bulletinUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="pdf-loading">
                  <div className="loading-spinner"></div>
                  <p>{language === 'es' ? 'Cargando PDF...' : 'Loading PDF...'}</p>
                </div>
              }
              error={
                <div className="pdf-error">
                  <p>{language === 'es' ? 'Error al cargar el PDF' : 'Error loading PDF'}</p>
                </div>
              }
            >
              <Page
                pageNumber={currentPage}
                width={pageWidth}
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </Document>
          </div>

          {numPages && (
            <div className="bulletin-controls">
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="control-btn first-btn"
                aria-label={language === 'es' ? 'Primera página' : 'First page'}
              >
                ««
              </button>

              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="control-btn prev-btn"
                aria-label={language === 'es' ? 'Página anterior' : 'Previous page'}
              >
                ‹ {language === 'es' ? 'Anterior' : 'Previous'}
              </button>

              <div className="page-info">
                <span>
                  {language === 'es' ? 'Página' : 'Page'} {currentPage} {language === 'es' ? 'de' : 'of'} {numPages}
                </span>
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === numPages}
                className="control-btn next-btn"
                aria-label={language === 'es' ? 'Siguiente página' : 'Next page'}
              >
                {language === 'es' ? 'Siguiente' : 'Next'} ›
              </button>

              <button
                onClick={goToLastPage}
                disabled={currentPage === numPages}
                className="control-btn last-btn"
                aria-label={language === 'es' ? 'Última página' : 'Last page'}
              >
                »»
              </button>
            </div>
          )}

          <div className="bulletin-actions">
            <a
              href={bulletinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn download-btn"
            >
              📥 {language === 'es' ? 'Descargar PDF' : 'Download PDF'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bulletin;
