import React, { useState, useEffect } from 'react';

// Check for Web Speech API support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  alert("Your browser does not support the Web Speech API. Please try Google Chrome or Microsoft Edge.");
}

const App = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          finalTranscript += result[0].transcript;
        }
        setTranscript(finalTranscript);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error detected: " + event.error);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Speech to Text Converter</h1>
      <div style={{ margin: '20px 0' }}>
        <button onClick={startListening} disabled={isListening} style={{ padding: '10px 20px', marginRight: '10px' }}>
          Start Listening
        </button>
        <button onClick={stopListening} disabled={!isListening} style={{ padding: '10px 20px' }}>
          Stop Listening
        </button>
      </div>
      <textarea
        value={transcript}
        placeholder="Your speech will appear here..."
        rows="10"
        readOnly
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          resize: 'none'
        }}
      />
    </div>
  );
};

export default App;
