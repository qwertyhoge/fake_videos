"use client"

import Video from "@/type/Video";
import User from "@/type/User";
import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";

interface Props{
    params: {videoId: string};
}

export default function UserPage(props: Props){
    const [video, setVideo] = useState<Video | null>(null);
    const [uploader, setUploader] = useState<User | null>(null);
    const [notFoundError, setNotFoundError] = useState<boolean>(false);
    const router = useRouter();
    
    const url = `http://localhost:3000/api/videos/${props.params.videoId}`;

    const fetchData = async () => {
        const res = await fetch(url);
        if(res.status === 404){
            setNotFoundError(true);
        }else{
            const data = await res.json();
            setVideo(data);
            const user = await (await fetch(`http://localhost:3000/api/users/${data?.user_id}`)).json();
            setUploader(user);
        }
    };


    const handleLikes = async (newRate: number) => {
        if(!video){
            return;
        }

        const updateRate = async (newRate: number) => { 
            const res = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        video: {
                            title: video.title,
                            length: video.length,
                            user_id: video.userId,
                            rate: newRate,
                            tag_ids: video.tags.map(t => t.id)
                        }
                    })
                });

            return res;
        }
        const res = await updateRate(newRate);

        setVideo(await res.json());
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
    
    return video ? (
        <>
            <Link 
                className="text-blue-500 hover:text-blue-700 hover:border-b"
                href="/">
                Go Back
            </Link>
            <h1 className="text-xl border-b border-black mt-4 p-1">
                {video.title}
            </h1>
            
            <article className="m-4">
                <p>
                    length: {video.length} sec
                </p>
                <p>
                    uploader: {uploader? <Link
                        href={`/users/${uploader.id}`}
                        className="text-blue-500 hover:text-blue-700 hover:border-b">
                        {uploader.name}</Link>
                    : "<unknown user>"}
                </p>
                <p>
                    tags: 
                    {video.tags.length > 0?
                    <ul className="ml-4">
                        {video.tags.map(t => <li
                            key={t.id}
                            className="list-disc"
                            >
                            {t.name}
                        </li>)}
                    </ul>: " None"}
                </p>
                <div className="m-4 p-2">
                    
                    <button onClick={() => handleLikes(video?.rate === 1? 0: 1)}
                        className={`m-2 py-1 px-2 border rounded ${video.rate === 1 && "bg-blue-500 text-white"}`}>
                        👍Like
                    </button>
                    <button onClick={() => handleLikes(video?.rate === -1? 0: -1)}
                        className={`m-2 py-1 px-2 border rounded ${video.rate === -1 && "bg-blue-500 text-white"}`}>
                        👎Dislike
                    </button>
                </div>
                <div>
                    <button onClick={handleDelete}
                        className="m-4 p-2 bg-red-600 text-white rounded">
                        Delete this information
                    </button>
                </div>
            </article>
        </>
    ): "loading..."
}