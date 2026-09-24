export type AttackSurfaceField =
  | "Domains"
  | "Subdomains"
  | "Hosting / CDN"
  | "Observed Services"
  | "Exposed Interfaces"
  | "Interesting Findings"
  | "Potential Risks"
  | "Methodology"
  | "Limitations";

export type AttackSurfaceTarget = {
  id: string;
  name: string;
  fields: Record<AttackSurfaceField, string>;
};

const SHARED_POTENTIAL_RISKS = [
  "Orphaned subdomains, certificates, or vendor CNAMEs after a project is shut down.",
  "Credential phishing and stuffing across many branded login pages.",
  "Inconsistent patching and logging across owned, cloud, CDN, and vendor-operated services.",
  "Information disclosure through backend names, diagnostic redirects, server headers, and public procurement documents.",
  "A missing Shodan/Censys result can look safer than it is. External checks need more than one data source.",
].join(" ");

const SHARED_LIMITATIONS = [
  "DNS answers can change with time and location, especially behind CDNs.",
  "CT records are historical and include inactive names.",
  "Search engines and Shodan can be stale, incomplete, or wrong.",
  "A HEAD response may differ from a normal browser GET.",
  "This was public recon only, not a penetration test.",
].join(" ");

const METHODOLOGY =
  "Certificate Transparency → DNS Enumeration → Subdomain Discovery → Hosting Identification → Service Enumeration → Attack Surface Mapping → Security Observations (public sources: crt.sh, official pages, Shodan, IPinfo/APNIC, technology fingerprinting).";

export const attackSurface = {
  title: "Attack Surface Enumeration",
  subtitle: "Public Reconnaissance & External Attack-Surface Mapping",
  framing: [
    "PUBLIC RECONNAISSANCE",
    "ATTACK-SURFACE ENUMERATION",
    "SECURITY RESEARCH",
  ] as const,
  disclaimer:
    "This section presents public reconnaissance and attack-surface mapping research. It is not penetration testing and does not claim unauthorized access or exploitation. Sources accessed on 4 September 2026 unless a source-specific date is stated.",
  methodology: [
    "Certificate Transparency",
    "DNS Enumeration",
    "Subdomain Discovery",
    "Hosting Identification",
    "Service Enumeration",
    "Attack Surface Mapping",
    "Security Observations",
  ] as const,
  relationshipChain: [
    "TARGET",
    "DOMAIN",
    "SUBDOMAIN",
    "HOSTING",
    "SERVICE",
    "OBSERVATION",
    "RISK",
  ] as const,
  reportPath: "/assets/attack-surface-enumeration.pdf",
  sourceNote:
    "Content below is drawn from the Attack Surface Enumeration Report (public recon inventory). CT names are discovery leads and do not prove every host is currently reachable.",
  keyObservations: [
    "CT records helped identify additional hostnames, including older or environment-related names, even when hosts no longer resolve.",
    "Hosting is mixed: own networks, CDNs, cloud load balancers, government mail, and specialist vendors.",
    "Most of the exposed surface was around login, customer, employee, and partner portals.",
    "Passive indexes like Shodan are incomplete and can be misleading on shared CDN addresses — hostname matters more than IP alone.",
    "This report is only a recon inventory; it does not prove that any of the listed systems are vulnerable.",
  ] as const,
  targets: [
    {
      id: "irctc",
      name: "IRCTC",
      fields: {
        Domains:
          "Primary: irctc.co.in. Related: irctc.com, irctctourism.com.",
        Subdomains:
          "Customer/content: www, nget, contents, care, askdisha. Booking/tourism: air, bus, ecatering, tourism, hotels, rr, ftr. Business/ops: operations, corporate, agent, dashboard. Payment-related: pay, payment, pg. CT also showed environment-style names (beta, uat, stageicp, stageics, stagenget, stagews, pmftest, and related UAT/stage labels).",
        "Hosting / CDN":
          "Mixed: direct IRCTC/CRIS addresses (e.g. irctc.co.in 103.252.142.27; payment/agent/ops on 103.252.142.x), Akamai edge for www/contents, AWS ALB (ap-south-1) for ecatering/equery, Cloudflare Pages for askdisha, CloudFront for heliyatra/lakshadweep. Authoritative DNS uses Akamai nameservers. 103.252.142.0/23 registered to CRIS (AS45596); 103.116.160.0/22 to IRCTC (AS38799). Registry data showed DNSSEC and registrar locks for irctc.co.in.",
        "Observed Services":
          "irctc.co.in HTTP 302 to next-generation e-ticketing; contents HTTPS 200 (public documentation/content); ecatering HTTPS 200 with nginx server header; agent interface associated with Java/JSP, PrimeFaces, and jQuery (third-party indexing, no reliable version). Shodan reported TCP 80/443 on selected CRIS/IRCTC addresses (last-seen dates in 2026).",
        "Exposed Interfaces":
          "Authorized-agent login at operations.irctc.co.in/AgentInterface/loginHome.jsf (user ID, password, CAPTCHA, agent rules). Public customer booking, tourism, payment, and support portals on the hostnames listed above.",
        "Interesting Findings":
          "Agent-login page rendered an internal-looking identifier (nget… node/application text) in its footer. Several UAT/stage/test labels still resolve; no HTTP request was made to those systems. Most exposed surface was booking, agent, payment, travel, and support. No open directory, public bucket, or non-web administrative protocol was verified.",
        "Potential Risks": SHARED_POTENTIAL_RISKS,
        Methodology: METHODOLOGY,
        Limitations: SHARED_LIMITATIONS,
      },
    },
    {
      id: "lic",
      name: "LIC",
      fields: {
        Domains: "Primary: licindia.in.",
        Subdomains:
          "Public/customer: www, ebiz, eterm, onlinesales, linkpan, pgslink. Employee/business: hrms, vendors, webmail, efeap. Platform/integration: digital, portal, nextgen, static.nextgen. Collaboration: vc, webrtc.vc. CT also showed names such as internal, sample.access, and origin19953-new.",
        "Hosting / CDN":
          "licindia.in/www on 64.185.181.238 (shared BitGravity / Tata Communications CDN). eterm 125.16.45.17; onlinesales 125.16.45.214. HRMS via Amazon CloudFront; ebiz via Cloudflare; digital/portal via MoEngage-related CNAME chains (Cloudflare / CloudFront). linkpan and pgslink had no A/AAAA/CNAME during the observation window. 125.16.45.0/24 LIC-assigned, routed by Bharti Airtel (AS9498). Authoritative DNS: ns09/ns10.domaincontrol.com.",
        "Observed Services":
          "licindia.in HTTPS 200 (official site). hrms HTTPS 200 (HRMS implementation confirmed via official procurement notice; Employee’s Corner on main site). ebiz HTTPS 403 through Cloudflare (edge reachable, access-controlled). eterm HTTP 405 to HEAD. digital JSON with HTTP 405 through Cloudflare. portal AWS ELB-style HTTP 404 at / (active endpoint, not a user-facing app at root). Shodan TCP 80/443 on shared CDN IP — extra ports on that shared node cannot be attributed to LIC without hostname-level evidence.",
        "Exposed Interfaces":
          "Official public website; Employee HRMS / Employee’s Corner; ebiz edge (reachable, 403); digital and portal endpoints behind Cloudflare / CloudFront.",
        "Interesting Findings":
          "digital and portal delegate through marketing/CDN infrastructure rather than LIC-owned address space; no dangling-CNAME or takeover condition was established. HRMS and Employee’s Corner are legitimate employee services but increase phishing value. linkpan and pgslink have CT history but no current address response. No open directory, public bucket, or exposed non-web service was verified.",
        "Potential Risks": SHARED_POTENTIAL_RISKS,
        Methodology: METHODOLOGY,
        Limitations: SHARED_LIMITATIONS,
      },
    },
    {
      id: "bsnl",
      name: "BSNL",
      fields: {
        Domains: "Primary: bsnl.co.in. Related official service domain: bsnl.in.",
        Subdomains:
          "Customer: selfcare, bookmyfiber, portal/portal2 (bsnl.in), mybillview, mobilebillview. Product/registration: cymn, sancharaadhaar, ngn. Enterprise/ops: erp, erpportal, fiori, eportal.erp, mail, drive, collab, ptcc. Hosting/vendor: btcl, bwsbtcl, cloudx, drivex. Regional: ap, assam, kerala, kolkata, chennai, kl. CT also included operational names (intranet, bbnwintranet, nms.*, and several devsrv*.kl labels).",
        "Hosting / CDN":
          "bsnl.co.in 218.248.240.69; bsnl.in 218.248.240.47 (+ IPv6). selfcare 218.248.243.101; portal/portal2 218.248.6.241; bookmyfiber 218.248.240.82; cymn/sancharaadhaar 117.236.172.155; mail 164.100.15.5 (NIC space); erpportal/fiori 61.1.112.226; drive/collab 218.248.233.168/169. Branded hosting on third-party provider space. etender had no address data during observation. Authoritative DNS: ns11/ns12.bsnl.in. Mail via mx.mgovcloud.in (and mx2/mx3). 218.248.240.0/20 and 61.0.0.0/15, AS9829 associated with BSNL NIB. Observed email/DNS posture: SPF soft-fail, DMARC p=quarantine, unsigned DNSSEC.",
        "Observed Services":
          "bsnl.co.in HTTPS 200 with Apache header. selfcare HTTP 302 to home.xhtml (login: username, password, CAPTCHA). portal/portal2 HTTPS 200 with Apache (customer/payment). bookmyfiber redirected to current fibre-booking domain. sancharaadhaar redirected to a login application. erpportal exposed SAP NetWeaver employee-service login. drive exposed authenticated drive login (no public file listing). collab displayed a stock Apache Ubuntu default page. Search indexing exposed Tomcat 8.0.46 documentation under ptcc.bsnl.co.in/docs/ (metadata does not prove running server version). Shodan TCP 443 on 218.248.243.101 (last seen 3 September 2026).",
        "Exposed Interfaces":
          "Self-care login; customer/payment portals on portal.bsnl.in and portal2.bsnl.in; Sancharaadhaar login redirect; SAP NetWeaver employee-service login on erpportal.bsnl.co.in; authenticated drive login on drive.bsnl.co.in.",
        "Interesting Findings":
          "Large public estate (self-care, billing, registration, regional, employee apps, drive/collaboration, hosting); operational VPN/NMS/ITSM names visible in CT/DNS — visibility is not a vulnerability but aids targeting/phishing. Stock Apache page and indexed Tomcat documentation disclose deployment metadata. cymn.bsnl.co.in redirect contained WAF diagnostic fields (threat-category label and requesting-client metadata). Indexed self-care pages still contain “old browser / IE8 and above” guidance (does not prove a vulnerable server). CT names with intranet/nms/vpn/devsrv should be checked against split-DNS and exposure policy. No open directory, public bucket, or exposed database was verified.",
        "Potential Risks": SHARED_POTENTIAL_RISKS,
        Methodology: METHODOLOGY,
        Limitations: SHARED_LIMITATIONS,
      },
    },
    {
      id: "aai",
      name: "AAI",
      fields: {
        Domains: "Primary: aai.aero.",
        Subdomains:
          "Public/services: www, aim-india, digitalsky, onlinefpl, nocas2, gagan. Employee/retiree: eoffice, ess, rep, ithelpdesk, mail. Business/ops: epay, etender, boardmeeting, bems, echart. CT also showed environment-style names (adss-test, stagenocas2, legacy). rep and aim-india were found through official/search indexes even though they were not in the bounded CT output used for the report.",
        "Hosting / CDN":
          "aai.aero/www and rep on 103.142.16.141; eoffice 103.142.16.160; aim-india 103.142.16.192; ess 103.142.16.189; onlinefpl 59.179.29.105; digitalsky AWS ELB in ap-south-1 (13.201.249.183, 13.206.59.222). epay and ithelpdesk had no address data during observation. Authoritative DNS: Cloudflare nameservers. Mail: mail.aai.aero, mail1.aai.aero. 103.142.16.0/24 associated with AAI, AS133725.",
        "Observed Services":
          "aai.aero/www HTTPS 200. eoffice HTTP 302 to authentication path (login ID, password, CAPTCHA, support details). rep HTTPS 200 (retired-employee OTP/login). aim-india HTTPS 200 (Aeronautical Information Management login). ess HTTP 307 to /irj/portal (public indexing identifies SAP NetWeaver Portal login). digitalsky HTTPS 200 with nginx header. onlinefpl HTTP 400 to minimal request (responding HTTPS endpoint; does not establish application health). Shodan did not provide current host records for the two checked AAI-owned addresses — absence should not be treated as proof ports are closed.",
        "Exposed Interfaces":
          "Main public website; eOffice login; retired-employee OTP/login on rep.aai.aero; AIM login on aim-india.aai.aero; SAP NetWeaver Portal login on ess.aai.aero; DigitalSky HTTPS application.",
        "Interesting Findings":
          "WebTechSurvey reported Drupal 7 and jQuery 2.2 on aai.aero in April 2026; Drupal 7 community security support ended 5 January 2025 — third-party fingerprint, not a version-confirmed vulnerability; still needs internal verification. Several public credential-entry points (employee, eOffice, SAP ESS, retiree, AIM, main-site employee logins). CT names such as adss-test, stagenocas2, and legacy should be checked against actual inventory. No open directory, public bucket, or exposed database was verified.",
        "Potential Risks": SHARED_POTENTIAL_RISKS,
        Methodology: METHODOLOGY,
        Limitations: SHARED_LIMITATIONS,
      },
    },
  ] as AttackSurfaceTarget[],
};
