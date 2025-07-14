import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import '../../pdfWorker.js'

const PdfImagePreview = ({ pdfUrl }) => {
  const canvasRef = useRef();

  useEffect(() => {
    let isMounted = true;
  
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
  
        if (!isMounted) return;
  
        const viewport = page.getViewport({ scale: 1.0, rotation: 0 });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
  
        await page.render({ canvasContext: context, viewport }).promise;
      } catch (err) {
        console.error('Failed to render PDF preview:', err);
      }
    };
  
    loadPdf();
  
    return () => {
      isMounted = false;
    };
  }, [pdfUrl]);
  

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '80%',
        borderRadius: '8px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default PdfImagePreview;