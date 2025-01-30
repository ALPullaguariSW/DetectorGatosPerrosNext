'use client';

import { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

export default function Home() {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [predictionLabel, setPredictionLabel] = useState('');
  const [predictionColor, setPredictionColor] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  // Cargar el modelo preentrenado
  const loadModel = async () => {
    const loadedModel = await tf.loadLayersModel('../../model/model.json');
    setModel(loadedModel);
  };

  useEffect(() => {
    loadModel();
  }, []);

  // Activar la cámara
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: { facingMode: isFrontCamera ? 'user' : 'environment' }
      };

      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setIsCameraReady(true);
          }
        })
        .catch((error) => {
          console.error('Error accessing the camera', error);
        });
    }
  }, [isFrontCamera]);

  // Redimensionar y preprocesar la imagen
  const preprocessImage = (image) => {
    const resizedImage = tf.image.resizeBilinear(image, [100, 100]);
    const grayscaleImage = resizedImage.mean(2).expandDims(-1); // Convertir a escala de grises
    return grayscaleImage.expandDims(0).toFloat().div(tf.scalar(255));
  };

  // Función para predecir automáticamente cada 150 ms
  const startPrediction = () => {
    setInterval(() => {
      if (model && videoRef.current) {
        const image = tf.browser.fromPixels(videoRef.current);
        const input = preprocessImage(image);
        const result = model.predict(input);

        result.array().then((array) => {
          const isDog = array[0][0] > 0.5;
          setPrediction(array[0]);
          setPredictionLabel(isDog ? 'Perro' : 'Gato');
          setPredictionColor(isDog ? 'rgb(34, 197, 94)' : 'rgb(252, 211, 77)'); // Colores más suaves
        });
      }
    }, 150); // Ejecuta cada 150 milisegundos
  };

  // Ejecutar la predicción y el dibujo
  useEffect(() => {
    if (isCameraReady) {
      startPrediction();
    }
  }, [isCameraReady, model]);

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
      <h1 className="absolute top-5 text-white text-3xl font-semibold text-center w-full">
        Clasificador de Perros y Gatos
      </h1>

      {/* Contenedor para la cámara y los canvas */}
      <div className="relative w-full h-full">
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-xl"
        />

        {/* Canvas para procesamiento */}
        <canvas
          ref={canvasRef}
          width="224"
          height="224"
          className="hidden"
        />
      </div>

      {/* Indicador de predicción en la parte superior derecha */}
      <div
        className="absolute top-5 right-5 p-4 rounded-xl border-4 transition-all duration-300"
        style={{
          borderColor: predictionColor,
          boxShadow: `0 0 15px 4px ${predictionColor}`,
          opacity: predictionLabel ? 1 : 0, // Transición de visibilidad
        }}
      >
        {predictionLabel && (
          <h2 className="text-xl font-bold text-white text-center">
            {`Predicción: ${predictionLabel}`}
          </h2>
        )}
      </div>

      {/* Botón para cambiar cámara */}
      <button
        onClick={() => setIsFrontCamera(!isFrontCamera)}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Cambiar cámara
      </button>
    </div>
  );
}
