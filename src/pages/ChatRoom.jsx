
import { useState, useEffect } from 'react';

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser') || '';
    const savedMsgs = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    setUser(savedUser);
    setMessages(savedMsgs);
  }, []);

  const sendMessage = () => {
    if (!text || !user) return;
    const newMsg = { user, text, time: new Date().toLocaleTimeString() };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem('chatMessages', JSON.stringify(updated));
    setText('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>الدردشة العامة</h2>
      {!user && (
        <input
          placeholder="اسمك في الدردشة"
          onChange={e => {
            setUser(e.target.value);
            localStorage.setItem('chatUser', e.target.value);
          }}
        />
      )}
      <div style={{ border: '1px solid #ccc', padding: '1rem', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.user}</strong>: {msg.text} <span style={{ fontSize: '0.7rem' }}>({msg.time})</span></div>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="اكتب رسالتك..." />
      <button onClick={sendMessage}>إرسال</button>
    </div>
  );
}
