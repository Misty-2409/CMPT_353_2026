import Link from "next/link";
import { initUsersTable } from "@/lib/userQueries"; //WEEK 11

export default async function Home() { //WEEK 11 made async

  // create table + insert admin
  await initUsersTable(); //WEEk 11// load admin id and password when you load homepage

  return (
    <div>
      <h1>Home Page</h1>

      
    </div>
  );
}