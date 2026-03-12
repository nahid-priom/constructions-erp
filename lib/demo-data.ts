export type ProjectCode =
  | "INT-2401"
  | "INT-2402"
  | "INT-2403"
  | "INT-2404"
  | "INT-2405"
  | "INT-2406"
  | "INT-2407"
  | "INT-2408"
  | "INT-2409"
  | "INT-2410"
  | "INT-2411"
  | "INT-2412"
  | "INT-2413"
  | "INT-2414"
  | "INT-2415"
  | "INT-2416"
  | "INT-2417"
  | "INT-2418"
  | "INT-2419"
  | "INT-2420";

export const workflowStages = [
  "Lead",
  "Site Visit",
  "Design",
  "BOQ / Estimate",
  "Quotation",
  "Client Approval",
  "Project Execution",
  "Material Procurement",
  "Installation",
  "Billing",
  "Project Handover",
] as const;

export type WorkflowStage = (typeof workflowStages)[number];

export const clients = [
  "Rafiq Ahmed",
  "Tasnia Karim",
  "Nabil Group",
  "Bengal Workspace Ltd",
  "Lakeshore Café",
  "Urban Edge Properties",
  "Rahman Holdings",
] as const;

export const projectCodes: ProjectCode[] = [
  "INT-2401",
  "INT-2402",
  "INT-2403",
  "INT-2404",
  "INT-2405",
  "INT-2406",
  "INT-2407",
  "INT-2408",
  "INT-2409",
  "INT-2410",
  "INT-2411",
  "INT-2412",
  "INT-2413",
  "INT-2414",
  "INT-2415",
  "INT-2416",
  "INT-2417",
  "INT-2418",
  "INT-2419",
  "INT-2420",
];

export const projects = [
  {
    code: "DU-0001",
    name: "12 Floors Commercial Building",
    client: "North View Properties Ltd.",
  },
  {
    code: "CTG-0007",
    name: "Factory Foundation Work",
    client: "Bay Industrial Holdings",
  },
  {
    code: "SYL-0003",
    name: "Residential Tower Phase 1",
    client: "Sylhet Heights Developments",
  },
  {
    code: "GZP-0004",
    name: "10 Katha Plot Development",
    client: "Gazipur Land Development",
  },
  {
    code: "DU-0002",
    name: "Corporate Office Block – Banani",
    client: "Urban Edge Properties",
  },
  {
    code: "DU-0003",
    name: "Mixed Use Building – Mirpur",
    client: "Rahman Holdings",
  },
  {
    code: "CTG-0008",
    name: "Port Warehouse Extension",
    client: "Bay Industrial Holdings",
  },
  {
    code: "SYL-0004",
    name: "Community Hospital Building",
    client: "Sylhet Health Trust",
  },
  {
    code: "GZP-0005",
    name: "Factory Shed & Utility Block",
    client: "Gazipur Land Development",
  },
  {
    code: "DU-0004",
    name: "Residential Complex – Bashundhara",
    client: "North View Properties Ltd.",
  },
] as const;

export const vendors = [
  "Dhaka Board & Timber Supply",
  "Bengal Hardware & Fittings",
  "GlassLine BD",
  "Noor Paint House",
  "Elite Lighting & Electrical",
  "Urban Décor Accessories",
] as const;

export const warehouses = [
  "Main Warehouse",
  "Board Store",
  "Hardware Store",
  "Site Transit Stock",
  "Workshop Raw Material Yard",
] as const;

export const materials = [
  "MDF Board 18mm",
  "Plywood 12mm",
  "Premium Laminate Sheet",
  "Soft Close Hinge",
  "Drawer Channel Set",
  "Clear Glass Panel",
  "Emulsion Paint Off White",
  "LED Strip Light 5m",
  "Decorative Handle Set",
  "PVC Edge Band Roll",
  "MDF Board 12mm",
  "Plywood 18mm Marine Grade",
  "High Gloss Laminate Sheet",
  "Matte Finish Laminate Sheet",
  "PVC Ceiling Panel",
  "POP Cornice Profile",
  "Door Closer Heavy Duty",
  "Concealed Handle Profile",
  "Aluminium Skirting",
  "Acoustic Panel 12mm",
  "Soft Board Pin-up Panel",
  "Track Light Fitting",
  "Surface Downlight",
  "Recessed Panel Light",
  "Task Light for Workstation",
  "Glass Door Floor Spring",
  "Patch Fitting Set",
  "Shower Hinges Set",
  "Mirror with LED Backlight",
  "Vinyl Flooring Roll",
  "Engineered Wood Flooring",
  "Carpet Tile 500x500",
  "Wall Paper Luxury Texture",
  "Sheer Curtain Fabric",
  "Blackout Curtain Fabric",
  "Granite Countertop Slab",
  "Quartz Countertop Slab",
  "Stainless Steel Sink Single Bowl",
  "Modular Kitchen Channel",
  "Wardrobe Hanging Rod",
  "PVC Edge Band 0.8mm",
  "PVC Edge Band 1mm",
  "Gypsum Board 12mm",
  "Metal Framing Stud",
  "Metal Framing Track",
  "Wall Putty 40kg Bag",
  "Primer Sealer",
  "PU Polish Clear",
  "Metallic Paint Feature",
] as const;

export const employees = [
  { name: "Arif Hossain", role: "Project Engineer", department: "Projects" },
  { name: "Tanvir Hasan", role: "Site Supervisor", department: "Site Operations" },
  {
    name: "Mehedi Islam",
    role: "Procurement Officer",
    department: "Procurement",
  },
  { name: "Nusrat Jahan", role: "HR Executive", department: "HR & Administration" },
  { name: "Sharif Uddin", role: "Accounts Officer", department: "Accounts & Finance" },
  { name: "Rakib Molla", role: "Store In-Charge", department: "Central Store" },
  { name: "Fahim Reza", role: "Planning Engineer", department: "Planning" },
] as const;

export const contractors = [
  { name: "Bismillah Carpentry Team", workType: "Carpentry" },
  { name: "Prime Electrical Works", workType: "Electrical" },
  { name: "Royal Paint & Polish Team", workType: "Painting" },
  { name: "Metro Glass Installation", workType: "Glass" },
  { name: "Dhaka Ceiling Solutions", workType: "Ceiling" },
  { name: "City HVAC Services", workType: "HVAC" },
  { name: "Premium Flooring Crew", workType: "Flooring" },
  { name: "Elite Signage & Branding", workType: "Signage" },
  { name: "SecureFire Solutions", workType: "Fire Safety" },
  { name: "CleanFinish Housekeeping", workType: "Post-Handover Cleaning" },
] as const;

export const currency = "BDT";

// Leads data for construction enquiries
export const leadPipelineStages = [
  "Lead",
  "Site Visit",
  "Requirement",
  "Design Proposal",
  "BOQ / Estimate",
  "Quotation",
  "Client Approval",
  "Closed Won",
  "Closed Lost",
] as const;

export type LeadPipelineStage = (typeof leadPipelineStages)[number];

export type LeadSource =
  | "Facebook"
  | "Website"
  | "WhatsApp"
  | "Referral"
  | "Other";

export interface DemoLead {
  id: string;
  leadName: string;
  phone: string;
  email: string;
  source: LeadSource;
  projectType: string;
  location: string;
  budget: number;
  assignedTo: string;
  followUpDate: string;
  status: LeadPipelineStage;
  notes: string;
  requirementFileName?: string;
}

export const demoLeads: DemoLead[] = [
  {
    id: "L-2401",
    leadName: clients[2],
    phone: "+8801711-234567",
    email: "contact@nabilgroup.com",
    source: "Referral",
    projectType: "Corporate Office Fit-out",
    location: "Banani, Dhaka",
    budget: 4200000,
    assignedTo: "Nusrat Jahan",
    followUpDate: "2026-03-14",
    status: "Design Proposal",
    notes: "Concept 3D shared, waiting for BOQ review.",
  },
  {
    id: "L-2402",
    leadName: clients[0],
    phone: "+8801812-987654",
    email: "rafiq.apt@example.com",
    source: "Website",
    projectType: "Residential Building",
    location: "Dhanmondi, Dhaka",
    budget: 1800000,
    assignedTo: "Nusrat Jahan",
    followUpDate: "2026-03-13",
    status: "Site Visit",
    notes: "Site visit scheduled for Saturday morning.",
  },
  {
    id: "L-2403",
    leadName: clients[4],
    phone: "+8801913-112233",
    email: "lakeshore.int@example.com",
    source: "Facebook",
    projectType: "Food Court Block",
    location: "Uttara, Dhaka",
    budget: 3200000,
    assignedTo: "Fahim Reza",
    followUpDate: "2026-03-16",
    status: "Quotation",
    notes: "Shared quotation; client reviewing internally.",
  },
];

