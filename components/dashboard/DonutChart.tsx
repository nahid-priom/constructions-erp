import { staffApplicationsDonut } from "@/data/dashboard-demo";

export function DonutChart() {
  const total = staffApplicationsDonut.total;
  const circumference = 100;

  return (
    <div className="flex h-full flex-col justify-between gap-4 lg:flex-row">
      <div className="flex flex-1 items-center justify-center">
        <div className="relative h-40 w-40">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-50 via-purple-50 to-orange-50 dark:from-indigo-900/30 dark:via-purple-900/20 dark:to-orange-900/20" />
          <div className="absolute inset-3 rounded-full bg-white dark:bg-neutral-950" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Total applications
              </div>
              <div className="mt-1 text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                {total}
              </div>
            </div>
          </div>
          <div className="absolute inset-1.5 rotate-[-90deg]">
            <svg viewBox="0 0 36 36" className="h-full w-full">
              {staffApplicationsDonut.segments.reduce(
                (acc, segment, index) => {
                  const offset = acc.offset;
                  const fraction = segment.value / total;
                  const dash = fraction * circumference;

                  const el = (
                    <circle
                      key={segment.label}
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="transparent"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${dash} ${circumference - dash}`}
                      strokeDashoffset={-offset}
                      className={segment.color.replace("bg-", "stroke-")}
                    />
                  );

                  return {
                    offset: offset + dash,
                    elements: [...acc.elements, el],
                  };
                },
                { offset: 0, elements: [] as JSX.Element[] },
              ).elements}
            </svg>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-3 text-xs">
        {staffApplicationsDonut.segments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${segment.color}`}
              />
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                {segment.label}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {segment.value} applications
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

