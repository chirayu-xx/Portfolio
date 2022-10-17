
import Head from 'next/head'
import Link from 'next/link'
import About from '../components/About'
import ContactMe from '../components/ContactMe'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import WorkExperience from '../components/WorkExperience'
import {ArrowUpIcon} from '@heroicons/react/24/solid'
import { client } from '../lib/client'

export default function Home({pageInfo, experiences, projects, skills, socials}) {
  return (
    <div className='bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll z-0 scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#F7AB0A]'>
      <Head>
        <title>{pageInfo.name} - Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header socials = {socials}/>

      {/* Hero  */}
      <section id='hero' className='snap-start'>
        <Hero pageInfo = {pageInfo}/>
      </section>

      {/* About  */}
      <section id='about' className='snap-center'>
        <About pageInfo = {pageInfo}/>
      </section>
      {/* Experience  */}
      <section id='experience' className='snap-center'>
      <WorkExperience experiences = {experiences}/>
      </section>

      {/* Skills  */}
      <section id='skills' className='snap-start'>
        <Skills skills = {skills}/>
      </section>

      {/* Projects  */}
      <section id='projects' className='snap-start'>
        <Projects projects= {projects}/>
      </section>

      {/* Contact Me  */}
      <section id="contact" className='snap-start'>
        <ContactMe/>
      </section>
      <Link href='#hero'>
      <footer className='flex justify-center items-center'>
        { <div>
            <ArrowUpIcon className='h-8 w-8 rounded-full  hover:text-[#F7AB0A] cursor-pointer'/>
        </div>}
      </footer>
      </Link>
    </div>
  )
}

export async function getStaticProps(){
    const pageInfoQuery =  '*[_type == "pageInfo"][0]'
    const experienceQuery = `*[_type == "experience"]{
      ...,
      technologies[]->
    }`
    const projectQuery = `
    *[_type == "project"]{
      ...,
      technologies[]->
    }
    `
    const skillQuery = `
    *[_type == "skill"]
 `
    const socialQuery = `
    *[_type == "social"]
 `
    const pageInfo = await client.fetch(pageInfoQuery);
    const experiences = await client.fetch(experienceQuery);
    const skills = await client.fetch(skillQuery);
    const projects = await client.fetch(projectQuery);
    const socials = await client.fetch(socialQuery);
    return{
      props:{pageInfo, experiences, projects, skills, socials},
      revalidate:10
    }
}