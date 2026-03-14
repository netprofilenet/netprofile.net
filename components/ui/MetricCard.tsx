import { ratingBg, ratingColor, ratingLabel, type Rating } from '@/lib/ratings'

export default function MetricCard({
  label,
  value,
  unit,
  rating,
}: {
  label: string
  value: string
  unit: string
  rating?: Rating
}) {
  return (
    <div className={`rounded-xl border p-5 ${rating ? ratingBg[rating] : 'bg-neutral-50 border-neutral-200'}`}>
      <div className="text-xs text-neutral-500 mb-1.5">{label}</div>
      <div className="text-2xl md:text-3xl font-semibold tabular-nums">
        {value}
        <span className="text-sm font-normal text-neutral-400 ml-1">{unit}</span>
      </div>
      {rating && (
        <div className={`text-xs font-medium mt-2 ${ratingColor[rating]}`}>
          {ratingLabel[rating]}
        </div>
      )}
    </div>
  )
}
