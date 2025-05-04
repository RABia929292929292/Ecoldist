
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const studentName = form.firstName.trim();
    if (!studentName) return;
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    if (!students.includes(studentName)) {
      students.push(studentName);
      localStorage.setItem('students', JSON.stringify(students));
    }
    const records = JSON.parse(localStorage.getItem('records') || '{}');
    records[studentName] = {
      ...form,
      hifdh: '',
      review: '',
      hadir: [],
      payment: [],
      paymentMonth: ''
    };
    localStorage.setItem('records', JSON.stringify(records));
    navigate('/student/' + studentName);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>تسجيل طالب جديد</h2>
      <input name="firstName" placeholder="الاسم" onChange={handleChange} />
      <br /><br />
      <input name="lastName" placeholder="اللقب" onChange={handleChange} />
      <br /><br />
      <input name="email" placeholder="الجيميل" onChange={handleChange} />
      <br /><br />
      <input name="birthDate" type="date" onChange={handleChange} />
      <br /><br />
      <input name="address" placeholder="العنوان" onChange={handleChange} />
      <br /><br />
      <button onClick={handleSubmit}>تسجيل</button>
    </div>
  );
}
