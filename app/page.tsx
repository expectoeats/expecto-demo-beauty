"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, FacebookLogo, InstagramLogo, List, WhatsappLogo, X } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const services = [
  "Bridal Makeup",
  "Party Makeup",
  "Hair Styling",
  "Skin Care",
  "Eyebrows and Threading",
  "Nail Art",
  "Mehendi",
  "Beauty Academy"
];

const gallery = [
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
  "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=400",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400",
  "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400",
  "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400"
];

const testimonials = [
  { quote: "Best makeup artist in Ballia. I am totally satisfied.", name: "Aishwarya Pandey", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" },
  { quote: "Thank you for such flawless and elegant makeup. Highly recommended.", name: "Ankita Singh", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300" },
  { quote: "Very graceful makeup done by Muskan. She understands client requirements perfectly.", name: "Rakhi Verma", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300" },
  { quote: "I had a really nice experience for my bridal makeup. Absolutely loved the work.", name: "Bridal Client", avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300" },
  { quote: "Amazing place, best is the hair and color tone.", name: "Happy Client", avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300" }
];

const heroHighlights = [
  { title: "Bridal Glow Ritual", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500" },
  { title: "Soft Glam Studio", image: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=500" },
  { title: "Luxury Hair Finish", image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500" },
  { title: "Skin Revival Care", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500" }
];

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [plannerService, setPlannerService] = useState("Bridal Makeup");
  const [plannerGuests, setPlannerGuests] = useState(1);
  const [plannerDate, setPlannerDate] = useState("");
  const cursor = useRef<HTMLDivElement>(null);

  const plannerResult = useMemo(() => {
    const base = plannerService === "Bridal Makeup" ? 8500 : plannerService === "Party Makeup" ? 2500 : 1500;
    const total = base + Math.max(0, plannerGuests - 1) * 600;
    const packageName = total > 9000 ? "Royal Bridal Package" : total > 4000 ? "Premium Glow Package" : "Classic Beauty Package";
    return { total, packageName };
  }, [plannerGuests, plannerService]);

  const whatsappHref = useMemo(() => {
    const text = `Hi Muskan Beauty Salon, I want to book ${plannerService} for ${plannerGuests} guest(s) on ${plannerDate || "my preferred date"}. Suggested package: ${plannerResult.packageName}. Estimated budget: Rs ${plannerResult.total}.`;
    return `https://wa.me/918090729585?text=${encodeURIComponent(text)}`;
  }, [plannerDate, plannerGuests, plannerResult.packageName, plannerResult.total, plannerService]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, duration: 1.2, smoothWheel: true, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    const onScroll = () => setScrolled(window.scrollY > 80);
    const onMouse = (e: MouseEvent) => {
      if (!cursor.current || window.innerWidth < 768) return;
      gsap.to(cursor.current, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.08 });
    };
    setTimeout(() => setLoaded(true), 2100);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);
    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  useGSAP(() => {
    gsap.from(".hero-visual", { opacity: 0, y: 30, duration: 0.8, delay: 2.1, stagger: 0.08, ease: "power3.out" });
    gsap.from(".hero-image", { scale: 0.88, opacity: 0, duration: 1, delay: 2.4, ease: "power3.out" });
    gsap.utils.toArray(".reveal").forEach((el: any) => {
      gsap.from(el, { opacity: 0, y: 60, scale: 0.94, duration: 0.85, scrollTrigger: { trigger: el, start: "top 85%" } });
    });
  }, []);

  return (
    <main>
      <div ref={cursor} className="fixed z-[120] hidden h-5 w-5 rounded-full border-2 border-[#D4547A] md:block" />

      <div className={`fixed inset-0 z-[130] flex items-center justify-center bg-[#D4547A] text-white ${loaded ? "loader-up" : ""}`}>
        <p className="font-dancing text-7xl">Muskan</p>
      </div>

      <nav className={`glass-nav fixed top-0 z-50 h-[72px] w-full ${scrolled ? "border-b border-[#F0D0DC]" : ""}`}>
        <div className="max-wrap flex h-full items-center justify-between gap-6">
          <div className="flex items-center gap-3"><span className="text-xl text-[#D4547A]">*</span><div><p className="font-dancing text-4xl leading-none text-[#D4547A]">Muskan</p><p className="font-cormorant text-xs tracking-[0.2em] text-[#B07A8A]">Beauty Salon and Academy</p></div></div>
          <div className="hidden items-center gap-8 md:flex">{["Services", "Gallery", "Academy", "Reviews", "Contact"].map((n) => <a key={n} className="font-cormorant text-lg text-[#6B3A4E] hover:text-[#D4547A]" href={`#${n.toLowerCase()}`}>{n}</a>)}</div>
          <div className="hidden items-center gap-3 md:flex"><button className="pill font-cormorant bg-[#D4547A] px-7 py-3 text-white">Book Appointment</button><button className="grid h-10 w-10 place-items-center rounded-full border-[1.5px] border-[#D4547A] text-[#D4547A]"><WhatsappLogo size={18} /></button></div>
          <button className="md:hidden" onClick={() => setMobileNav(true)}><List size={28} color="#D4547A" /></button>
        </div>
      </nav>

      {mobileNav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] overflow-hidden bg-[#FFF0F5] px-5 pb-8 pt-6"
        >
          <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-[#F5B8CF]/60 blur-2xl" />
          <div className="pointer-events-none absolute -right-16 bottom-24 h-52 w-52 rounded-full bg-[#C8A8D8]/45 blur-2xl" />

          <div className="relative z-10 mx-auto flex h-full max-w-[460px] flex-col">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-dancing text-4xl leading-none text-[#D4547A]">Muskan</p>
                <p className="font-cormorant text-xs tracking-[0.18em] text-[#B07A8A]">BEAUTY SALON AND ACADEMY</p>
              </div>
              <button
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#D4547A]/30 bg-white/80 text-[#6B3A4E]"
                onClick={() => setMobileNav(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="soft-card bg-white/80 p-3">
              {["Services", "Gallery", "Academy", "Reviews", "Contact"].map((n, i) => (
                <motion.a
                  key={n}
                  href={`#${n.toLowerCase()}`}
                  onClick={() => setMobileNav(false)}
                  initial={{ opacity: 0, x: -22 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.05 }}
                  className="group mb-2 flex items-center justify-between rounded-2xl border border-[#F0D0DC] bg-[#FFFAF8] px-4 py-3 last:mb-0"
                >
                  <span className="font-playfair text-[40px] leading-none text-[#2D1420]">{n}</span>
                  <span className="font-cormorant text-lg text-[#B07A8A] transition group-hover:text-[#D4547A]">0{i + 1}</span>
                </motion.a>
              ))}
            </div>

            <div className="mt-auto grid gap-3 pt-6">
              <a
                href="#contact"
                onClick={() => setMobileNav(false)}
                className="pill w-full bg-[#D4547A] py-3 text-center font-cormorant text-2xl text-white"
              >
                Book Appointment
              </a>
              <a
                href="https://wa.me/918090729585"
                target="_blank"
                className="pill w-full border border-[#25D366] bg-[#25D366]/90 py-3 text-center font-cormorant text-2xl text-white"
              >
                WhatsApp Quick Chat
              </a>
            </div>
          </div>
        </motion.div>
      )}

      <section className="bg-pattern-rose relative min-h-screen overflow-hidden pt-[72px]">
        <div className="h-11 overflow-hidden bg-gradient-to-r from-[#D4547A] via-[#E87FA8] to-[#D4547A]"><div className="marquee flex w-[200%] gap-8 whitespace-nowrap py-2 font-cormorant text-xl text-white md:text-2xl"><span>Bridal Makeup * Hair Styling * Skin Care * Beauty Academy * Ballia UP *</span><span>Bridal Makeup * Hair Styling * Skin Care * Beauty Academy * Ballia UP *</span></div></div>
        <div className="max-wrap grid min-h-[calc(100vh-116px)] items-start gap-6 py-8 md:items-center md:gap-8 md:py-12 md:grid-cols-2">
          <div className="relative order-2 md:order-1">
            <div className="hero-visual soft-card w-full bg-white/95 p-4 sm:p-5 md:max-w-[560px] md:p-8">
              <div className="mb-3 flex items-center gap-2 md:mb-4 md:gap-3"><span className="font-playfair text-3xl text-[#D4547A] md:text-4xl">M</span><span className="font-cormorant text-sm tracking-[0.08em] text-[#B07A8A] sm:text-base md:text-lg md:tracking-[0.12em]">SIGNATURE BEAUTY EXPERIENCES</span></div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
                {heroHighlights.map((item) => <div key={item.title} className="hero-visual overflow-hidden rounded-[22px] border border-[#F0D0DC] bg-[#FFF0F5]"><div className="relative h-32 w-full sm:h-28"><Image src={item.image} fill alt={item.title} className="object-cover" /></div><p className="px-3 pb-3 pt-2 font-playfair text-3xl leading-tight text-[#2D1420] sm:text-xl">{item.title}</p></div>)}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3"><span className="pill bg-[#FFE8F0] px-4 py-2 font-dancing text-xl text-[#D4547A] sm:text-2xl">4.9 Rating</span><span className="pill bg-[#FFF0F5] px-3 py-2 font-cormorant text-base text-[#6B3A4E] sm:px-4 sm:text-lg">27 Verified Reviews</span><span className="pill bg-[#FFF0F5] px-3 py-2 font-cormorant text-base text-[#6B3A4E] sm:px-4 sm:text-lg">Est. 2020</span></div>
            </div>
          </div>
          <div className="hero-blob-shell relative order-1 mx-auto h-[280px] w-[280px] max-w-full sm:h-[340px] sm:w-[340px] md:order-2 md:h-[440px] md:w-[440px]">
            <div className="hero-blob hero-image relative h-full w-full">
              <Image className="object-cover" src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800" fill alt="Bridal look" />
            </div>
            <div className="rotate-orbit absolute inset-[-20px] hidden md:block">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full border-2 border-[#F0D0DC] bg-white px-4 py-2 font-cormorant text-base text-[#6B3A4E]">Bridal Makeup</div>
              <div className="absolute right-0 top-1/3 rounded-full border-2 border-[#F0D0DC] bg-white px-4 py-2 font-cormorant text-base text-[#6B3A4E]">Skin Care</div>
              <div className="absolute bottom-2 left-1/3 rounded-full border-2 border-[#F0D0DC] bg-white px-4 py-2 font-cormorant text-base text-[#6B3A4E]">Hair Styling</div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[72px] overflow-hidden border-y border-[#F0D0DC] bg-[#FFF0F5]"><div className="marquee flex w-[200%] gap-8 whitespace-nowrap py-4 font-cormorant text-[24px] text-[#D4547A] md:text-[28px]"><span>4.9 Rated Salon * Bridal Makeup Expert * Best in Ballia * Beauty Academy * Skin and Hair Care * Trained Artist *</span><span>4.9 Rated Salon * Bridal Makeup Expert * Best in Ballia * Beauty Academy * Skin and Hair Care * Trained Artist *</span></div></section>

      <section id="services" className="bg-pattern-wave section-gap reveal"><div className="max-wrap"><p className="font-dancing text-4xl text-[#D4547A]">What We Offer</p><h2 className="font-playfair text-5xl font-black md:text-6xl">Our Services</h2><p className="font-cormorant text-2xl text-[#B07A8A] md:text-3xl">Beauty is our passion, your glow is our goal.</p><div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">{services.map((s, i) => <motion.article key={s} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="soft-card overflow-hidden bg-white transition hover:-translate-y-2"><div className="relative h-44 sm:h-48 md:h-56"><Image src={gallery[i % gallery.length]} fill className="object-cover transition duration-300 hover:scale-110" alt={s} /></div><div className="p-4 md:p-6"><h3 className="font-playfair text-[30px] leading-tight md:text-3xl">{s}</h3><p className="mt-2 font-cormorant text-lg text-[#B07A8A]">Premium artistry for your special moments and everyday glow.</p><div className="mt-4 flex items-center justify-between"><span className="pill bg-[#FFF0F5] px-3 py-1 font-dancing text-xl text-[#D4547A] md:px-4 md:text-2xl">Rs 500 onwards</span><button className="grid h-10 w-10 place-items-center rounded-full bg-[#FFF0F5] text-[#D4547A]"><ArrowRight size={16} /></button></div></div></motion.article>)}</div></div></section>

      <section className="bg-photo-soft section-gap reveal"><div className="max-wrap grid items-center gap-6 md:grid-cols-2 md:gap-8"><div className="relative mx-auto h-[340px] w-full max-w-[520px] -rotate-1 overflow-hidden rounded-[32px] border-4 border-[#F0D0DC] md:h-[520px] md:-rotate-2"><Image fill src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800" alt="Salon interior" className="object-cover" /></div><div className="soft-card bg-white/85 p-5 md:p-8"><p className="font-dancing text-4xl text-[#D4547A]">About Muskan</p><h2 className="font-playfair text-5xl font-black leading-tight md:text-6xl">Crafting Beauty with Heart and Soul</h2><p className="mt-4 font-cormorant text-xl leading-relaxed text-[#6B3A4E] md:text-2xl">Muskan Beauty Salon and Academy has been Ballia's trusted beauty destination. Known for flawless bridal makeup, expert hair styling, and genuine care for every client.</p><p className="mt-3 font-cormorant text-xl leading-relaxed text-[#6B3A4E] md:text-2xl">Our artists are trained professionals who understand your unique beauty. From traditional to modern looks, we make every occasion special.</p></div></div></section>

      <section id="gallery" className="section-gap max-wrap reveal"><p className="font-dancing text-4xl text-[#D4547A]">Our Work</p><h2 className="font-playfair text-5xl font-black md:text-6xl">Beauty Transformations</h2><div className="mt-8 columns-2 gap-4 md:columns-4">{gallery.map((g, i) => <div key={g} className="mb-4 overflow-hidden rounded-[20px]"><Image src={g} width={400} height={i % 3 === 0 ? 400 : i % 3 === 1 ? 280 : 200} alt="Gallery image" className="h-auto w-full" /></div>)}</div></section>

      <section id="reviews" className="bg-pattern-dots section-gap reveal"><div className="max-wrap"><h2 className="font-playfair text-5xl font-black md:text-6xl">What Our Brides Say</h2><p className="font-cormorant text-2xl text-[#B07A8A] md:text-3xl">Real words from real beauties</p><div className="mt-8 space-y-4 overflow-hidden"><div className="marquee flex w-[200%] gap-4 py-2 [animation-duration:35s]">{[...testimonials, ...testimonials].map((t, idx) => <article key={`${t.name}-top-${idx}`} className="soft-card w-[290px] shrink-0 rounded-[28px] bg-[#FFFAF8] p-5 md:w-[360px]"><p className="font-playfair text-[28px] leading-tight text-[#2D1420]">{t.quote}</p><div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#F0D0DC] bg-white p-3"><div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#F5B8CF]"><Image src={t.avatar} fill alt={t.name} className="object-cover" /></div><div><p className="font-dancing text-2xl text-[#2D1420]">{t.name}</p><p className="font-cormorant text-sm text-[#B07A8A]">Verified Client * 5.0</p></div></div></article>)}</div><div className="flex w-[200%] gap-4 py-2 [animation:marqueeReverse_35s_linear_infinite]">{[...testimonials, ...testimonials].map((t, idx) => <article key={`${t.name}-bottom-${idx}`} className="soft-card w-[290px] shrink-0 rounded-[28px] bg-white p-5 md:w-[360px]"><p className="font-playfair text-[28px] leading-tight text-[#2D1420]">{t.quote}</p><div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#F0D0DC] bg-[#FFF0F5] p-3"><div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#F5B8CF]"><Image src={t.avatar} fill alt={t.name} className="object-cover" /></div><div><p className="font-dancing text-2xl text-[#2D1420]">{t.name}</p><p className="font-cormorant text-sm text-[#B07A8A]">Verified Client * 5.0</p></div></div></article>)}</div></div></div></section>

      <section className="bg-pattern-wave section-gap reveal"><div className="max-wrap"><p className="font-dancing text-4xl text-[#D4547A]">Owner Problem Solver</p><h2 className="font-playfair text-5xl font-black md:text-6xl">Smart Bridal Planner</h2><p className="font-cormorant text-2xl text-[#B07A8A] md:text-3xl">Lead filtering, budget clarity, and one-click WhatsApp booking in one feature.</p><div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-8"><div className="soft-card bg-white p-5 md:p-7"><label className="font-dancing text-2xl text-[#B07A8A]">Select Service</label><select value={plannerService} onChange={(e) => setPlannerService(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#F0D0DC] bg-[#FFF0F5] p-4 font-cormorant text-xl">{services.map((s) => <option key={s}>{s}</option>)}</select><label className="mt-4 block font-dancing text-2xl text-[#B07A8A]">Guests Count</label><input type="range" min={1} max={10} value={plannerGuests} onChange={(e) => setPlannerGuests(Number(e.target.value))} className="mt-3 w-full" /><p className="font-cormorant text-xl text-[#6B3A4E]">Guests: {plannerGuests}</p><label className="mt-4 block font-dancing text-2xl text-[#B07A8A]">Preferred Date</label><input type="date" value={plannerDate} onChange={(e) => setPlannerDate(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#F0D0DC] bg-[#FFF0F5] p-4 font-cormorant text-xl" /></div><div className="soft-card bg-[#FFF0F5] p-5 md:p-7"><p className="font-cormorant text-xl text-[#6B3A4E]">Recommended Package</p><p className="font-playfair mt-2 text-4xl text-[#D4547A] md:text-5xl">{plannerResult.packageName}</p><p className="mt-4 font-cormorant text-xl text-[#6B3A4E]">Estimated Total</p><p className="font-playfair text-4xl text-[#2D1420] md:text-5xl">Rs {plannerResult.total}</p><p className="mt-4 font-cormorant text-lg text-[#B07A8A]">This pre-qualifies client budget before call, so owner only gets serious leads.</p><a href={whatsappHref} target="_blank" className="pill mt-6 inline-block w-full bg-[#25D366] px-6 py-3 text-center font-cormorant text-3xl text-white md:w-auto">Send Plan on WhatsApp</a></div></div></div></section>

      <section id="academy" className="section-gap max-wrap reveal"><p className="font-dancing text-4xl text-[#D4547A]">Learn from the Best</p><h2 className="font-playfair text-5xl font-black md:text-6xl">Muskan Beauty Academy</h2><div className="mt-10 grid gap-8 md:grid-cols-2"><div className="grid grid-cols-2 gap-4"><div className="relative col-span-2 h-80 -rotate-2 overflow-hidden rounded-3xl"><Image src={gallery[1]} fill alt="academy class" className="object-cover" /></div><div className="relative h-60 rotate-2 overflow-hidden rounded-3xl"><Image src={gallery[2]} fill alt="academy look" className="object-cover" /></div><div className="relative h-60 overflow-hidden rounded-3xl"><Image src={gallery[3]} fill alt="academy students" className="object-cover" /></div></div><div><p className="font-cormorant text-2xl text-[#6B3A4E]">Build a professional beauty career with hands-on learning, bridal mastery, and personal mentoring.</p><div className="mt-6 space-y-4">{["Basic Makeup Course", "Advanced Bridal Course", "Professional Academy"].map((c) => <div key={c} className="rounded-r-2xl border-l-4 border-[#D4547A] bg-[#FFF0F5] p-5"><p className="font-playfair text-3xl">{c}</p><p className="font-dancing text-2xl text-[#D4547A]">Duration: 6 to 12 Weeks</p></div>)}</div><button className="pill mt-6 bg-[#D4547A] px-9 py-4 font-cormorant text-3xl text-white">Enroll Now</button></div></div></section>

      <section id="contact" className="bg-photo-dark section-gap text-white reveal"><div className="max-wrap grid gap-6 md:grid-cols-2 md:gap-10"><div className="soft-card border-white/20 bg-white/10 p-5 md:border md:p-8"><p className="font-dancing text-5xl">Ready to Glow</p><h2 className="font-playfair text-5xl font-black leading-none md:text-7xl">Book Your <span className="text-[#FFE8F0]">Appointment</span></h2><p className="mt-4 font-cormorant text-xl text-white/85 md:text-2xl">Walk-in welcome. Home service available.</p></div><form className="rounded-[32px] bg-[#FFFAF8] p-5 text-[#2D1420] md:p-10"><div className="grid gap-3 md:gap-4"><input placeholder="Full Name *" className="rounded-2xl border border-[#F0D0DC] bg-[#FFF0F5] p-4" /><input placeholder="Phone Number *" className="rounded-2xl border border-[#F0D0DC] bg-[#FFF0F5] p-4" /><select className="rounded-2xl border border-[#F0D0DC] bg-[#FFF0F5] p-4">{services.map((s) => <option key={s}>{s}</option>)}</select><input type="date" className="rounded-2xl border border-[#F0D0DC] bg-[#FFF0F5] p-4" /><input type="time" className="rounded-2xl border border-[#F0D0DC] bg-[#FFF0F5] p-4" /><textarea placeholder="Message" className="rounded-2xl border border-[#F0D0DC] bg-[#FFF0F5] p-4" rows={4} /><button className="pill bg-[#D4547A] py-4 font-cormorant text-3xl text-white">Book My Appointment</button><button className="pill bg-[#25D366] py-3 font-cormorant text-2xl text-white">Chat on WhatsApp 080907 29585</button></div></form></div></section>

      <footer className="relative bg-[#2D1420] pb-10 pt-20 text-white"><div className="max-wrap grid gap-8 md:grid-cols-2 xl:grid-cols-4"><div><p className="font-dancing text-5xl">Muskan Beauty Salon</p><p className="font-cormorant text-xl text-white/60">Where Every Look Becomes a Masterpiece</p><div className="mt-4 flex gap-3"><InstagramLogo size={24} /><FacebookLogo size={24} /></div></div><div><p className="font-dancing text-4xl text-[#F5B8CF]">Our Services</p>{services.slice(0, 5).map((s) => <p className="font-cormorant text-lg text-white/70" key={s}>{s}</p>)}</div><div><p className="font-dancing text-4xl text-[#F5B8CF]">Find Us</p><p className="font-cormorant text-lg text-white/70">Takarsan, Ballia, Uttar Pradesh 277001</p><p className="font-cormorant text-lg text-white/70">Phone: 080907 29585</p><p className="font-cormorant text-lg text-white/70">Mon-Sun: 10 AM - 8 PM</p></div><div><p className="font-dancing text-4xl text-[#F5B8CF]">Book Now</p><a href="https://wa.me/918090729585" className="pill mt-3 inline-block border border-[#D4547A] px-6 py-2 font-cormorant text-2xl text-[#D4547A]">WhatsApp</a><a href="https://instagram.com" className="pill mt-3 inline-block border border-[#D4547A] px-6 py-2 font-cormorant text-2xl text-[#D4547A]">Instagram</a></div></div><div className="max-wrap mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between"><p className="font-cormorant text-sm text-white/50">Copyright 2025 Muskan Beauty Salon and Academy, Ballia</p><p className="font-cormorant text-sm text-white/50">Made with love by Expecto Digital Agency</p><p className="font-cormorant text-sm text-white/50">Made with love by Expecto Digital Agency - expecto.online</p></div></footer>
    </main>
  );
}


