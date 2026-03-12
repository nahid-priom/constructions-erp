import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Shift = {
  id: string
  name: string
  start: string
  end: string
  breakTime: string
  remarks: string
}

const shifts: Shift[] = [
  {
    id: "1",
    name: "General Shift",
    start: "09:00 AM",
    end: "06:00 PM",
    breakTime: "01:00 PM – 02:00 PM",
    remarks: "Head office, engineering, accounts, HR.",
  },
  {
    id: "2",
    name: "Site Day Shift",
    start: "08:00 AM",
    end: "05:00 PM",
    breakTime: "01:00 PM – 01:30 PM",
    remarks: "All site manpower and supervisors.",
  },
  {
    id: "3",
    name: "Site Evening Shift",
    start: "05:00 PM",
    end: "11:00 PM",
    breakTime: "09:00 PM – 09:15 PM",
    remarks: "For concreting and critical night works.",
  },
]

export default function ShiftsPage() {
  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="Shifts"
        description="Standard shift timings for head office staff and project site manpower."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shifts.map((shift) => (
          <Card key={shift.id}>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                {shift.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Start</span>
                <span className="font-semibold text-slate-900">
                  {shift.start}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">End</span>
                <span className="font-semibold text-slate-900">
                  {shift.end}
                </span>
              </div>
              <div>
                <div className="text-slate-500">Break Time</div>
                <div className="font-semibold text-slate-900">
                  {shift.breakTime}
                </div>
              </div>
              <p className="pt-1 text-[11px] text-slate-600">{shift.remarks}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}

