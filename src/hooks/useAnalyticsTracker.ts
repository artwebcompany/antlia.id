import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook kustom untuk melacak kunjungan halaman dan mengirimnya ke backend.
 */
export const useAnalyticsTracker = () => {
  const location = useLocation();

  // =========================================================================
  //                  SESUAIKAN URL API ANDA DI SINI
  // =========================================================================
  const API_URL = "http://localhost/antlia-backend/api.php";
  // =========================================================================

  useEffect(() => {
    // Ambil atau buat session ID baru
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('sessionId', sessionId);
    }

    // Fungsi untuk mendapatkan nama browser
    const getBrowserName = () => {
      const userAgent = navigator.userAgent;
      if (userAgent.match(/chrome|chromium|crios/i)) {
        return "Chrome";
      } else if (userAgent.match(/firefox|fxios/i)) {
        return "Firefox";
      } else if (userAgent.match(/safari/i)) {
        return "Safari";
      } else if (userAgent.match(/opr\//i)) {
        return "Opera";
      } else if (userAgent.match(/edg/i)) {
        return "Edge";
      } else {
        return "Unknown";
      }
    };

    // Data yang akan dikirim ke backend
    const trackPageView = async () => {
      const pageUrl = location.pathname;
      const browser = getBrowserName();

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId,
            pageUrl,
            browser,
          }),
        });
        const result = await response.json();
        // Cek hasil respons dari backend, misalnya untuk debugging
        // console.log("Tracking response:", result);
      } catch (error) {
        console.error("Gagal mengirim data tracking:", error);
      }
    };

    trackPageView();
  }, [location.pathname]); // Efek akan dijalankan setiap kali pathname berubah
};
