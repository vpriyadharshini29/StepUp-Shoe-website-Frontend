import React, { useEffect, useState } from "react";
import shoeApi from "../api/shoeapi";

const AboutSection = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    shoeApi
      .get("/")
      .then((res) => {
        // Handle pagination or direct list
        const data = Array.isArray(res.data) ? res.data : res.data.results;
        setShoes(data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="p-12 bg-white text-center">
      {/* About */}
      <h2 className="text-3xl font-bold mb-4">About StepUp</h2>
      <p className="text-gray-700 max-w-4xl mx-auto mb-12 text-lg leading-relaxed">
        StepUp is India’s largest sports and athleisure footwear brand.
        Incorporated in 2006, StepUp Activewear is one of the leading players
        in organized sports & casual footwear sector in India. Since 2016,
        the flagship brand “StepUp”, has been the largest sports and athleisure
        footwear brand in India, in both volume and value terms. The company’s
        products are available via an expansive Pan-India network of over 15,000
        geo-tagged multi-brand retail stores, 35+ company-owned exclusive outlets,
        large format stores such as Walmart, Vishal Retail and Reliance Smart among
        others and all the leading e-commerce portals.
      </p>

      {/* Mission */}
      <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
      <p className="text-gray-700 max-w-4xl mx-auto mb-12 text-lg leading-relaxed">
        At StepUp we craft shoes with care for everyone—men, women and kids,
        with an equal attention to detail, letting each shoe speak for itself.
        The world-class quality, trendy designs and affordable prices have captured
        the imagination of millions of people, across the country—making StepUp,
        an aspirational brand especially for young adults, everyday performers and fashionistas.
      </p>

      {/* Images dynamically loaded from backend */}
      <div className="flex justify-center gap-10 flex-wrap mb-16">
        {Array.isArray(shoes) &&
          shoes.map((shoe) => (
            <div key={shoe.id} className="text-center">
              <img
                src={`http://127.0.0.1:8000${shoe.image}`}
                alt={shoe.name}
                className="w-48 h-48 object-cover rounded-full shadow-lg mx-auto border-4 border-gray-200"
              />
              <p className="mt-3 font-semibold text-gray-800">{shoe.name}</p>
            </div>
          ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="px-6">
          <h3 className="font-bold text-xl mb-3">Simplicity In Design</h3>
          <p className="text-gray-600 text-base leading-relaxed">
            No flashy logos, no senseless details. Just the world’s most
            comfortable shoes, made naturally and designed practically.
            It’s that simple.
          </p>
        </div>
        <div className="px-6">
          <h3 className="font-bold text-xl mb-3">Confidence in Comfort</h3>
          <p className="text-gray-600 text-base leading-relaxed">
            Trying is believing. Give our shoes a shot for 30 days, and if
            you’re not walking on cloud nine, we’ll take them back—no
            questions asked.
          </p>
        </div>
        <div className="px-6">
          <h3 className="font-bold text-xl mb-3">Made from Nature</h3>
          <p className="text-gray-600 text-base leading-relaxed">
            The footwear industry often overlooks Mother Nature’s materials
            in favor of cheaper, synthetic alternatives. We think it’s time
            to change that.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
