"use client";

import { useEffect, useState } from "react";

export default function ReferralBanner() {
  const [mode, setMode] = useState("hidden");

  useEffect(() => {
    const referrer = document.referrer;
    const currentHost = window.location.hostname;

    if (!referrer) return;

    try {
      const referrerHost = new URL(referrer).hostname;
      if (referrerHost === currentHost) return;

      const knownThieves = [
        "nexorastudio.com",
        "nexora.studio",
        "nexoradigital.com",
        "nexorastudio.in",
      ];
      const isKnownThief = knownThieves.some((h) => referrerHost.includes(h));
      setMode(isKnownThief ? "overlay" : "pill");
    } catch {
      // ignore
    }
  }, []);

  if (mode === "hidden") return null;

  if (mode === "overlay") {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999,
          background: "rgba(0,0,0,0.82)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          animation: "fadeIn 0.35s ease-out",
        }}
      >
        <style>{`
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
          @keyframes scaleIn { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
        `}</style>
        <div
          style={{
            background: "linear-gradient(145deg,#0d0d1a 0%,#12122a 100%)",
            border: "1px solid rgba(129,140,248,0.3)",
            borderRadius: "24px",
            padding: "48px 56px",
            maxWidth: "480px",
            width: "90%",
            textAlign: "center",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.05)",
            animation: "scaleIn 0.35s ease-out",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: "50px",
              padding: "6px 16px",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#818cf8",
              fontWeight: "600",
              marginBottom: "24px",
            }}
          >
            Original Work
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            Expecto Digital Agency
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "#6366f1",
              fontWeight: "600",
              letterSpacing: "0.05em",
              marginBottom: "20px",
            }}
          >
            expecto.online
          </div>
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg,transparent,rgba(129,140,248,0.3),transparent)",
              marginBottom: "20px",
            }}
          />
          <p
            style={{
              fontSize: "15px",
              lineHeight: "1.7",
              color: "#9ca3af",
              marginBottom: "32px",
            }}
          >
            This website was{" "}
            <span style={{ color: "#ffffff", fontWeight: "600" }}>designed and developed</span>{" "}
            by{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#818cf8,#c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700",
              }}
            >
              Expecto Digital Agency
            </span>
            . It is being displayed on another website without authorization.
          </p>
          <a
            href="https://www.expecto.online"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg,#6366f1 0%,#a855f7 100%)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "14px 32px",
              borderRadius: "50px",
              fontWeight: "700",
              fontSize: "14px",
              letterSpacing: "0.02em",
              marginBottom: "16px",
              boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
            }}
          >
            Visit Expecto Digital Agency →
          </a>
          <div>
            <button
              onClick={() => setMode("pill")}
              style={{
                background: "transparent",
                border: "none",
                color: "#4b5563",
                cursor: "pointer",
                fontSize: "13px",
                textDecoration: "underline",
              }}
            >
              Continue to site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 99999,
        background: "linear-gradient(135deg,#0f0f0f 0%,#1a1a2e 100%)",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: "50px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45),0 0 0 1px rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "13px",
        fontWeight: "500",
        whiteSpace: "nowrap",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        animation: "slideUp 0.4s ease-out",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from{opacity:0;transform:translateX(-50%) translateY(16px)}
          to{opacity:1;transform:translateX(-50%) translateY(0)}
        }
      `}</style>
      <span
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: "linear-gradient(135deg,#6366f1,#a855f7)",
          flexShrink: 0,
          display: "inline-block",
        }}
      />
      <span style={{ color: "#9ca3af" }}>Designed &amp; Developed by</span>
      <a
        href="https://www.expecto.online"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          fontWeight: "700",
          background: "linear-gradient(90deg,#818cf8,#c084fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Expecto Digital Agency
      </a>
      <button
        onClick={() => setMode("hidden")}
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "none",
          color: "#9ca3af",
          cursor: "pointer",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "11px",
          flexShrink: 0,
          marginLeft: "2px",
        }}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}
