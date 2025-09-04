'use client'

import Tag from "@/type/Tag"
import Link from "next/link";
import { useState, useEffect } from "react"

export default function TagsIndex(){
    const [tags, setTags] = useState<Tag[]>([]);

    const fetchData = async () => {
        const data = await (await fetch('http://localhost:3000/api/tags')).json();
        setTags(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        const res = await fetch(`http://localhost:3000/api/tags/${id}`, {method: 'DELETE'});
        const data = await res.json();

        if(res.status === 200){
            setTags(tags.filter(t => t.id !== data.id));
        }
    }

    return (<>
        <Link 
            className="text-blue-500 hover:text-blue-700 hover:border-b"
            href="/">
            Go Back
        </Link>
        <h1 className="text-xl border-b border-black mt-4 p-1">
            Tags
        </h1>
        <ul className="m-4">
            {tags.map(t => 
                <li
                    key={t.id}
                    className="m-2 list-disc"
                    >
                    {t.name}
                    <button
                        className="m-2 w-3 h-3 rounded-full bg-red-500"
                        onClick={() => handleDelete(t.id)}>
                        
                    </button>
                </li>
            )}
        </ul>
        <button
            className="m-4 p-2 border border-blue-600 bg-blue-500 rounded text-white"
        >
            Generate a random tag
        </button>
    </>);
}