import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const footerLinks = {
  "LearnFlair Business": ["Teach on LearnFlair", "Get the app", "About us", "Contact us"],
  Careers: ["Blog", "Help and Support", "Affiliate", "Investors"],
  Terms: ["Privacy policy", "Cookie settings", "Sitemap", "Accessibility"],
};

export default function Footer() {
  return (
    <footer className="udemy-section-dark">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              {links.map((link) => (
                <Link key={link} to="#"
                  className="block text-sm mb-2 opacity-80 hover:opacity-100 transition-opacity"
                  style={{ color: "hsl(var(--udemy-dark-fg))" }}>
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-t border-muted/20 pt-8 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-black text-primary-foreground">LearnFlair</Link>
            <button className="flex items-center gap-2 border border-muted/30 px-3 py-2 text-sm rounded"
              style={{ color: "hsl(var(--udemy-dark-fg))" }}>
              <Globe className="h-4 w-4" /> English
            </button>
          </div>
          <p className="text-sm opacity-60" style={{ color: "hsl(var(--udemy-dark-fg))" }}>
            © 2026 LearnFlair, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
