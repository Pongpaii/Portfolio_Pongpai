"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { SiGithub } from "react-icons/si";

type Project = {
  title: string;
  year: string;
  category: "Product" | "Design" | "AI" | "Creative";
  stack: string[];
  desc: string;
  image: string | null;
  video?: string | null;
  github?: string | null;
  live?: string | null;
  liveLabel?: string;
  details: string;
  gallery?: { src: string; caption: string }[];
};

const projects: Project[] = [
  {
    title: "Hybrid Application: RateXChange",
    year: "2025",
    category: "Design",
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
    title: "Software Developer (Internship) @ A-HOST",
    year: "2026",
    category: "Product",
    stack: ["Power Platform", "SQL Server", "D365 API", "QA"],
    desc: "ฝึกงานตำแหน่ง Software Developer ดูแลการพัฒนาโปรเจกต์ Petty Cash App, ระบบ Asset Audit และทำหน้าที่เป็น QA (Tester) ตรวจสอบระบบแบบ Full Loop",
    image: "/images/intern.jpg",
    video: null,
    details: `ประสบการณ์ฝึกงานพัฒนาซอฟต์แวร์และระบบองค์กร ประกอบด้วย 3 โปรเจกต์หลัก:

• Project 1: Petty Cash Application
- UI/UX Implementation: พัฒนาแอปพลิเคชัน Petty Cash ด้วย Power Apps โดยแกะดีไซน์จาก Figma เป็น Functional App
- User Experience: ออกแบบ Component เช่น Gallery และ Popup ให้ใช้งานง่ายตาม Flow ธุรกิจ
- Requirement Matching: ปรับปรุงระบบตาม Feedback เพื่อตอบโจทย์การเบิกจ่ายจริงขององค์กร

• Project 2: Asset Audit System
- Database Management: เขียน Stored Procedure บน SSMS เพื่อจัดการ Data Versioning ที่ซับซ้อน
- System Integration: สร้าง Flow บน Power Automate เชื่อมต่อ API (D365) เพื่อดึงข้อมูลสินทรัพย์
- Data Handling: พัฒนาการดึงข้อมูลพักใน Collection เพื่อเพิ่มประสิทธิภาพในการเรียกดู

• Project 3: Quality Assurance (Tester)
- Manual Testing: ดำเนินการทดสอบระบบแบบ Full Loop Test เพื่อจำลองการใช้งานจริง
- Bug Reporting: วิเคราะห์และรายงาน Bug ให้กับพี่เลี้ยงเพื่อปรับปรุงคุณภาพระบบ
- Technical Writing: จัดทำและแก้ไข User Manual เพื่อความเข้าใจของผู้ใช้งาน`,
  },
  {
    title: "iExpense — Money Flow",
    year: "2026",
    category: "Product",
    stack: ["Vue 3", "TypeScript", "Vite", "Supabase", "Capacitor", "Vibe coded"],
    desc: "แอปบันทึกรายรับรายจ่ายภาษาไทย ล็อกอินผ่าน Supabase Auth มีกราฟวิเคราะห์รายจ่าย โหมด Demo ให้ลองใช้ทันที และ build เป็น APK Android ผ่าน GitHub Actions",
    image: "/images/iexpense/Main.png",
    video: null,
    github: null,
    live: "https://iexpense-swart.vercel.app/",
    liveLabel: "Live app",
    gallery: [
      { src: "/images/iexpense/Main.png", caption: "หน้าหลัก — การ์ดสรุปยอดและรายการธุรกรรม" },
      { src: "/images/iexpense/overall.png", caption: "ภาพรวม — กราฟรายรับรายจ่ายและหมวดหมู่" },
      { src: "/images/iexpense/bubble.png", caption: "ฟองเงิน — ขนาดฟองตามจำนวนครั้งที่จ่ายซ้ำ" },
      { src: "/images/iexpense/auth.png", caption: "หน้าเข้าสู่ระบบ พร้อมปุ่มเข้าโหมด Demo" },
    ],
    details: `แอปบันทึกรายรับรายจ่ายภาษาไทย (Money Flow) พัฒนาแบบ Vibe Coding ด้วย Vue 3 + TypeScript + Vite และใช้ Supabase เป็นฐานข้อมูลและระบบยืนยันตัวตน

• Auth & Access: ล็อกอินด้วยอีเมล + รหัสผ่าน ปิดการสมัครสมาชิกเอง (ผู้ดูแลสร้างบัญชีให้) พร้อมฟีเจอร์ลืมรหัสผ่านและหน้าตั้งรหัสใหม่จากลิงก์ในอีเมล
• Data Layer: ตาราง transactions ผูกกับ auth.users เปิด Row Level Security ให้แต่ละคนเห็นเฉพาะข้อมูลของตัวเอง พร้อม index สำหรับ query ตามผู้ใช้และตามวันที่
• Visualization: การ์ดสรุปยอด, กราฟแท่งรายรับ-รายจ่าย 6 เดือน, โดนัทแยกหมวดหมู่ที่กดดูรายการในแต่ละสัดส่วนได้ และแท็บ "ฟองเงิน" ที่ขนาดฟองสัมพันธ์กับจำนวนครั้งที่จ่ายซ้ำ
• Insight: วิเคราะห์รายจ่ายรายเดือนเทียบกับเดือนก่อน และ Money Buddy ช่วยคาดการณ์เงินคงเหลือ
• Demo Mode: เข้าดูแอปได้โดยไม่ต้องมีบัญชี ใช้ข้อมูลตัวอย่างย้อนหลัง 6 เดือนในหน่วยความจำ ไม่เรียก Supabase และปิดการเพิ่ม/แก้ไข/ลบทั้งหมด
• Mobile Build: ห่อด้วย Capacitor แล้ว build debug APK บน GitHub Actions (JDK 21 + Android SDK 36) จึงไม่ต้องติดตั้ง Android Studio หรือ Android SDK ในเครื่อง
• Deploy: static SPA บน Vercel ฝังค่า env ตอน build โดยใช้ anon public key เท่านั้นเพื่อความปลอดภัย`,
  },
  {
    title: "SignShop POS — ระบบหลังบ้านร้านป้าย (SME-Management)",
    year: "2026",
    category: "Product",
    stack: ["Next.js 15", "React 19", "TypeScript", "Supabase", "Tailwind 4", "Vibe coded"],
    desc: "ระบบหลังบ้านสำหรับร้านป้าย/ร้านพิมพ์ SME ใช้งานโดยเจ้าของร้านคนเดียว ครอบคลุมตั้งแต่รับงานหน้าร้าน ติดตามสถานะงาน ไปจนถึงออกเอกสารบิล A4 แทนการใช้ SMEMOVE",
    image: "/images/POS/POS.png",
    video: null,
    github: null,
    live: null,
    gallery: [
      { src: "/images/POS/POS.png", caption: "หน้า POS — เลือกลูกค้า สินค้า และคิดราคาตามสูตรของแต่ละแบบ" },
      { src: "/images/POS/dashboard.png", caption: "Dashboard — ภาพรวมยอดขายและงานที่ต้องติดตาม" },
      { src: "/images/POS/Board.png", caption: "สถานะงาน — Kanban 5 คอลัมน์ ลากย้ายงานได้" },
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
    title: "AI for Smart Life: Insect Bite Detection",
    year: "2024",
    category: "AI",
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
    title: "TNI – SIT Global Project-based Learning (gPBL)",
    year: "2024",
    category: "Product",
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
    title: "Inclusive Design: App for Hearing Impaired",
    year: "2024",
    category: "Design",
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
  {
    title: "TCG บ้านบ้าน – เช็คราคา หาเด็ค การ์ดโปเกม่อน",
    year: "2025",
    category: "Product",
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
    title: "Content Creator & Animator | Poip Animation",
    year: "2024",
    category: "Creative",
    stack: ["2D Animation", "Content Strategy", "Data Analysis"],
    desc: "ดูแลการผลิตคอนเทนต์แอนิเมชันแบบครบวงจร บน YouTube & TikTok จนมียอดผู้ติดตามมากกว่า 40,000+ Followers",
    image: "/images/content.jpg",
    video: null,
    github: null,
    live: null,
    details: `บริหารช่องและผลิตสื่ออนิเมชัน Poip Animation ควบคู่กับการวิเคราะห์ Data เพื่อสร้างการเติบโตของ Community

• Content Production: บริหารจัดการการผลิต 2D Animation บน YouTube & TikTok ตั้งแต่ต้นจนจบ จนมียอดผู้ติดตามมากกว่า 40,000+ followers
• Strategy & Lifecycle: รับผิดชอบ Creative Lifecycle ทั้งหมดด้วยตัวเอง ตั้งแต่การเขียนบท (Scripting), ทำ Storyboard, ตัดต่อ ไปจนถึงการตลาด
• Performance Optimization: เพิ่ม Viewer Retention ด้วยเทคนิค "Hook" และ "Cliffhanger" พร้อมทั้งวิเคราะห์ค่า CTR/AVD เพื่อนำมาปรับปรุงกลยุทธ์คอนเทนต์
• Data-Driven Results: ใช้ระบบวิเคราะห์ข้อมูลสถิติหลังบ้าน เพื่อทำความเข้าใจพฤติกรรมผู้ชมและปรับจังหวะการเล่าเรื่องให้ดึงดูดที่สุด`,
  },
];

const filters = ["All", "Product", "Design", "AI", "Creative"] as const;

function ProjectCard({
  p,
  index,
  inView,
  onOpen,
}: {
  p: Project;
  index: number;
  inView: boolean;
  onOpen: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="card"
    >
      <button
        type="button"
        onClick={onOpen}
        className="card-media"
        aria-label={`Open details for ${p.title}`}
        style={{
          border: 0,
          padding: 0,
          cursor: "pointer",
          display: "block",
          width: "100%",
          background: p.image
            ? undefined
            : "radial-gradient(120% 120% at 15% 0%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 60%), var(--bg-2)",
        }}
      >
        {p.image ? (
          <Image
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-width: 720px) 100vw, 380px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span
            className="display"
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              padding: "1rem",
              textAlign: "center",
              fontSize: "1.1rem",
              color: "var(--text-2)",
            }}
          >
            {p.title}
          </span>
        )}
        {p.video && (
          <span
            className="mono"
            style={{
              position: "absolute",
              top: "0.7rem",
              left: "0.7rem",
              zIndex: 2,
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.25rem 0.5rem",
              borderRadius: 999,
              background: "rgba(0,0,0,0.55)",
              color: "#fff",
              backdropFilter: "blur(6px)",
            }}
          >
            ▶ Demo
          </span>
        )}
      </button>

      <div style={{ padding: "1.15rem 1.25rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.75rem" }}>
          <h3
            onClick={onOpen}
            style={{
              fontSize: "0.97rem",
              fontWeight: 600,
              letterSpacing: "-0.015em",
              lineHeight: 1.35,
              cursor: "pointer",
            }}
          >
            {p.title}
          </h3>
          <span className="mono" style={{ fontSize: "0.68rem", color: "var(--text-3)" }}>
            {p.year}
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {p.stack.slice(0, 3).map((t) => (
            <span
              key={t}
              className="mono"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--text-3)",
                border: "1px solid var(--border)",
                borderRadius: 999,
                padding: "0.2rem 0.5rem",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <p style={{ fontSize: "0.84rem", color: "var(--text-2)", lineHeight: 1.7, flex: 1 }}>{p.desc}</p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
          <button type="button" onClick={onOpen} className="link-arrow" style={{ background: "none", border: 0, cursor: "pointer" }}>
            Read details <ArrowUpRight size={14} />
          </button>
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="link-arrow" aria-label={`${p.title} source code`}>
              <SiGithub size={14} /> Code
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="link-arrow" style={{ color: "var(--accent)" }}>
              {p.liveLabel ?? "Live"} <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  useEffect(() => {
    if (!selected) return;
    document.body.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <section id="projects" ref={ref} className="section" style={{ background: "var(--bg-2)" }}>
      <div className="shell">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1.5rem",
            flexWrap: "wrap",
            marginBottom: "2.75rem",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow" style={{ marginBottom: "1.1rem" }}>
              Selected work
            </p>
            <h2 className="section-title">Things I&apos;ve designed, built and shipped</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
            role="group"
            aria-label="Filter projects by category"
          >
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className="chip"
                style={{
                  cursor: "pointer",
                  color: filter === f ? "var(--accent-contrast)" : "var(--text-2)",
                  background: filter === f ? "var(--text)" : "var(--surface)",
                  borderColor: filter === f ? "var(--text)" : "var(--border)",
                }}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid-auto">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard key={p.title} p={p} index={i} inView={inView} onOpen={() => setSelected(p)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 130,
              display: "grid",
              placeItems: "center",
              padding: "1.25rem",
              background: "color-mix(in srgb, var(--bg) 78%, transparent)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass"
              style={{
                width: "100%",
                maxWidth: 780,
                maxHeight: "88vh",
                overflowY: "auto",
                borderRadius: 20,
                background: "var(--bg)",
                boxShadow: "var(--shadow-lg)",
                position: "relative",
              }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="icon-btn"
                aria-label="Close details"
                style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 3, background: "var(--bg)" }}
              >
                <X size={16} />
              </button>

              {selected.video ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  style={{
                    width: "100%",
                    maxHeight: 420,
                    objectFit: "contain",
                    background: "#000",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <source src={selected.video} type="video/mp4" />
                </video>
              ) : (
                selected.image && (
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderBottom: "1px solid var(--border)" }}>
                    <Image
                      src={selected.image}
                      alt={selected.title}
                      fill
                      sizes="780px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )
              )}

              <div style={{ padding: "clamp(1.5rem, 4vw, 2.5rem)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
                  <h2 className="display" style={{ fontSize: "clamp(1.25rem, 3vw, 1.6rem)" }}>
                    {selected.title}
                  </h2>
                  <span className="mono" style={{ fontSize: "0.72rem", color: "var(--text-3)" }}>
                    {selected.year}
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", margin: "1rem 0 1.5rem" }}>
                  {selected.stack.map((t) => (
                    <span key={t} className="chip" style={{ fontSize: "0.7rem" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: "1.5rem",
                    whiteSpace: "pre-line",
                    fontSize: "0.92rem",
                    lineHeight: 1.85,
                    color: "var(--text-2)",
                  }}
                >
                  {selected.details}
                </div>

                {selected.gallery && selected.gallery.length > 0 && (
                  <div style={{ marginTop: "2rem" }}>
                    <p
                      className="mono"
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.13em",
                        textTransform: "uppercase",
                        color: "var(--text-3)",
                        marginBottom: "0.9rem",
                      }}
                    >
                      Screens
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gap: "0.9rem",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                      }}
                    >
                      {selected.gallery.map((shot) => (
                        <figure key={shot.src} style={{ margin: 0 }}>
                          <a
                            href={shot.src}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              position: "relative",
                              display: "block",
                              aspectRatio: "2 / 1",
                              borderRadius: 12,
                              overflow: "hidden",
                              border: "1px solid var(--border)",
                              background: "var(--bg-2)",
                            }}
                          >
                            <Image
                              src={shot.src}
                              alt={shot.caption}
                              fill
                              sizes="(max-width: 720px) 100vw, 340px"
                              style={{ objectFit: "cover" }}
                            />
                          </a>
                          <figcaption
                            style={{
                              fontSize: "0.72rem",
                              color: "var(--text-3)",
                              lineHeight: 1.55,
                              marginTop: "0.45rem",
                            }}
                          >
                            {shot.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                )}

                {(selected.github || selected.live) && (
                  <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1.75rem" }}>
                    {selected.github && (
                      <a href={selected.github} target="_blank" rel="noreferrer" className="btn btn-sm">
                        <SiGithub size={14} /> View code <ArrowUpRight size={13} />
                      </a>
                    )}
                    {selected.live && (
                      <a href={selected.live} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                        {selected.liveLabel ?? "Live"} <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
