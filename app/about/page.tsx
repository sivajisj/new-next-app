import Link from "next/link";
import React from "react";
import styles from './style.module.css'

const About = () => {
  // throw new Error("Not today")
  return( 
  <>
    <h1>About</h1>
    <Link href={'/'}>Home</Link>
  </>
  )
};

export default About;
