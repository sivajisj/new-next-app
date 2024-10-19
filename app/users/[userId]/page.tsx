import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import Link from "next/link";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";
import NotFound from "./not-found";

type Params = {
  params: {
    userId: string;
  };
};
export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId)
    const user: User = await userData
          if(!user.name){
            return {
              title: "User Not Found"
            }
          }
    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }

}


export default async function UserPAge({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);
//   const [user, userPosts] = await Promise.all([userData, userPostsData])
//   console.log(userPosts);
const user = await userData;
  if (!user.name) return NotFound()
  return (
    <>
      <div>
        <section>
          <h2>  {user.name}</h2>
            <br />

          <Link href={"/"}>Back to Home</Link>
          <br />
          <Suspense fallback={<h2>Loading...</h2>}>
          <UserPosts promise={userPostsData} />
          </Suspense>
        </section>
      </div>
    </>
  );
}


export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers()
  const users = await usersData

  return users.map(user => (
    {userId: user.id.toString()}
  ))
}