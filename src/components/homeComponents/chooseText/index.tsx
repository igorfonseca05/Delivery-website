"use client";

type SummaryCardProps = {
  title: string;
  value: number;
  color: string;
};

function SummaryCard({ title, value, color }: SummaryCardProps) {
  return (
    <div
      className={`flex-1 bg-${color}-100 border-l-4 border-${color}-500 rounded p-4 shadow-sm`}
    >
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
    </div>
  );
}

export default function OrdersSummary() {

  return (
    <>
      <h1 className="text-[clamp(1.5rem,1em,2rem)] my-3 text-gray-900 font-semibold">
        Escolha uma categoria
      </h1>
    </>
  );
}
