import { incomeChart } from "@/data/dashboard-demo";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function IncomeChart() {
  const max = Math.max(...incomeChart.points);

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div>
        <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          {currencyFormatter.format(incomeChart.totalIncome)}
        </div>
        <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {incomeChart.growthLabel}
        </p>
      </div>
      <div className="mt-4 flex-1">
        <div className="flex h-32 items-end gap-3 rounded-xl bg-gradient-to-t from-indigo-50 via-purple-50/40 to-transparent p-3 dark:from-indigo-900/30 dark:via-purple-900/20">
          {incomeChart.points.map((point, index) => {
            const height = `${(point / max) * 100}%`;
            const isActive = index === incomeChart.points.length - 1;
            return (
              <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                <div className="relative flex w-full items-end justify-center">
                  <div
                    className={`w-full rounded-t-full bg-gradient-to-t from-indigo-600 via-purple-500 to-orange-400 ${
                      isActive ? "shadow-[0_0_0_1px_rgba(79,70,229,0.3)]" : ""
                    }`}
                    style={{ height }}
                  />
                  {isActive && (
                    <div className="absolute -top-6 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
                      ${point / 10}k
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

