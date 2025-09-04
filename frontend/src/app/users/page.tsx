"use client"

import User from "@/type/User"
import Link from "next/link";
import { useState, useEffect } from "react"
import { generateRandomUser } from "../lib/generateRandomData";

export default function UsersIndex(){
    const [users, setUsers] = useState<User[]>([]);

    const fetchData = async () => {
        const data = await (await fetch('http://localhost:3000/api/users')).json();
        setUsers(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleGenerate = async () => {
        const randomUser = await generateRandomUser();

        const created = await fetch('http://localhost:3000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: randomUser
            })
        });

        setUsers([...users, await created.json()]);
    };

    return (<>
        <Link 
            className="text-blue-500 hover:text-blue-700 hover:border-b"
            href="/">
            Go Back
        </Link>
        <h1 className="text-xl border-b border-black mt-4 p-1">
            Users
        </h1>
        <ul>
            {users.map(u => 
                <li
                    key={u.id}
                    className="m-2 list-disc"
                    >
                    <Link 
                        href={`/users/${u.id}`}
                        className="text-blue-500 hover:text-blue-700 hover:border-b">
                        {u.name}
                    </Link>
                </li>
            )}
        </ul>
        <button
            className="m-4 p-2 border border-blue-600 bg-blue-500 rounded text-white"
            onClick={handleGenerate}
        >
            Generate a random user
        </button>
    </>);
}