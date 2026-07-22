export default function EducationPage() {
  return (
    <section className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-800/95 rounded-lg p-4 shadow-sm">
        <h2 className="text-2xl font-bold text-brand-pink">Education</h2>
        <p className="mt-3"><strong>University of Colorado Denver</strong> - Denver, Colorado, USA</p>
        <p>Computer Science, 2020-Present</p>
        <p className="mt-3"><strong>Community College of Denver</strong> - Denver, Colorado, USA</p>
        <p>Associate of Applied Science in Computer Information Systems, 2018-2020</p>
      </div>

      <div className="bg-slate-800/95 rounded-lg p-4 shadow-sm">
        <h2 className="text-2xl font-bold text-brand-pink">Clubs and School Activities</h2>
        <p className="mt-3"><strong>Artificial Intelligence Student Association</strong> - University of Colorado Denver</p>
        <p>Technology Officer, 2024-2026</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Led a team of 6 members to develop a RAG agent system presentation for the student organization, which resulted in 50+ members engaging in the presentation.</li>
          <li>Helped organize a competition and competed with 50+ students in the field of Artificial Intelligence for the betterment of society.</li>
          <li>Participated in weekly meetings discussing recent changes in the field of Artificial Intelligence.</li>
          <li>Engaged in hands-on projects and competitions to understand and implement AI concepts.</li>
          <li>Maintain the AI Student Association website and social media presence.</li>
        </ul>
      </div>

      <div className="bg-slate-800/95 rounded-lg p-4 shadow-sm">
        <h2 className="text-2xl font-bold text-brand-pink">Lynx Robotics Club</h2>
        <p className="mt-3"><strong>Lynx Robotics Club</strong> - University of Colorado Denver</p>
        <p>Secretary, TBD</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Developed and presented educational content to club members.</li>
          <li>Maintained communication between club members and external organizations.</li>
          <li>Organized social and outreach events for the club.</li>
          <li>Maintained the Lynx Robotics Club website and social media presence.</li>
        </ul>
      </div>
    </section>
  )
}
