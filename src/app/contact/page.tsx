export default function ContactPage() {
  return (
    <section>
  <div className="bg-slate-800/95 rounded-lg p-4 shadow-sm">
        <h2 className="text-2xl font-bold text-brand-pink">Contact</h2>
        <p className="mt-3">Email: <a className="text-brand-cyan underline" href="mailto:Christian.MandujanoBorjas@ucdenver.edu">Christian.MandujanoBorjas@ucdenver.edu</a></p>
        <div className="mt-4 flex gap-3">
          <a className="px-4 py-2 bg-brand-pink text-white rounded" href="mailto:Christian.MandujanoBorjas@ucdenver.edu">Email</a>
          <a className="px-4 py-2 border rounded" href="https://www.linkedin.com/in/cchristian-mandujano" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}
