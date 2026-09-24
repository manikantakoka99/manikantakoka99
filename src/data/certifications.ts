export type CertStatus = "CERTIFIED" | "IN PROGRESS" | "PLANNED";

export type Certification = {
  id: string;
  filename: string;
  title: string;
  issuer: string;
  code: string;
  status: CertStatus;
  verified: boolean;
  earned: string;
  expires: string;
  imagePath: string;
  notes?: string;
};

export const certifications: Certification[] = [
  {
    id: "sc-200",
    filename: "SC-200.credential",
    title: "Security Operations Analyst Associate",
    issuer: "Microsoft Certified",
    code: "SC-200",
    status: "CERTIFIED",
    verified: true,
    earned: "September 17, 2026",
    expires: "September 18, 2027",
    imagePath: "/assets/sc-200-certificate.png",
    notes: "Online Verifiable. Credential ID not displayed in normal UI.",
  },
];
