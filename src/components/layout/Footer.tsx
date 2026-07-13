export default function Footer() {
  const currentYear = new Date().getFullYear();

  const linkClass = 'text-[#A9B6AC] hover:text-[#E3A23D] transition-colors duration-200';

  return (
    <footer className="bg-[#16281F] text-[#CBD4CC]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-8 gap-y-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-tl-xl rounded-br-xl rounded-tr-md rounded-bl-md bg-[#E3A23D] text-[#16281F] text-base">
                🌱
              </span>
              <h3
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'var(--font-fraunces, serif)' }}
              >
                EcoSpark
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-[#A9B6AC]">
              Building a sustainable future through community ideas and collective action.
              Join thousands of environmental innovators making a real difference.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#7FA687] mb-5">
              Product
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li><a href="/ideas" className={linkClass}>Explore Ideas</a></li>
              <li><a href="/blog" className={linkClass}>Read Blog</a></li>
              <li><a href="/about" className={linkClass}>About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#7FA687] mb-5">
              Legal
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li><a href="#" className={linkClass}>Terms of Use</a></li>
              <li><a href="#" className={linkClass}>Privacy Policy</a></li>
              <li><a href="#" className={linkClass}>Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-[#7FA687] mb-5">
              Contact
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li><a href="mailto:info@ecosparkhub.com" className={linkClass}>info@ecosparkhub.com</a></li>
              <li><a href="tel:+1234567890" className={linkClass}>+1 (234) 567-890</a></li>
            </ul>
            <div className="flex gap-3 mt-5">
              {['f', '𝕏', '📷'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2A4232] text-[#CBD4CC] hover:border-[#E3A23D] hover:text-[#E3A23D] transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#2A4232] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-[#7C8A7F] text-center sm:text-left">
            &copy; {currentYear} EcoSpark Hub. All rights reserved.
          </p>
          <p className="text-sm text-[#7C8A7F]">Powered by sustainability &amp; innovation</p>
        </div>
      </div>
    </footer>
  );
}