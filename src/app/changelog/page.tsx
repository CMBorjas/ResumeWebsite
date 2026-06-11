import ChangelogComponent from "@/components/ChangelogComponent";

export default function ChangelogPage() {
  return (
    <div className="min-h-[80vh] pt-24 pb-16 flex flex-col items-center relative z-10 w-full">
      <div className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink drop-shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]">
          System Changelog
        </h1>
        <p className="text-slate-400 font-mono text-sm max-w-xl mx-auto mt-4 px-6">
          A documented history of upgrades, patches, and feature integrations deployed to the portfolio matrix.
        </p>
      </div>
      
      <ChangelogComponent />
    </div>
  );
}
