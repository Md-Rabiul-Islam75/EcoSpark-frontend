export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 border-t-4 border-green-600">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">🌱 EcoSpark</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Building a sustainable future through community ideas and collective action. Join thousands of environmental innovators making a real difference.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg">🚀 Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/ideas" className="hover:text-green-400 transition">💡 Explore Ideas</a></li>
              <li><a href="/blog" className="hover:text-green-400 transition">📰 Read Blog</a></li>
              <li><a href="/about" className="hover:text-green-400 transition">ℹ️ About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg">⚖️ Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-green-400 transition">Terms of Use</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Cookie Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-lg">📞 Contact</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:info@ecosparkhub.com" className="hover:text-green-400 transition">📧 info@ecosparkhub.com</a></li>
              <li><a href="tel:+1234567890" className="hover:text-green-400 transition">📱 +1 (234) 567-890</a></li>
              <li>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="hover:text-green-400 transition">f</a>
                  <a href="#" className="hover:text-green-400 transition">𝕏</a>
                  <a href="#" className="hover:text-green-400 transition">📷</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm">
            &copy; {currentYear} EcoSpark Hub. All rights reserved. | Powered by sustainability & innovation
          </p>
        </div>
      </div>
    </footer>
  );
}
