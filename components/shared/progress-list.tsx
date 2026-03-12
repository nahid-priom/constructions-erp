interface ProgressListItem {
  id: string
  label: string
  value: number
  helper?: string
}

interface ProgressListProps {
  items: ProgressListItem[]
}

export function ProgressList({ items }: ProgressListProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-700 dark:text-slate-200">
              {item.label}
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-50">
              {item.value}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${Math.min(item.value, 100)}%` }}
            />
          </div>
          {item.helper && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {item.helper}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

