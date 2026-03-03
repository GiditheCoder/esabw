import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllGalleries } from "@/hooks/server/queries";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { X } from "lucide-react";

const GalleryPage = () => {
  const { data, isLoading } = useGetAllGalleries();
  const galleries = data?.galleries || [];
  const [selectedImage, setSelectedImage] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Generate bento grid classes based on index for variety
  const getBentoClass = (index) => {
    const patterns = [
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-2 sm:col-span-1",
      "col-span-1 row-span-1",
      "col-span-2 row-span-1 sm:col-span-2",
      "col-span-1 row-span-1",
      "col-span-1 row-span-2 sm:col-span-1",
      "col-span-1 row-span-1",
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="min-h-screen bg-[#041725] overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#0093FF]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-blue-600/20 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-[#0093FF]">Gallery</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Browse through our collection of completed projects and see the
              quality craftsmanship we deliver to every client.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Bento Grid */}
      <section className="px-6 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
              {[...Array(8)].map((_, idx) => (
                <div
                  key={idx}
                  className={`bg-white/5 rounded-2xl animate-pulse ${getBentoClass(idx)}`}
                />
              ))}
            </div>
          ) : galleries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No gallery items yet. Check back soon!
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4"
            >
              {galleries.map((item, idx) => (
                <motion.div
                  key={item._id || idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                  onClick={() => setSelectedImage(item)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer ${getBentoClass(idx)}`}
                >
                  <img
                    src={item.image}
                    alt={item.description || "Gallery image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm sm:text-lg font-medium line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] w-full"
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.description || "Gallery image"}
                className="w-full h-full object-contain rounded-lg"
              />
              {selectedImage.description && (
                <p className="text-white text-center mt-4 text-lg">
                  {selectedImage.description}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default GalleryPage;
