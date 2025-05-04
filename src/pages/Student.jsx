
import { Link, useParams } from 'react-router-dom';

export default function Student() {
  const { name } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>مرحبًا {name}</h2>
      <ul style={{ lineHeight: '2rem' }}>
        <li><Link to={"/dashboard/" + name}>سجل الحفظ والمراجعة</Link></li>
        <li><Link to={"/dashboard/" + name}>جدول الحضور والاشتراك</Link></li>
        <li><Link to="/chat">الدردشة العامة</Link></li>
        <li><Link to={"/private-chat/" + name}>دردشة مع الأستاذ</Link></li>
        <li><Link to="/record">تسجيل صوتي</Link></li>
        <li><Link to="/video">تسجيل فيديو</Link></li>
        <li><Link to="/files">عرض وتحميل ملفات الدروس</Link></li>
      </ul>
    </div>
  );
}
