"use client"

import User from "@/type/User";
import Video from "@/type/Video";
import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props{
    params: {userId: string};
}

export default function UserPage(props: Props){
    const [user, setUser] = useState<User | null>(null);
    const [notFoundError, setNotFoundError] = useState<boolean>(false);
    const [ownedVideos, setOwnedVideos] = useState<Video[]>([]);
    
    const fetchData = async () => {
        const res = await fetch(`http://localhost:3000/api/users/${props.params.userId}`);
        if(res.status === 404){
            setNotFoundError(true);
        }else{
            const data = await res.json();
            setUser(data);
            const videos = await (await fetch(`http://localhost:3000/api/users/${props.params.userId}/videos`)).json();
            setOwnedVideos(videos);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if(notFoundError){
        notFound();
    }

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
            >
                Generate a random video
            </button>
        </>
    ): "loading..."
}