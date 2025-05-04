
import { useRef, useState } from 'react';

export default function VoiceRecorder() {
  const mediaRecorder = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.current.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>تسجيل صوتي</h2>
      {isRecording ? (
        <button onClick={stopRecording}>إيقاف</button>
      ) : (
        <button onClick={startRecording}>بدء التسجيل</button>
      )}
      {audioURL && <audio controls src={audioURL} />}
    </div>
  );
}
