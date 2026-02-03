import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <div className="w-full max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Illustration */}
          <motion.div
            className="mb-8"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1e4488] to-[#00AFAA] leading-none">
              404
            </h1>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8 space-y-4"
          >
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Oops! Page Not Found
            </h2>
            <p className="max-w-md mx-auto text-lg text-gray-600">
              The page you're looking for seems to have taken a ride on one of
              our e-bikes. Let's get you back on track!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#1e4488] to-[#00AFAA] hover:from-[#1a3a70] hover:to-[#008f8a] text-white w-full sm:w-auto"
              >
                <Home className="w-5 h-5 mr-2" />
                Go to Home
              </Button>
            </Link>

            <Link to="/products">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Browse Products
              </Button>
            </Link>

            <Button
              size="lg"
              variant="ghost"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </motion.div>

          {/* Decorative Elements */}
          <div className="flex justify-center gap-4 mt-16 text-4xl opacity-50">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              🚲
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ⚡
            </motion.span>
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              🔋
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
