import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lincoln Islam — TryonAR",
    description: "Founder & Visionary at TryonAR. Virtual try-on for beauty brands.",
};

export default function LincolnPage() {
    return (
        <>
            <style>{`
                * { box-sizing: border-box; }
                body {
                    margin: 0;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    background: #0d0d14;
                    color: #f0f0f5;
                }
                .card {
                    min-height: 100dvh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 3rem 1.5rem 2.5rem;
                    background: radial-gradient(ellipse at 70% 0%, rgba(139,92,246,0.2) 0%, transparent 60%),
                                radial-gradient(ellipse at 20% 90%, rgba(236,72,153,0.12) 0%, transparent 55%),
                                #0d0d14;
                }
                .avatar {
                    width: 96px;
                    height: 96px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #fff;
                    margin-bottom: 1rem;
                    box-shadow: 0 0 0 4px rgba(139,92,246,0.25), 0 0 48px rgba(139,92,246,0.35);
                    letter-spacing: 0.05em;
                    overflow: hidden;
                    padding: 0;
                }
                .avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center top;
                    border-radius: 50%;
                }
                .brand {
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.25em;
                    color: #a78bfa;
                    text-transform: uppercase;
                    margin: 0 0 0.5rem;
                }
                .name {
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: #ffffff;
                    margin: 0 0 0.5rem;
                    text-align: center;
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                }
                .title-text {
                    font-size: 0.75rem;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    color: #6b7280;
                    text-transform: uppercase;
                    margin: 0 0 1.25rem;
                    text-align: center;
                }
                .bio {
                    font-size: 0.95rem;
                    color: #9ca3af;
                    text-align: center;
                    line-height: 1.65;
                    max-width: 340px;
                    margin: 0 0 2.25rem;
                }
                .actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    width: 100%;
                    max-width: 380px;
                    margin-bottom: 2rem;
                }
                .btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.6rem;
                    padding: 1rem 1.5rem;
                    border-radius: 999px;
                    font-size: 1rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: opacity 0.15s, transform 0.15s;
                    border: none;
                    cursor: pointer;
                }
                .btn:hover { opacity: 0.88; transform: translateY(-1px); }
                .btn-primary {
                    background: linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%);
                    color: #fff;
                }
                .btn-secondary {
                    background: rgba(255,255,255,0.07);
                    color: #e5e7eb;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .divider {
                    width: 100%;
                    max-width: 380px;
                    height: 1px;
                    background: rgba(255,255,255,0.07);
                    margin: 0 0 1.75rem;
                }

                /* Demo block */
                .demo-block {
                    width: 100%;
                    max-width: 380px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    overflow: hidden;
                    margin-bottom: 2rem;
                }
                .demo-titlebar {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }
                .dot { width: 10px; height: 10px; border-radius: 50%; }
                .dot-red { background: #ff5f57; }
                .dot-yellow { background: #febc2e; }
                .dot-green { background: #28c840; }
                .demo-titlebar-label {
                    margin-left: 0.5rem;
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    color: #6b7280;
                    text-transform: uppercase;
                }
                .demo-titlebar-tag {
                    background: rgba(139,92,246,0.25);
                    color: #a78bfa;
                    font-size: 0.65rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    text-transform: uppercase;
                }
                .demo-body {
                    padding: 1.5rem 1.25rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                .demo-face {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 50% 40%, #2a1f4a 0%, #1a1230 100%);
                    border: 2px solid rgba(139,92,246,0.3);
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .scan-corner {
                    position: absolute;
                    width: 18px;
                    height: 18px;
                    border-color: rgba(139,92,246,0.6);
                    border-style: solid;
                    border-width: 0;
                }
                .scan-corner.tl { top: -8px; left: -8px; border-top-width: 2px; border-left-width: 2px; }
                .scan-corner.tr { top: -8px; right: -8px; border-top-width: 2px; border-right-width: 2px; }
                .scan-corner.bl { bottom: -8px; left: -8px; border-bottom-width: 2px; border-left-width: 2px; }
                .scan-corner.br { bottom: -8px; right: -8px; border-bottom-width: 2px; border-right-width: 2px; }
                .demo-face-emoji {
                    font-size: 3.5rem;
                    filter: grayscale(0.3);
                }
                .demo-hint {
                    font-size: 0.85rem;
                    color: #9ca3af;
                    text-align: center;
                }
                .swatches {
                    display: flex;
                    gap: 0.6rem;
                    align-items: flex-start;
                }
                .swatch-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.35rem;
                    cursor: pointer;
                }
                .swatch {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    transition: transform 0.15s, border-color 0.15s;
                }
                .swatch:hover { transform: scale(1.1); border-color: rgba(255,255,255,0.4); }
                .swatch.rose { background: #e8527a; }
                .swatch.ruby { background: #c0392b; }
                .swatch.plum { background: #9b2c5a; }
                .swatch.coral { background: #e8622a; }
                .swatch.berry { background: #8b5cf6; }
                .swatch-label {
                    font-size: 0.65rem;
                    color: #6b7280;
                    font-weight: 500;
                }
                .demo-caption {
                    font-size: 0.82rem;
                    color: #e5e7eb;
                    text-align: center;
                    line-height: 1.55;
                    padding: 0 0.25rem;
                }
                .btn-demo-cta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    width: 100%;
                    padding: 1rem;
                    border-radius: 999px;
                    font-size: 1rem;
                    font-weight: 700;
                    text-decoration: none;
                    background: linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%);
                    color: #fff;
                    transition: opacity 0.15s, transform 0.15s;
                    margin-top: 0.25rem;
                }
                .btn-demo-cta:hover { opacity: 0.88; transform: translateY(-1px); }

                /* Contact cards */
                .contact-grid {
                    width: 100%;
                    max-width: 380px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }
                .contact-card {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    padding: 1.25rem 1rem;
                    text-decoration: none;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.6rem;
                    transition: background 0.15s, border-color 0.15s;
                }
                .contact-card:hover {
                    background: rgba(139,92,246,0.08);
                    border-color: rgba(139,92,246,0.25);
                }
                .contact-card-icon {
                    color: #6b7280;
                }
                .contact-card-label {
                    font-size: 0.65rem;
                    font-weight: 700;
                    letter-spacing: 0.18em;
                    color: #6b7280;
                    text-transform: uppercase;
                }
                .contact-card-value {
                    font-size: 0.82rem;
                    color: #e5e7eb;
                    font-weight: 500;
                    word-break: break-all;
                }
                .contact-card-full {
                    grid-column: span 2;
                }
                .footer-note {
                    font-size: 0.75rem;
                    color: #374151;
                    text-align: center;
                }
            `}</style>
            <div className="card">
                <div className="avatar">
                    <img src="/lincoln-photo.jpg" alt="Lincoln Islam" />
                </div>
                <p className="brand">TryonAR</p>
                <h1 className="name">Lincoln Islam</h1>
                <p className="title-text">Founder &amp; Visionary</p>
                <p className="bio">
                    Founder at Linno · Trusted by 100+ Businesses Worldwide, incl. GE &amp; Hitachi | Now Building TryonAR — Virtual Try-On for Beauty Brands 🇳🇱
                </p>

                <div className="actions">
                    <a href="/lincoln.vcf" download className="btn btn-primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Save Contact
                    </a>
                    <a href="https://tryonar.net" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        Visit TryonAR
                    </a>
                </div>

                <div className="divider" />

                {/* Demo block */}
                <div className="demo-block">
                    <div className="demo-titlebar">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                        <span className="demo-titlebar-tag">TryonAR</span>
                    </div>
                    <div className="demo-body">
                        <iframe
                            src="https://try.tryonar.net/"
                            style={{ width: "100%", height: "480px", border: "none", display: "block", borderRadius: "8px" }}
                            allow="camera; microphone"
                            title="TryonAR Live Demo"
                        />
                        <p className="demo-caption">
                            This is a taste of TryonAR — real-time AR try-on,
                            embedded anywhere beauty brands sell.
                        </p>
                        <a href="https://tryonar.net/product-demo" target="_blank" rel="noopener noreferrer" className="btn-demo-cta">
                            See the Full Demo →
                        </a>
                    </div>
                </div>

                {/* Contact cards */}
                <div className="contact-grid">
                    <a href="mailto:lincoln@tryonar.net" className="contact-card">
                        <svg className="contact-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <span className="contact-card-label">Email</span>
                        <span className="contact-card-value">lincoln@tryonar.net</span>
                    </a>
                    <a href="https://tryonar.net" target="_blank" rel="noopener noreferrer" className="contact-card">
                        <svg className="contact-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        <span className="contact-card-label">Website</span>
                        <span className="contact-card-value">tryonar.net</span>
                    </a>
                    <a href="https://www.linkedin.com/in/lincolnislam/" target="_blank" rel="noopener noreferrer" className="contact-card contact-card-full">
                        <svg className="contact-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                        <span className="contact-card-label">LinkedIn</span>
                        <span className="contact-card-value">linkedin.com/in/lincolnislam</span>
                    </a>
                </div>

            </div>
        </>
    );
}
