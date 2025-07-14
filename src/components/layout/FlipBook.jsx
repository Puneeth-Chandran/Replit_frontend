import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import HTMLFlipBook from "react-pageflip";
import { GlobalWorkerOptions, version as pdfjsVersion } from "pdfjs-dist";
import Modal from "react-modal";

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

Modal.setAppElement("#root");

const Flipbook = ({ pdfUrl }) => {
  const [pageImages, setPageImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPDF = async () => {
        setLoading(true);
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;

      const images = [];
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        const imageData = canvas.toDataURL("image/png");
        images.push(imageData);
      }

      setPageImages(images);
      setLoading(false);
    };

    loadPDF();
  }, [pdfUrl]);

  return (
    <div className="flex justify-center items-center mt-8">
    {loading ? (
        <div className="flipbook-loader">
          <div className="spinner"></div>
        </div>
      ) : (
      <HTMLFlipBook
        width={850}
        height={600}
        size="stretch"
        showCover={true}
        mobileScrollSupport={true}
        className="shadow-lg"
        maxShadowOpacity={0.3}
      >
        {pageImages.map((src, i) => (
          <div key={i} className="flip-page">
            <img
              src={src}
              alt={`Page ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </HTMLFlipBook>
      )}
    </div>
  );
};

export default Flipbook;
