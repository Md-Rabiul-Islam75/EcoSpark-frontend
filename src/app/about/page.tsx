export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About EcoSpark Hub</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            EcoSpark Hub is an online community portal dedicated to fostering sustainable innovation. We believe that meaningful environmental change comes from collaborative ideas and community action. Our platform empowers individuals to share their sustainability ideas, vote on the most impactful solutions, and work together to build a more environmentally conscious future.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">What We Do</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            EcoSpark Hub provides a space where:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Community members can share innovative sustainability ideas</li>
            <li>Ideas are reviewed and approved by our admin team</li>
            <li>Users vote on their favorite ideas to promote high-impact solutions</li>
            <li>Meaningful discussions happen through comments and feedback</li>
            <li>Approved ideas become publicly visible to inspire action</li>
            <li>Creators can monetize premium ideas for additional engagement</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We organize ideas around key sustainability themes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Energy - Renewable power and energy efficiency</li>
            <li>Waste Management - Recycling and reduction strategies</li>
            <li>Transportation - Eco-friendly mobility solutions</li>
            <li>Water Conservation - Clean water and resource management</li>
            <li>Agriculture - Sustainable farming practices</li>
            <li>Green Buildings - Sustainable design and construction</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <p className="text-gray-700 mt-4">
            Email: <a href="mailto:info@ecosparkhub.com" className="text-blue-600 hover:underline">info@ecosparkhub.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
