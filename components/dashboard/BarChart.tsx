import { annualPayrollChart } from "@/data/dashboard-demo";

export function BarChart() {
  const maxValue = Math.max(
    ...annualPayrollChart.series.flatMap((s) => s.values),
  );

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="flex-1">
        <div className="flex h-40 items-end gap-4">
          {annualPayrollChart.months.map((month, monthIndex) => (
            <div key={month} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full flex-col justify-end gap-1 rounded-lg bg-gradient-to-b from-neutral-50 to-neutral-100 p-1.5 dark:from-neutral-900 dark:to-neutral-950">
                {annualPayrollChart.series.map((series) => {
                  const value = series.values[monthIndex];
                  const height = `${(value / maxValue) * 100}%`;
                  return (
                    <div
                      key={series.name}
                      className="w-full rounded-full"
                      style={{ height }}
                    >
                      <div
                        className={`h-full w-full rounded-full ${series.color}`}
                      />
                    </div>
                  );
                })}
              </div>
              <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                {month}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {annualPayrollChart.series.map((series) => (
          <div key={series.name} className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${series.color}`} />
            <span className="text-xs text-neutral-600 dark:text-neutral-300">
              {series.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

