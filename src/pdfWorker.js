// src/pdfWorker.js
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import workerUrl from 'pdfjs-dist/build/pdf.worker.entry?url';

if (!GlobalWorkerOptions.workerSrc) {
  GlobalWorkerOptions.workerSrc = workerUrl;
}
