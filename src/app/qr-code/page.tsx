import QRCodeGenerator from "../../components/QRCodeGenerator";

export default function QRCodePage() {
  return (
    <div className="min-h-[80vh] pt-24 pb-16 flex flex-col items-center relative z-10 w-full">
      <div className="w-full text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-pink drop-shadow-[0_0_10px_color-mix(in srgb, var(--color-brand-cyan) 40%, transparent)]">
          QR Code Matrix
        </h1>
        <p className="text-slate-400 font-mono text-sm max-w-xl mx-auto mt-4 px-6">
          Generate highly customizable, scalable QR codes for direct network routing.
        </p>
      </div>
      
      <QRCodeGenerator />
    </div>
  );
}
