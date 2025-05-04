
import { useEffect, useRef, useState } from 'react';

export default function VideoRecorder() {
  const videoRef = useRef(null);
  const mediaRecorder = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  const startRecording = () => {
    const stream = videoRef.current.srcObject;
    const chunks = [];
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    };
    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setRecording(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>تسجيل فيديو</h2>
      <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '500px' }} />
      {recording ? (
        <button onClick={stopRecording}>إيقاف</button>
      ) : (
        <button onClick={startRecording}>بدء</button>
      )}
      {videoURL && <video controls src={videoURL} style={{ width: '100%', marginTop: '1rem' }} />}
    </div>
  );
}
