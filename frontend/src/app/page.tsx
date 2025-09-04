'use client'

import Video from '@/type/Video';
import Tag from '@/type/Tag';
import User from '@/type/User';

import {useEffect, useState} from 'react';
import Link from 'next/link';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch(err => console.error(err));

    fetch('http://localhost:3000/api/videos')
      .then(res => res.json())
      .then((data) => {
        const typedData: Video[] = data.map((d: {
          id: number,
          user_id: number,
          title: number,
          tags: Tag[]
        }) => ({...d, userId: d.user_id}));
        setVideos(typedData);
        console.log(typedData);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <main>
      <ul>
      {videos.map((v) => {
        const user = users.find(u => u.id === v.userId);
        console.log(user ? 
            <Link  href={`users/${user.id}`}>{user.name}</Link>: "<unknown user>");

        return (<li key={v.id} className='m-2 list-disc'>
          {<Link 
            className="text-blue-500 hover:text-blue-700 hover:border-b"
            href={`/videos/${v.id}`}>
            {v.title}
          </Link>}
          {v.tags.length > 0 && 
            <span className='text-xs text-gray-500 ml-1'>
              [{v.tags.map(t => t.name).join(', ')}]
            </span>}
          {
            user ? 
            (<>
              <span> - </span>
              <Link 
                className="text-blue-500 hover:text-blue-700 hover:border-b"
                href={`users/${user.id}`}>
                {user.name}
              </Link>
            </>): "<unknown user>"
          }
        </li>
        )
      })}
      </ul>

      <div className="mt-8">
        <Link href="/tags/" className="m-2 text-blue-500 hover:text-blue-700 hover:border-b">
          Tags
        </Link>
        <Link href="/users/" className="m-2 text-blue-500 hover:text-blue-700 hover:border-b">
          Users
        </Link>
      </div>
    </main>
  );

}
