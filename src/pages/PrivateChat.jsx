
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function PrivateChat() {
  const { name } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sender, setSender] = useState('الأستاذ');
  const [lastLength, setLastLength] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const allChats = JSON.parse(localStorage.getItem('privateChats') || '{}');
    const studentMsgs = allChats[name] || [];
    setMessages(studentMsgs);
    setLastLength(studentMsgs.length);
  }, [name]);

  useEffect(() => {
    const interval = setInterval(() => {
      const allChats = JSON.parse(localStorage.getItem('privateChats') || '{}');
      const newMsgs = allChats[name] || [];
      if (newMsgs.length > lastLength) {
        setMessages(newMsgs);
        setLastLength(newMsgs.length);
        if (audioRef.current) audioRef.current.play();
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [lastLength, name]);

  const sendMessage = () => {
    if (!text) return;
    const msg = { sender, text, time: new Date().toLocaleTimeString() };
    const allChats = JSON.parse(localStorage.getItem('privateChats') || '{}');
    const updated = [...(allChats[name] || []), msg];
    allChats[name] = updated;
    setMessages(updated);
    setLastLength(updated.length);
    localStorage.setItem('privateChats', JSON.stringify(allChats));
    setText('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>دردشة خاصة مع: {name}</h2>
      <label>
        أنا:
        <select value={sender} onChange={e => setSender(e.target.value)} style={{ margin: '0 1rem' }}>
          <option value="الأستاذ">الأستاذ</option>
          <option value={name}>{name}</option>
        </select>
      </label>
      <div style={{ border: '1px solid #ccc', padding: '1rem', height: '300px', overflowY: 'scroll', marginTop: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.sender}:</strong> {msg.text}
            <span style={{ fontSize: '0.7rem', marginRight: '1rem' }}>({msg.time})</span>
          </div>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="اكتب رسالتك..." />
      <button onClick={sendMessage}>إرسال</button>
      <audio ref={audioRef} src="https://notificationsounds.com/storage/sounds/file-sounds-1156-pristine.mp3" />
    </div>
  );
}
