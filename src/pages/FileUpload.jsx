
import { useState } from 'react';

export default function FileUpload() {
  const [files, setFiles] = useState({
    pdf: [],
    image: [],
    audio: [],
    video: []
  });

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let type = '';
    if (file.type.includes('pdf')) type = 'pdf';
    else if (file.type.includes('image')) type = 'image';
    else if (file.type.includes('audio')) type = 'audio';
    else if (file.type.includes('video')) type = 'video';
    else return;

    const url = URL.createObjectURL(file);
    const updated = { ...files };
    updated[type].push({ name: file.name, url });
    setFiles(updated);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>رفع ملفات الدروس</h2>
      <input type="file" onChange={handleUpload} />
      <hr />
      {['pdf', 'image', 'audio', 'video'].map(cat => (
        <div key={cat}>
          <h3>{cat.toUpperCase()}</h3>
          <ul>
            {files[cat].map((f, i) => (
              <li key={i}><a href={f.url} target="_blank" rel="noreferrer">{f.name}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
