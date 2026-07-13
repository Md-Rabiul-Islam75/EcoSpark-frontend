export default function AboutPage() {
  const categories = [
    {
      title: "Energy",
      description: "Renewable power and energy efficiency",
      icon: "⚡",
    },
    {
      title: "Waste Management",
      description: "Recycling and reduction strategies",
      icon: "♻️",
    },
    {
      title: "Transportation",
      description: "Eco-friendly mobility solutions",
      icon: "🚲",
    },
    {
      title: "Water Conservation",
      description: "Clean water and resource management",
      icon: "💧",
    },
    {
      title: "Agriculture",
      description: "Sustainable farming practices",
      icon: "🌱",
    },
    {
      title: "Green Buildings",
      description: "Sustainable design and construction",
      icon: "🏡",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <div className="container mx-auto px-4 py-16 max-w-5xl">

        {/* Header Section */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
            Sustainable Innovation Community
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            About{" "}
            <span className="text-green-600">
              EcoSpark Hub
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            A community-driven platform where innovative sustainability ideas
            connect, grow, and create meaningful environmental impact.
          </p>
        </div>


        <div className="space-y-8">

          {/* Mission */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              🌍 Our Mission
            </h2>

            <p className="text-gray-600 leading-relaxed">
              EcoSpark Hub is an online community portal dedicated to fostering
              sustainable innovation. We believe that meaningful environmental
              change comes from collaborative ideas and community action. Our
              platform empowers individuals to share their sustainability
              ideas, vote on the most impactful solutions, and work together to
              build a more environmentally conscious future.
            </p>

          </section>


          {/* What We Do */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition">

            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              🚀 What We Do
            </h2>

            <p className="text-gray-600 mb-5">
              EcoSpark Hub provides a space where:
            </p>


            <div className="grid md:grid-cols-2 gap-4">

              {[
                "Community members can share innovative sustainability ideas",
                "Ideas are reviewed and approved by our admin team",
                "Users vote on their favorite ideas to promote high-impact solutions",
                "Meaningful discussions happen through comments and feedback",
                "Approved ideas become publicly visible to inspire action",
                "Creators can monetize premium ideas for additional engagement",
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex gap-3 p-4 rounded-xl bg-green-50"
                >
                  <span className="text-green-600 font-bold">
                    ✓
                  </span>

                  <p className="text-gray-700">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </section>



          {/* Categories */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🌱 Sustainability Categories
            </h2>

            <p className="text-gray-600 mb-6">
              We organize ideas around key sustainability themes:
            </p>


            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {categories.map((category)=>(
                <div
                  key={category.title}
                  className="
                    p-5 rounded-xl
                    border border-gray-100
                    bg-white
                    hover:border-green-300
                    hover:shadow-md
                    transition
                  "
                >

                  <div className="text-3xl mb-3">
                    {category.icon}
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>

                </div>
              ))}

            </div>

          </section>



          {/* Contact */}
          <section className="rounded-2xl bg-green-600 p-8 text-white">

            <h2 className="text-2xl font-bold mb-4">
              📩 Contact Us
            </h2>

            <p className="text-green-50 leading-relaxed">
              Have questions or feedback? We'd love to hear from you!
            </p>


            <p className="mt-5">
              Email:
              <a
                href="mailto:info@ecosparkhub.com"
                className="ml-2 font-semibold underline hover:text-green-200"
              >
                info@ecosparkhub.com
              </a>
            </p>

          </section>


        </div>

      </div>
    </div>
  );
}