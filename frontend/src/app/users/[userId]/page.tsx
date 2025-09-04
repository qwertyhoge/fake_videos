"use client"

import User from "@/type/User";
import Video from "@/type/Video";
import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { generateRandomVideo } from "@/app/lib/generateRandomData";

interface Props{
    params: {userId: string};
}

export default function UserPage(props: Props){
    const [user, setUser] = useState<User | null>(null);
    const [notFoundError, setNotFoundError] = useState<boolean>(false);
    const [ownedVideos, setOwnedVideos] = useState<Video[]>([]);
    const router = useRouter();
    const url = `http://localhost:3000/api/users/${props.params.userId}`;
    
    const fetchData = async () => {
        const res = await fetch(url);
        if(res.status === 404){
            setNotFoundError(true);
        }else{
            const data = await res.json();
            setUser(data);
            const videos = await (await fetch(`${url}/videos`)).json();
            setOwnedVideos(videos);
        }
    };
    
    const handleDelete = async () => {
        const res = await fetch(url, {
            method: 'DELETE'
        });
        if(res.status === 200){
            router.push('/');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if(notFoundError){
        notFound();
    }

    const handleGenerate = async () => {
        const randomVideo = await generateRandomVideo();
        const created = await fetch("http://localhost:3000/api/videos/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                video: randomVideo
            })
        });

        setOwnedVideos([...ownedVideos, await created.json()]);
    };

    return user ? (
        <>
            <Link 
                className="text-blue-500 hover:text-blue-700 hover:border-b"
                href="/">
                Go Back
            </Link>
            <h1 className="text-xl border-b border-black mt-4 p-1">
                {user.name}
            </h1>

            {ownedVideos.length > 0 ? <ul className="m-4">
                {ownedVideos.map(v => {
                    return <li
                        key={v.id}
                        className="m-2 list-disc"
                        >
                        <Link
                            href={`/videos/${v.id}`}
                            className="text-blue-500 hover:text-blue-700 hover:border-b">
                            {v.title}
                        </Link>
                    </li>
                })}
            </ul>
            : "There is no video."}
            
            <button
                className="m-4 p-2 border border-blue-600 bg-blue-500 rounded text-white"
                onClick={handleGenerate}
            >
                Generate a random video
            </button>

            <button
                onClick={handleDelete}
                className="m-4 p-2 bg-red-600 text-white rounded">
                Delete this user
            </button>
        </>
    ): "loading..."
}