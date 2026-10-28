// Single source of truth for every project shown on the home page and on /work/[slug].

export type ProjectSection = "work" | "volunteer" | "university";

export type Project = {
  slug: string;
  section: ProjectSection;
  title: string;
  year: string;
  /** Optional short role / context line shown under the title on the detail page. */
  role?: string;
  stack: string[];
  desc: string;
  image: string | null;
  video?: string | null;
  github?: string | null;
  live?: string | null;
  liveLabel?: string;
  /** Additional live links shown after the primary one (e.g. the same app on another host). */
  extraLinks?: { href: string; label: string }[];
  /**
   * Long-form body. Lightweight markup, one item per line:
   *   "• text"     → bullet
   *   "- text"     → sub-bullet under the previous bullet
   *   "[ Heading ]" → sub-heading
   *   anything else → paragraph
   */
  details: string;
  gallery?: { src: string; caption: string }[];
};

export const sections: { id: ProjectSection; eyebrow: string; title: string; blurb: string }[] = [
  {
    id: "work",
    eyebrow: "Work experience",
    title: "Real work, real users",
    blurb: "งานจริงที่ใช้งานจริง — ฝึกงานในองค์กร ระบบที่สร้างให้ธุรกิจ และผลงานที่ปล่อยใช้งานแล้ว",
  },
  {
    id: "volunteer",
    eyebrow: "Volunteer & activities",
    title: "Hackathons, exchange & community",
    blurb: "กิจกรรมนอกห้องเรียน โครงการแลกเปลี่ยนต่างประเทศ และงานแข่งขัน",
  },
  {
    id: "university",
    eyebrow: "University projects",
    title: "Coursework, hackathons & exchange",
    blurb: "โปรเจกต์สมัยเรียน งานแข่งขัน และโครงการแลกเปลี่ยน ที่เป็นพื้นฐานของงานปัจจุบัน",
  },
];

export const projects: Project[] = [
  // ───────────────────────── Work experience ─────────────────────────
  {
    slug: "com7-aws-teaching-assistant",
    section: "work",
    title: "IT Support / Teaching Assistant — AWS @ Com7",
    role: "Com7 Public Company Limited (BOI Project) · Jul – Dec 2026",
    year: "2026",
    stack: ["AWS", "Teaching Assistant", "IT Support", "Troubleshooting"],
    desc: "ผู้ช่วยสอน Lab ในหลักสูตร Architecting on AWS (Com7 Business × BOI STEM++) ทั้ง 10 รุ่น พาผู้เรียนทำ Lab บน AWS Console แก้ปัญหาสดระหว่างคลาส และซัพพอร์ตงานด้าน AWS ให้ทีม Education & Enterprise",
    image: "/images/awslab.jpg",
    video: null,
    details: `ตำแหน่ง IT Support / Teaching Assistant ที่ Com7 Public Company Limited ภายใต้โครงการ BOI ดูแลงานด้าน AWS ให้ทีม Education & Enterprise โดยหน้าที่หลักคือผู้ช่วยสอน Lab ในหลักสูตร Architecting on AWS

[ Architecting on AWS ]
• Course: Architecting on AWS — หลักสูตรพื้นฐานการออกแบบโครงสร้าง IT บน AWS สำหรับ Solutions Architect เน้น AWS best practices, design patterns ที่แนะนำ และ case study จากลูกค้า AWS จริง พร้อม Lab แบบ guided hands-on
• Program: Live classroom (Com7 Business × BOI STEM++) จัดที่ Koon Hotel ช่วง ก.ค. 2026 – ม.ค. 2027 รวม 10 รุ่น ใช้หลักสูตรเดียวกันทุกรุ่น เตรียมผู้เรียนสู่สาย Cloud Engineer และการสอบ AWS Certified Solutions Architect – Associate
• Hands-on Labs: ช่วย Lab ของหลักสูตร พาผู้เรียนทำบน AWS Console ทีละขั้น ให้ทุกคนตามทันเนื้อหาในคลาส
• Live Troubleshooting: แก้ปัญหาที่เกิดขึ้นระหว่างทำ Lab แบบสดๆ เพื่อให้ผู้สอนและผู้เรียนเดินหน้าต่อได้โดยไม่สะดุด

[ IT Support ]
• Team Support: ซัพพอร์ตทีม Education & Enterprise ในงานที่เกี่ยวกับ AWS และคำขอด้านเทคนิคในแต่ละวัน
• ช่วงที่ไม่ได้เข้าอบรม: คอยช่วยเหลือทีมในงานต่างๆ และออกงาน Event ร่วมกับทีมเพื่อช่วยซัพพอร์ต เช่น Quick Workshop, Kiro Workshop และ AWS Workshop`,
  },
  {
    slug: "a-host-internship",
    section: "work",
    title: "Software Developer (Internship) @ A-HOST",
    role: "Software Developer Intern · A-HOST Co., Ltd.",
    year: "2026",
    stack: ["Power Platform", "SQL Server", "D365 API", "QA"],
    desc: "ฝึกงานตำแหน่ง Software Developer ดูแลการพัฒนาโปรเจกต์ Petty Cash App, ระบบ Asset Audit และทำหน้าที่เป็น QA (Tester) ตรวจสอบระบบแบบ Full Loop",
    image: "/images/intern.jpg",
    video: null,
    details: `ประสบการณ์ฝึกงานพัฒนาซอฟต์แวร์และระบบองค์กร ประกอบด้วย 3 โปรเจกต์หลัก:

[ Project 1: Petty Cash Application ]
• UI/UX Implementation: พัฒนาแอปพลิเคชัน Petty Cash ด้วย Power Apps โดยแกะดีไซน์จาก Figma เป็น Functional App
• User Experience: ออกแบบ Component เช่น Gallery และ Popup ให้ใช้งานง่ายตาม Flow ธุรกิจ
• Requirement Matching: ปรับปรุงระบบตาม Feedback เพื่อตอบโจทย์การเบิกจ่ายจริงขององค์กร

[ Project 2: Asset Audit System ]
• Database Management: เขียน Stored Procedure บน SSMS เพื่อจัดการ Data Versioning ที่ซับซ้อน
• System Integration: สร้าง Flow บน Power Automate เชื่อมต่อ API (D365) เพื่อดึงข้อมูลสินทรัพย์
• Data Handling: พัฒนาการดึงข้อมูลพักใน Collection เพื่อเพิ่มประสิทธิภาพในการเรียกดู

[ Project 3: Quality Assurance (Tester) ]
• Manual Testing: ดำเนินการทดสอบระบบแบบ Full Loop Test เพื่อจำลองการใช้งานจริง
• Bug Reporting: วิเคราะห์และรายงาน Bug ให้กับพี่เลี้ยงเพื่อปรับปรุงคุณภาพระบบ
• Technical Writing: จัดทำและแก้ไข User Manual เพื่อความเข้าใจของผู้ใช้งาน`,
  },
  {
    slug: "signshop-pos",
    section: "work",
    title: "SignShop POS — ระบบหลังบ้านร้านป้าย (SME-Management)",
    role: "Full-stack · Vibe coded",
    year: "2026",
    stack: ["Next.js 15", "React 19", "TypeScript", "Supabase", "Tailwind 4", "Vibe coded"],
    desc: "ระบบหลังบ้านสำหรับร้านป้าย/ร้านพิมพ์ SME ใช้งานโดยเจ้าของร้านคนเดียว ครอบคลุมตั้งแต่รับงานหน้าร้าน ติดตามสถานะงาน ไปจนถึงออกเอกสารบิล A4 แทนการใช้ SMEMOVE",
    image: "/images/POS/home-thumbnail.png",
    video: null,
    github: null,
    live: "https://d1ztyhp3mm72xg.cloudfront.net/dashboard",
    liveLabel: "Live demo",
    gallery: [
      { src: "/images/POS/home-thumbnail.png", caption: "หน้าแรกของร้าน — ลูกค้าสั่งงานออนไลน์และติดตามงานได้เอง" },
      { src: "/images/POS/POS.png", caption: "หน้า POS — เลือกลูกค้า สินค้า และคิดราคาตามสูตรของแต่ละแบบ พร้อมเลือกโหมด VAT" },
      { src: "/images/POS/dashboard.png", caption: "Dashboard — งานทั้งหมด งานค้าง งานด่วน และงานที่เสร็จวันนี้" },
      { src: "/images/POS/kanbanboard.png", caption: "สถานะงาน — Kanban 5 คอลัมน์ ลากการ์ดเพื่อเปลี่ยนสถานะ" },
      { src: "/images/POS/cost.png", caption: "สรุปยอดขาย — ยอดรายวัน/สัปดาห์/เดือน เงินที่รับจริงและยอดค้างรับ" },
    ],
    details: `ระบบหลังบ้านร้านป้าย/ร้านพิมพ์ SME (ชื่อร้านในข้อมูล seed คือ "ป้าย@ก็รัก") ออกแบบสำหรับผู้ใช้คนเดียวแบบ single admin เพื่อแทนการใช้ SMEMOVE ตั้งแต่รับงานหน้าร้าน → ติดตามสถานะงาน → ออกเอกสารบิลแบบพิมพ์ A4

• Tech Stack: Next.js 15 (App Router) + React 19 + TypeScript 5.9, Tailwind 4 + shadcn/ui (base-ui), Supabase (Postgres + Auth) ผ่าน @supabase/ssr, react-hook-form + zod, react-big-calendar, @dnd-kit, motion, sonner — คุม auth ด้วย middleware.ts เรียก updateSession ทุก route ที่ไม่ใช่ static

• โครงหน้าจอ (Route Groups):
- (auth)/login — ล็อกอินด้วย Supabase Auth
- (dashboard) — 10 เมนู: Dashboard, ภาพรวมวันนี้, POS, สถานะงาน (Kanban 5 คอลัมน์ drag & drop), ปฏิทิน deadline, ลูกค้า, ยอดขาย, ใบเสนอราคา, เอกสาร, ตั้งค่า
- (print)/documents/[id] — หน้าพิมพ์ A4 ล้วน ไม่มี sidebar/header ใช้ window.print() + ฟอนต์ Sarabun

• POS & Pricing: เลือกลูกค้า (ขาจร/ประจำ) แล้วเลือกสินค้า 7 แบบ (ไวนิล, สติกเกอร์ A3, PP A3 โปร 10 แถม 10, นามบัตร, สติกเกอร์ custom, ถ่ายเอกสาร, อื่นๆ) แต่ละแบบมีฟอร์ม specs และสูตรราคาของตัวเอง ปรับราคาด้วย pricing_options (price_factor + fee) ที่แก้ได้จากหน้าตั้งค่า และบันทึกผ่าน RPC create_order_with_jobs แบบ atomic (สร้าง order + order_items + jobs ทีเดียว 1 job ต่อ 1 รายการ)

• Payment & VAT: รองรับการชำระ 3 แบบ (จ่ายเต็ม / มัดจำ / ยังไม่ชำระ) เก็บ paid_amount และเก็บยอดคงเหลือตอนรับงานผ่าน RPC settle_order_balance · VAT 3 โหมดต่อบิล (ไม่มี / รวมใน / แยกนอก) พร้อม snapshot อัตราไว้ในออเดอร์ เพื่อให้พิมพ์เอกสารย้อนหลังได้ตัวเลขเดิม

• Documents: 4 ประเภท — QT ใบเสนอราคา, IN ใบวางบิล/ใบส่งของ, DO ใบส่งของ (retired รวมเข้า IN), BI ใบเสร็จ · เลขที่รันในฐานข้อมูลผ่าน RPC next_document_number แบบล็อกแถว ({PREFIX}-{9 หลัก}) ไม่คำนวณฝั่ง browser ออกเอกสารด้วย issue_document แล้วพิมพ์ซ้ำได้เลขเดิมเสมอ · เขียนตัวแบ่งหน้าเองใน documents.ts โดยคำนวณจากงบมิลลิเมตรของ A4 เพื่อกันยอดรวมถูกตัดกลางหน้า และ baht-text.ts แปลงจำนวนเงินเป็นตัวอักษรไทย

• Quotation Flow: สร้าง QT ก่อนมีการขาย (เก็บแยกจาก orders) → กด "เปิดใน POS" เพื่อโยนรายการเข้าตะกร้า → ปิดการขายตามปกติ → ผูก converted_order_id (unique = แปลงได้ครั้งเดียว) และตั้งสถานะ accepted

• Notifications: derive สดจาก orders/jobs/quotations ไม่เก็บเป็น table เก็บเฉพาะการกดปิดใน notification_dismissals

[ สถานะโปรเจกต์ ]
• Migration 001–018 อยู่ใน supabase/migrations/ · ตาม tasks.md: Phase 0–6 เสร็จแล้ว
• Phase 7 (ใบเสนอราคา) ทำถึงหน้า list + หน้าสร้าง ส่วนหน้า [id] สำหรับแก้/พิมพ์/เปิดใน POS ยังค้าง
• Phase 8 (ตรวจงาน, รัน migration บน Supabase, ทดสอบ end-to-end, ทดสอบพิมพ์จริง) ยังไม่ได้ทำ — จำนวนแถวต่อหน้าของตัวแบ่งหน้าเอกสารยังเป็นค่าประมาณที่ยังไม่เคยเทียบกับกระดาษจริง`,
  },
  {
    slug: "iexpense",
    section: "work",
    title: "iExpense — Money Flow",
    role: "Full-stack · Vibe coded · AWS (S3 + CloudFront) & Vercel",
    year: "2026",
    stack: ["Amazon S3", "CloudFront", "Vue 3", "TypeScript", "Vite", "Supabase", "Vercel", "Vibe coded"],
    desc: "แอปบันทึกรายรับรายจ่ายภาษาไทย host บน AWS (Amazon S3 + CloudFront) ล็อกอินผ่าน Supabase Auth มีกราฟวิเคราะห์รายจ่าย และโหมด Demo ให้ลองใช้ทันที (มีสำรองบน Vercel)",
    image: "/images/iexpense/Main.png",
    video: null,
    github: null,
    live: "https://d2lr6s3hzlxn1y.cloudfront.net",
    liveLabel: "Live app (AWS)",
    extraLinks: [{ href: "https://iexpense-swart.vercel.app/", label: "Vercel" }],
    gallery: [
      { src: "/images/iexpense/Main.png", caption: "หน้าหลัก — การ์ดสรุปยอดและรายการธุรกรรม" },
      { src: "/images/iexpense/overall.png", caption: "ภาพรวม — กราฟรายรับรายจ่ายและหมวดหมู่" },
      { src: "/images/iexpense/bubble.png", caption: "ฟองเงิน — ขนาดฟองตามจำนวนครั้งที่จ่ายซ้ำ" },
      { src: "/images/iexpense/auth.png", caption: "หน้าเข้าสู่ระบบ พร้อมปุ่มเข้าโหมด Demo" },
    ],
    details: `แอปบันทึกรายรับรายจ่ายภาษาไทย (Money Flow) พัฒนาแบบ Vibe Coding ด้วย Vue 3 + TypeScript + Vite และใช้ Supabase เป็นฐานข้อมูลและระบบยืนยันตัวตน host หลักบน AWS (S3 + CloudFront) และมีอีกชุดบน Vercel

• Auth & Access: ล็อกอินด้วยอีเมล + รหัสผ่าน ปิดการสมัครสมาชิกเอง (ผู้ดูแลสร้างบัญชีให้) พร้อมฟีเจอร์ลืมรหัสผ่านและหน้าตั้งรหัสใหม่จากลิงก์ในอีเมล
• Data Layer: ตาราง transactions ผูกกับ auth.users เปิด Row Level Security ให้แต่ละคนเห็นเฉพาะข้อมูลของตัวเอง พร้อม index สำหรับ query ตามผู้ใช้และตามวันที่
• Visualization: การ์ดสรุปยอด, กราฟแท่งรายรับ-รายจ่าย 6 เดือน, โดนัทแยกหมวดหมู่ที่กดดูรายการในแต่ละสัดส่วนได้ และแท็บ "ฟองเงิน" ที่ขนาดฟองสัมพันธ์กับจำนวนครั้งที่จ่ายซ้ำ
• Insight: วิเคราะห์รายจ่ายรายเดือนเทียบกับเดือนก่อน และ Money Buddy ช่วยคาดการณ์เงินคงเหลือ
• Demo Mode: เข้าดูแอปได้โดยไม่ต้องมีบัญชี ใช้ข้อมูลตัวอย่างย้อนหลัง 6 เดือนในหน่วยความจำ ไม่เรียก Supabase และปิดการเพิ่ม/แก้ไข/ลบทั้งหมด
• Mobile Build: ห่อด้วย Capacitor แล้ว build debug APK บน GitHub Actions (JDK 21 + Android SDK 36) จึงไม่ต้องติดตั้ง Android Studio หรือ Android SDK ในเครื่อง
• Deploy: static SPA ฝังค่า env ตอน build โดยใช้ anon public key เท่านั้นเพื่อความปลอดภัย
- AWS (หลัก): เก็บไฟล์บน Amazon S3 และเสิร์ฟผ่าน Amazon CloudFront (CDN + HTTPS)
- Vercel (สำรอง): iexpense-swart.vercel.app`,
  },

  // ───────────────────────── University projects ─────────────────────────
  // (Volunteer section is intentionally empty for now — add items with section: "volunteer".)
  {
    slug: "gpbl-tni-sit",
    section: "university",
    title: "TNI – SIT Global Project-based Learning (gPBL)",
    role: "International exchange · Shibaura Institute of Technology",
    year: "2025",
    stack: ["Unity", "VR", "C#", "International Team"],
    desc: "โครงการแลกเปลี่ยนเรียนรู้เชิงปฏิบัติการระดับนานาชาติ ร่วมกับ Shibaura Institute of Technology (SIT) ประเทศญี่ปุ่น เพื่อพัฒนาโปรเจกต์เกม Virtual Reality (VR)",
    image: "/images/gpbl.jpg",
    video: "/videos/ghostvr.mp4",
    details: `โปรเจกต์พัฒนาสื่อเสมือนจริงและการทำงานร่วมกับทีมต่างชาติ (สถาบันเทคโนโลยีชิบาอุระ ประเทศญี่ปุ่น)

• VR Development: ร่วมกันออกแบบและพัฒนาเกม VR ด้วย Unity โดยเน้นการสร้าง Interactive Experience ที่น่าตื่นเต้น
• Overcoming Barriers: เผชิญกับความท้าทายด้านการสื่อสารและสไตล์การเขียนโค้ดที่แตกต่างกันระหว่างนักศึกษาไทยและญี่ปุ่น
• Communication Strategy: ปรับตัวโดยใช้ภาษาอังกฤษเป็นหลักในการอธิบาย Logic ของโค้ด และใช้เครื่องมือ Visual ช่วยลดความคลาดเคลื่อนในการสื่อสาร`,
  },
  {
    slug: "insect-bite-detection",
    section: "university",
    title: "AI for Smart Life: Insect Bite Detection",
    role: "Hackathon project",
    year: "2024",
    stack: ["Python", "Streamlit", "Image Classification", "Kaggle"],
    desc: "Hackathon Project — พัฒนา AI ตรวจจับรอยแผลจากแมลงกัดต่อย เพื่อลดภาระค่ารักษาพยาบาลและประเมินอาการเบื้องต้นแก่นักท่องเที่ยว",
    image: "/images/bitebye.jpg",
    video: "/videos/Bitebye Demo.mp4",
    github: "https://github.com/Pongpaii/BugbiteDetector_AI",
    live: null,
    details: `นวัตกรรมปัญญาประดิษฐ์เพื่อช่วยวิเคราะห์ประเภทและระดับความรุนแรงของบาดแผล พัฒนาขึ้นในงาน Hackathon จำกัดเวลา

• Model Development: พัฒนา AI สำหรับเปรียบเทียบภาพรอยแผล โดยใช้ Dataset จาก Kaggle มาวิเคราะห์และคัดเลือก
• Model Training: ดำเนินการ Train Model บน Google Colab พร้อมปรับแต่ง Parameter ให้เหมาะสมกับลักษณะของรอยโรค
• Deployment: สร้าง Web Application ด้วย Streamlit เพื่อให้ผู้ใช้งานสามารถอัปโหลดภาพและรับผลวิเคราะห์ได้ทันที`,
  },

  {
    slug: "ratexchange",
    section: "university",
    title: "Hybrid Application: RateXChange",
    role: "UX/UI Design · Course project",
    year: "2025",
    stack: ["UX/UI Design", "Figma", "Financial App"],
    desc: "การออกแบบแอปพลิเคชัน Hybrid สำหรับการแลกเปลี่ยนเงินตรา (RateXChange) เน้นการสร้างระบบที่ใช้งานง่าย แม่นยำ และตอบโจทย์ผู้ใช้งานยุคดิจิทัล",
    image: "/images/rate.png",
    video: null,
    github: "https://github.com/Emperor13/ReactNativeFinalProject",
    live: "https://www.figma.com/design/GRqPT8humEXzlv1b3nhVel/RateXChange--Copy-?node-id=0-1&t=o0pwbXSgI09TPdkn-1",
    liveLabel: "Figma",
    details: `โปรเจกต์ออกแบบแอปพลิเคชัน Hybrid สำหรับแพลตฟอร์ม RateXChange

• UI/UX Design: ออกแบบหน้าจอ Interface ที่มีความเป็นโมเดิร์น สบายตา และจัดวางตำแหน่งข้อมูลทางการเงินให้เข้าใจง่ายที่สุด
• Design System: กำหนด Component และ Style Guide บน Figma เพื่อความสม่ำเสมอของดีไซน์ในทุกๆ หน้าจอ
• Prototype Development: สร้าง Flow การจำลองการใช้งาน (Interaction) เพื่อให้เห็นภาพการทำงานจริงของระบบได้อย่างสมบูรณ์`,
  },
  {
    slug: "tcg-banban",
    section: "university",
    title: "TCG บ้านบ้าน – เช็คราคา หาเด็ค การ์ดโปเกม่อน",
    role: "Web application · Course project",
    year: "2025",
    stack: ["Laravel", "PHP", "SQL", "Bootstrap"],
    desc: "แพลตฟอร์มศูนย์กลางสำหรับผู้เล่นการ์ดโปเกม่อนในไทย ช่วยแก้ปัญหาเรื่องการเช็คราคาการ์ดที่ผันผวน",
    image: "/images/mb1.png",
    video: "/videos/tcgbanban1.mp4",
    github: "https://github.com/Pongpaii/Banban-TCG",
    live: null,
    details: `เว็บแอปพลิเคชัน E-Commerce และ Community สำหรับกลุ่มผู้เล่น Trading Card Game (TCG) ในประเทศไทย

• Price Tracker: พัฒนาระบบเช็คราคากลางของการ์ดโปเกม่อน เพื่อให้ผู้ซื้อและผู้ขายมีมาตรฐานอ้างอิงที่เชื่อถือได้
• Search Optimization: ออกแบบระบบ Search และ Filter ที่ละเอียด (เช่น ค้นหาตามชื่อ, ชุดการ์ด, หรือความหายาก) เพื่อประสบการณ์การใช้งานที่ดีที่สุด
• Inventory Management: วางโครงสร้างหลังบ้านในการจัดการสต็อกการ์ดและข้อมูลรายละเอียดการ์ดแต่ละใบ`,
  },
  {
    slug: "inclusive-design-hearing-impaired",
    section: "university",
    title: "Inclusive Design: App for Hearing Impaired",
    role: "UX Research · Final project",
    year: "2024",
    stack: ["UX Research", "Design System", "Pixel Perfect", "Figma"],
    desc: "การออกแบบแอปพลิเคชันเพื่อส่งเสริมคุณภาพชีวิตของผู้พิการทางการได้ยิน โดยเน้นกระบวนการทำ User Research และการออกแบบที่ตอบโจทย์ความต้องการที่แท้จริง",
    image: "/images/CCynC.jpg",
    video: null,
    github: null,
    live: "https://www.figma.com/design/vhDmEIquvKlmrN6EPdDcHO/UX-UI--Copy-?node-id=0-1&p=f",
    liveLabel: "Prototype",
    details: `โปรเจกต์จบ (Final Project) ออกแบบนวัตกรรมดิจิทัลตามหลัก Inclusive Design เพื่อส่งเสริมคุณภาพชีวิตของผู้พิการทางการได้ยิน

• User Interview: ร่วมสัมภาษณ์และเก็บข้อมูลจากผู้เชี่ยวชาญ (ศิษย์เก่า) ที่ทำงานใกล้ชิดกับผู้พิการทางการได้ยิน เพื่อหา Insight ที่แท้จริง
• Design System: วางโครงสร้าง Design System ให้กับ Prototype เพื่อความสม่ำเสมอและความเป็นมืออาชีพของงานออกแบบ
• UI Refinement: ปรับปรุง Prototype ด้วยหลักการ Pixel Perfect เพื่อให้งานออกแบบมีความแม่นยำและสมบูรณ์ที่สุดก่อนนำไปทดสอบ

[ Key Research Insights ]
• Psychological Impact: ผู้พิการทางการได้ยินมักมีความเปราะบางด้านจิตใจร่วมด้วย เนื่องจากการเติบโตในสังคมแบบปิด
• Social Barrier: มีความกังวลในการใช้ชีวิตในสังคมทั่วไป และมักจะเลือกสื่อสารภายในกลุ่มคนที่มีลักษณะเดียวกัน
• App Usage: ใช้งานแอปทั่วไปได้ปกติ แต่จะมีปัญหาอย่างมากกับแอปกลุ่มมัลติมีเดีย (เช่น YouTube) ที่ไม่มีฟีเจอร์รองรับการเข้าถึงข้อมูลที่ชัดเจน`,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projects in a section. Work keeps hand-picked array order; others are newest year first. */
export function projectsBySection(section: ProjectSection): Project[] {
  return projects
    .filter((p) => p.section === section)
    .sort((a, b) => (section === "work" ? 0 : Number(b.year) - Number(a.year)));
}

export function sectionMeta(section: ProjectSection) {
  return sections.find((s) => s.id === section)!;
}

/** Projects in display order (section order, then array order) — used for prev/next. */
export function orderedProjects(): Project[] {
  return sections.flatMap((s) => projectsBySection(s.id));
}
