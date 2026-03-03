import React from "react";
import { motion } from "framer-motion";
import { useGetAllGalleries } from "@/hooks/server/queries";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Gallery = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllGalleries();
  const galleries = data?.galleries || [];

  // Show only first 6 items on the landing page
  const displayGalleries = galleries.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <section className="w-full bg-[#041725] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-[#0093FF]">Gallery</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our work and see the quality we deliver
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="aspect-square bg-white/5 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!galleries.length) {
    return null;
  }

  return (
    <section className="w-full bg-[#041725] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-[#0093FF]">Gallery</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our work and see the quality we deliver
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayGalleries.map((item, idx) => (
            <motion.div
              key={item._id || idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.description || "Gallery image"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white text-lg font-medium line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        {galleries.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/gallery")}
              className="inline-flex items-center gap-3 rounded-xl bg-[#0093FF] px-8 py-3 text-sm font-bold text-white hover:bg-[#007cd6] hover:shadow-[0_0_20px_rgba(0,147,255,0.4)] transition-all"
            >
              View All Gallery
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
