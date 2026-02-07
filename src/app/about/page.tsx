import StorageStats from "@/components/StorageStats";

export default function About() {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-slate-800/95 rounded-lg p-4 shadow-sm">
        <h2 className="text-2xl font-bold text-brand-pink">About Me</h2>
        <p className="mt-3">I am Christian Mandujano Borjas, an aspiring software engineer currently pursuing a degree in Computer Science at the University of Colorado Denver. With a strong foundation in programming languages like Python, Java, and C++, I have a passion for solving complex problems and building efficient systems.</p>
        <p className="mt-3">I am currently working on a full stack web development project using HTML, CSS, and JavaScript. I have experience with database management using MySQL and SQLite, and I am familiar with cloud services like Google firebase and Amazon Web Services. I am also interested in cybersecurity and have experience with virus protection, firewall management, and backup & recovery.</p>
        <p className="mt-3">My experience as an I.T. Technician at The Monarch Casino and as a CIS Lab Assistant at the Community College of Denver has given me hands-on experience in hardware maintenance, networking, and team collaboration. I have worked with technologies such as Docker, Git, and cloud services like Google Cloud.</p>
        <p className="mt-3">In addition to my technical skills, I am passionate about model building, playing guitar, and Android development. I enjoy hiking and teaching self-defense as part of my diverse interests. I'm constantly learning and seeking new opportunities to improve both my technical and interpersonal skills.</p>
      </div>

      <StorageStats />
    </section>
  )
}
