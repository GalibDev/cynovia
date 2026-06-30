export function SectionHeader({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="mb-6">
      {eyebrow ? <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-500">{eyebrow}</p> : null}
      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">{title}</h2>
      {text ? <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{text}</p> : null}
    </div>
  );
}
