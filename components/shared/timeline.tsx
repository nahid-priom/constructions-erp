type TimelineItem = {
  id: string
  time: string
  title: string
  description: string
  meta: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="space-y-3 text-xs">
      {items.map((item) => (
        <li key={item.id} className="flex gap-3">
          <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
          <div className="space-y-0.5">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-slate-900 dark:text-slate-50">
                {item.title}
              </p>
              <span className="text-[11px] text-slate-500">{item.time}</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              {item.description}
            </p>
            <p className="text-[11px] text-slate-500">{item.meta}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

