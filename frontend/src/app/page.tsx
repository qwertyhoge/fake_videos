'use client'

import {useEffect, useState} from 'react';

export default function Home() {
  const [message, setMessage] = useState<string>('');
  
  useEffect(() => {
    fetch('http://localhost:3000/api/v1/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err))
  }, []);

  return (
    <main>
      <h1>Next.js + Rails</h1>
      <p>API Message: {message}</p>
    </main>
  );

}
