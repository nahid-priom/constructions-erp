import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type IdCard = {
  officeId: string
  name: string
  designation: string
  department: string
  bloodGroup: string
  issueDate: string
  expiryDate: string
}

const idCards: IdCard[] = [
  {
    officeId: "AR-0023",
    name: "Engr. Moinul Hasan",
    designation: "Project Engineer",
    department: "Projects & Engineering",
    bloodGroup: "B+",
    issueDate: "01 Jan 2024",
    expiryDate: "31 Dec 2026",
  },
  {
    officeId: "AR-0038",
    name: "Farzana Akter",
    designation: "Accounts Officer",
    department: "Accounts & Finance",
    bloodGroup: "O+",
    issueDate: "01 Jan 2024",
    expiryDate: "31 Dec 2026",
  },
]

export default function EmployeeIdCardsPage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Employee ID Cards"
        description="Professional ID card layout with company branding for printing."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {idCards.map((card) => (
          <Card key={card.officeId} className="border-slate-300">
            <CardHeader className="border-b border-slate-200 bg-slate-50/80 pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-semibold">
                <span>Aurora Construction & Engineering</span>
                <span className="rounded-xl bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  ID CARD
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 pt-4">
              <div className="flex h-24 w-20 items-center justify-center rounded-xl bg-slate-100 text-xs font-medium text-slate-500">
                Photo
              </div>
              <div className="flex-1 space-y-1.5 text-xs">
                <div>
                  <div className="text-slate-500">Name</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {card.name}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Designation</div>
                  <div className="font-semibold text-slate-900">
                    {card.designation}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-slate-500">Office ID</div>
                    <div className="font-semibold text-slate-900">
                      {card.officeId}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Blood Group</div>
                    <div className="font-semibold text-slate-900">
                      {card.bloodGroup}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-slate-500">Issue Date</div>
                    <div className="font-semibold text-slate-900">
                      {card.issueDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Expiry Date</div>
                    <div className="font-semibold text-slate-900">
                      {card.expiryDate}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}

