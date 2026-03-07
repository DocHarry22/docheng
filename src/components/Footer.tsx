"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const productLinks = [
  { label: "DoCHEng Desk", href: "#products" },
  { label: "ChatPDF", href: "#products" },
  { label: "Resume Parser", href: "#products" },
  { label: "Course Compass", href: "#products" },
  { label: "Student App", href: "#products" },
];

const futureLinks = [
  { label: "Research AI", href: "#roadmap" },
  { label: "Engineering Tools", href: "#roadmap" },
  { label: "Career Intelligence", href: "#roadmap" },
  { label: "Learning Analytics", href: "#roadmap" },
  { label: "Technical Writing", href: "#roadmap" },
];

const companyLinks = [
  { label: "About", href: "#ecosystem" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#cta" },
];

const resourceLinks = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Documentation", href: "#features" },
  { label: "Roadmap Updates", href: "#roadmap" },
  { label: "Early Access", href: "#cta" },
];

const learnLinks = [
  { label: "Engineering Intelligence", href: "#features" },
  { label: "AI Workflow Principles", href: "#features" },
  { label: "Student Systems Vision", href: "#roadmap" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/docheng", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/docheng", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/docheng", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@docheng.com", label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    { title: "Product", links: productLinks },
    { title: "Explore", links: futureLinks },
    { title: "Company", links: companyLinks },
    { title: "Resources", links: resourceLinks },
    { title: "Learn", links: learnLinks },
  ];

  return (
    <footer
      className="relative mt-8 border-t border-border-subtle/40 bg-linear-to-b from-surface-base to-surface-raised/60 md:mt-10 lg:mt-12"
      role="contentinfo"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-brand-blue/10 via-brand-blue/3 to-transparent" />
      <div className="mx-auto w-full max-w-330 px-8 pb-20 pt-20 sm:px-10 sm:pb-22 sm:pt-20 md:pb-24 md:pt-20 lg:px-16 lg:pb-26 lg:pt-22 xl:px-20 xl:pb-28 xl:pt-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-12 md:gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-12"
        >
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="max-w-62">
              <div className="mb-5 flex items-center gap-3.5">
                <div className="relative h-10 w-10 shrink-0">
                  <Image src="/nav-logo-symbol.png" alt="" fill sizes="40px" className="object-contain" />
                </div>
                <div>
                  <div className="text-[1.15rem] font-extrabold tracking-tight leading-[1.08]">
                    <span className="bg-linear-to-r from-cyan-300 to-brand-blue-light bg-clip-text text-transparent">
                      DoC
                    </span>
                    <span className="bg-linear-to-r from-amber-300 via-brand-orange-light to-amber-400 bg-clip-text text-transparent">
                      HE
                    </span>
                    <span className="bg-linear-to-r from-cyan-300 to-brand-blue-light bg-clip-text text-transparent">
                      ng
                    </span>
                  </div>
                  <div className="text-[9px] tracking-[0.16em] text-text-muted uppercase">
                    Driven by Curiosity
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-text-secondary">
                Build trust into AI with engineering-grade product systems for work, study, and technical growth.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-10">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:grid-cols-5 lg:gap-x-8 xl:gap-x-10">
              {columns.map((column) => (
                <div key={column.title}>
                  <h4 className="mb-5 text-[11px] font-semibold tracking-[0.14em] text-text-label uppercase">
                    {column.title}
                  </h4>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm leading-snug text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-14 border-t border-border-subtle/30 pt-8 md:mt-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="text-sm text-text-muted">
                &copy; {year} DoCHEng. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
                <a
                  href="#"
                  className="text-sm text-text-muted transition-colors hover:text-text-secondary"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-text-muted transition-colors hover:text-text-secondary"
                >
                  Terms of Use
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle/60 bg-surface-card/70 text-text-muted transition-all duration-300 hover:border-brand-blue/30 hover:text-brand-blue-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
