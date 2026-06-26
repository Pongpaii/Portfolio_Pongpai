"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const projects = [
  {
    title: "Hybrid Application: RateXChange",
    year: "2025",
    stack: "UX/UI Design · Figma · Financial App",
    desc: "การออกแบบแอปพลิเคชัน Hybrid สำหรับการแลกเปลี่ยนเงินตรา (RateXChange) เน้นการสร้างระบบที่ใช้งานง่าย แม่นยำ และตอบโจทย์ผู้ใช้งานยุคดิจิทัล",
    image: "/images/rate.png", 
    video: null,
    github: "https://github.com/Emperor13/ReactNativeFinalProject",
    live: "https://www.figma.com/design/GRqPT8humEXzlv1b3nhVel/RateXChange--Copy-?node-id=0-1&t=o0pwbXSgI09TPdkn-1",
    details: `โปรเจกต์ออกแบบแอปพลิเคชัน Hybrid สำหรับแพลตฟอร์ม RateXChange 

• UI/UX Design: ออกแบบหน้าจอ Interface ที่มีความเป็นโมเดิร์น สบายตา และจัดวางตำแหน่งข้อมูลทางการเงินให้เข้าใจง่ายที่สุด
• Design System: กำหนด Component และ Style Guide บน Figma เพื่อความสม่ำเสมอของดีไซน์ในทุกๆ หน้าจอ
• Prototype Development: สร้าง Flow การจำลองการใช้งาน (Interaction) เพื่อให้เห็นภาพการทำงานจริงของระบบได้อย่างสมบูรณ์`,
  },
  {
    title: "Software Developer (Internship)",
    year: "2025",
    stack: "Power Platform · SQL Server · D365 API",
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
    title: "AI for Smart Life: Insect Bite Detection",
    year: "2024",
    stack: "Python · Streamlit · Image Classification · Kaggle",
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
    title: "TNI - SIT Global Project-based Learning (gPBL)",
    year: "2024",
    stack: "Unity · VR Development · C# · International Collaboration",
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
    stack: "UX Research · Design System · Pixel Perfect · Figma",
    desc: "การออกแบบแอปพลิเคชันเพื่อส่งเสริมคุณภาพชีวิตของผู้พิการทางการได้ยิน โดยเน้นกระบวนการทำ User Research และการออกแบบที่ตอบโจทย์ความต้องการที่แท้จริง",
    image: "/images/CCynC.jpg",
    video: null,
    github: null,
    live: "https://www.figma.com/design/vhDmEIquvKlmrN6EPdDcHO/UX-UI--Copy-?node-id=0-1&p=f",
    details: `โปรเจกต์จบ (Final Project) ออกแบบนวัตกรรมดิจิทัลตามหลัก Inclusive Design เพื่อส่งเสริมคุณภาพชีวิตของผู้พิการทางการได้ยิน

• User Interview: ร่วมสัมภาษณ์และเก็บข้อมูลจากผู้เชี่ยวชาญ (ศิษย์เก่า) ที่ทำงานใกล้ชิดกับผู้พิการทางการได้ยิน เพื่อหา Insight ที่แท้จริง
• Design System: วางโครงสร้าง Design System ให้กับ Prototype เพื่อความสม่ำเสมอและความเป็นมืออาชีพของงานออกแบบ
• UI Refinement: ปรับปรุง Prototype ด้วยหลักการ Pixel Perfect เพื่อให้งานออกแบบมีความแม่นยำและสมบูรณ์ที่สุดก่อนนำไปทดสอบ

[ Key Research Insights ]
• Psychological Impact: ผู้พิการทางการได้ยินมักมีความเปราะบางด้านจิตใจร่วมด้วย เนื่องจากการเติบโตในสังคมแบบปิด
• Social Barrier: มีความกังวลในการใช้ชีวิตในสังคมทั่วไป และมักจะเลือกสื่อสารภายในกลุ่มคนที่มีลักษณะเดียวกัน
• App Usage: ใช้งานแอปทั่วไปได้ปกติ แต่จะมีปัญหาอย่างมากกับแอปกลุ่มมัลติมีเดีย (เช่น YouTube) ที่ไม่มีฟีเจอร์รองรับการเข้าถึงข้อมูลที่ชัดเจน`,
  },
  {    title: "TCG บ้านบ้าน – เช็คราคา หาเด็ค การ์ดโปเกม่อน",
    year: "2025",
    stack: "Laravel · PHP · SQL · Bootstrap",
    desc: "แพลตฟอร์มศูนย์กลางสำหรับผู้เล่นการ์ดโปเกม่อนในไทย ช่วยแก้ปัญหาเรื่องการเช็คราคาการ์ดที่ผันผวน ",
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
    stack: "2D Animation · Content Strategy · Data Analysis",
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

function ProjectCard({ p, i, inView, onOpenDetails }: any) {
  const [hovered, setHovered] = useState(false);
  
  // เช็คเงื่อนไขชื่อโปรเจกต์ เพื่อเปลี่ยนข้อความบนปุ่ม
  const isHearingApp = p.title.includes("Hearing");
  const isHybridApp = p.title.includes("Hybrid");

  // เลือกข้อความแสดงผลบนปุ่มตามเงื่อนไข
  let liveButtonText = "LIVE ↗";
  if (isHybridApp) {
    liveButtonText = "FIGMA ↗";
  } else if (isHearingApp) {
    liveButtonText = "PROTOTYPE ↗";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? "#000000" : "#e5e5e5"}`,
        borderRadius: "4px",
        overflow: "hidden",
        transition: "border-color 0.25s",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
      }}
    >
      {/* Cover Image */}
      <div 
        onClick={onOpenDetails}
        style={{
          height: "180px",
          background: hovered ? "#f5f5f5" : "#fafafa",
          transition: "background 0.3s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #e5e5e5",
          cursor: "pointer"
        }}
      >
        {p.image ? (
          <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ padding: "0 1.5rem", textAlign: "center" }}>
            <span style={{ fontSize: "0.75rem", color: "#737373", letterSpacing: "0.1em", fontWeight: 600 }}>
              {p.title.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Card Contents */}
      <div style={{ padding: "1.25rem 1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h3 
            onClick={onOpenDetails}
            style={{ fontSize: "0.95rem", fontWeight: 700, letterSpacing: "-0.02em", cursor: "pointer", color: "#171717", lineHeight: 1.3 }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            {p.title}
          </h3>
          <span style={{ fontSize: "0.72rem", color: "#737373", marginLeft: "0.5rem" }}>{p.year}</span>
        </div>
        <p style={{ fontSize: "0.72rem", color: "#737373", letterSpacing: "0.04em" }}>{p.stack}</p>
        <p style={{ fontSize: "0.82rem", color: "#404040", lineHeight: 1.6, flex: 1 }}>{p.desc}</p>

        <button
          onClick={onOpenDetails}
          style={{
            alignSelf: "flex-start",
            background: "none",
            border: "none",
            color: "#171717",
            fontSize: "0.75rem",
            fontWeight: 600,
            cursor: "pointer",
            padding: "4px 0",
            textDecoration: "underline",
            marginBottom: "0.5rem",
            opacity: 0.8
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
        >
          READ DETAILS →
        </button>

        <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" style={{
              flex: 1, padding: "8px 0", textAlign: "center",
              border: "1px solid #e5e5e5", borderRadius: "2px",
              fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
              color: "#171717", transition: "all 0.2s", textDecoration: "none"
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#171717";
                (e.currentTarget as HTMLElement).style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#171717";
              }}
            >
              CODE ↗
            </a>
          )}
          {p.live ? (
            <a href={p.live} target="_blank" rel="noreferrer" style={{
              flex: 1, padding: "8px 0", textAlign: "center",
              background: (isHearingApp || isHybridApp) ? "#0F6E56" : "#171717",
              borderRadius: "2px", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
              color: "#ffffff", transition: "opacity 0.2s", textDecoration: "none"
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              {liveButtonText}
            </a>
          ) : (
            p.github && (
              <span style={{
                flex: 1, padding: "8px 0", textAlign: "center",
                border: "1px solid #e5e5e5", borderRadius: "2px",
                fontSize: "0.72rem", letterSpacing: "0.08em", color: "#a3a3a3",
              }}>
                NO LIVE
              </span>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject]);

  return (
    <section id="projects" ref={ref} style={{ padding: "7rem 2.5rem", borderBottom: "1px solid #e5e5e5", background: "#fafafa" }}>
      <div style={{ maxWidth: "940px", margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "0.72rem", color: "#737373", letterSpacing: "0.14em", marginBottom: "3rem", fontWeight: 600 }}
        >
          PROJECTS
        </motion.p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {projects.map((p, i) => (
            <ProjectCard 
              key={p.title} 
              p={p} 
              i={i} 
              inView={inView} 
              onOpenDetails={() => setSelectedProject(p)} 
            />
          ))}
        </div>
      </div>

      {/* POPUP DETAIL OVERLAY */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(8px)",
              zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1.5rem"
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#ffffff", border: "1px solid #e5e5e5", borderRadius: "6px", 
                maxWidth: "750px", width: "100%", maxHeight: "85vh", overflowY: "auto", position: "relative",
                boxShadow: "0 30px 60px rgba(0,0,0,0.06)"
              }}
            >
              {/* ปุ่มปิด ✕ */}
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  position: "absolute", top: "1.5rem", right: "1.5rem",
                  background: "none", border: "none", color: "#a3a3a3",
                  fontSize: "1.2rem", cursor: "pointer", zIndex: 10
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#171717")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#a3a3a3")}
              >
                ✕
              </button>

              {/* 🎥 ส่วนแสดงผลมัลติมีเดีย (วิดีโอ หรือ รูปภาพ) ต้นกล่องพ็อพัพ */}
              {selectedProject.video ? (
                <div style={{ width: "100%", background: "#000", borderBottom: "1px solid #e5e5e5", display: "flex" }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "contain" }}
                  >
                    <source src={selectedProject.video} type="video/mp4" />
                  </video>
                </div>
              ) : (
                selectedProject.image && (
                  <div style={{ width: "100%", height: "320px", overflow: "hidden", borderBottom: "1px solid #e5e5e5" }}>
                    <img src={selectedProject.image} alt={selectedProject.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )
              )}

              {/* เนื้อหาข้อความ */}
              <div style={{ padding: "2.5rem 3rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "0.25rem" }}>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#171717", lineHeight: 1.3 }}>
                    {selectedProject.title}
                  </h2>
                  <span style={{ fontSize: "0.85rem", color: "#737373", fontWeight: 500 }}>{selectedProject.year}</span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#737373", letterSpacing: "0.04em", marginBottom: "1.75rem" }}>
                  {selectedProject.stack}
                </p>
                
                <div style={{ 
                  fontSize: "0.95rem", color: "#404040", lineHeight: 1.8, 
                  whiteSpace: "pre-line", borderTop: "1px solid #e5e5e5", paddingTop: "1.75rem" 
                }}>
                  {selectedProject.details}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}