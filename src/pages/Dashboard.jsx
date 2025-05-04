
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { name } = useParams();
  const [records, setRecords] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('records') || '{}');
    setRecords(saved[name] || {
      hifdh: '',
      review: '',
      hadir: [],
      payment: [],
      paymentMonth: ''
    });
  }, [name]);

  const updateField = (field, value) => {
    const all = JSON.parse(localStorage.getItem('records') || '{}');
    const updated = {
      ...records,
      [field]: value
    };
    all[name] = updated;
    setRecords(updated);
    localStorage.setItem('records', JSON.stringify(all));
  };

  const addToArray = (field) => {
    const date = new Date().toLocaleDateString();
    updateField(field, [...records[field], date]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>بيانات الطالب: {name}</h2>
      <textarea value={records.hifdh} onChange={e => updateField('hifdh', e.target.value)} placeholder="المحفوظ" style={{ width: '100%', height: '60px' }} />
      <br /><br />
      <textarea value={records.review} onChange={e => updateField('review', e.target.value)} placeholder="المراجعة" style={{ width: '100%', height: '60px' }} />
      <br /><br />
      <input value={records.paymentMonth} onChange={e => updateField('paymentMonth', e.target.value)} placeholder="اسم الشهر المسدد" />
      <br /><br />
      <button onClick={() => addToArray('hadir')}>تسجيل حضور</button>
      <button onClick={() => addToArray('payment')}>تسجيل تسديد</button>

      <h3>جدول الحضور</h3>
      <table border="1" cellPadding="5">
        <thead><tr><th>#</th><th>التاريخ</th></tr></thead>
        <tbody>
          {records.hadir?.map((d, i) => (
            <tr key={i}><td>{i+1}</td><td>{d}</td></tr>
          ))}
        </tbody>
      </table>

      <h3>جدول التسديد</h3>
      <table border="1" cellPadding="5">
        <thead><tr><th>#</th><th>التاريخ</th></tr></thead>
        <tbody>
          {records.payment?.map((d, i) => (
            <tr key={i}><td>{i+1}</td><td>{d}</td></tr>
          ))}
        </tbody>
      </table>
      <p>الشهر: <strong>{records.paymentMonth}</strong></p>
    </div>
  );
}
