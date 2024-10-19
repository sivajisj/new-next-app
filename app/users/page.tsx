import React from 'react'
import { Metadata } from 'next';
import getAllUsers from '@/lib/getAllUsers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Users"
};

export default async function UsersPage() {
    const usersData: Promise<User[]> = getAllUsers() 
    const users = await usersData

    const content = (
        <section>
            <Link href={'/'}>Back to Home</Link>
            <br />
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <Link href={`/users/${user.id}`}>
                            <p>{user.id} : {user.name}</p>
                        </Link>
                    </div>
                );
            })}
        </section>
    );

    return (
        <div>
            {content}
        </div>
    );
}
