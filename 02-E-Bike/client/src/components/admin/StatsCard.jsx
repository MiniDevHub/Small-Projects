import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({ title, value, icon: Icon, trend, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-red-500",
    indigo: "from-indigo-500 to-purple-500",
  };

  const bgColorClasses = {
    blue: "from-blue-50 to-cyan-50",
    green: "from-green-50 to-emerald-50",
    purple: "from-purple-50 to-pink-50",
    orange: "from-orange-50 to-red-50",
    indigo: "from-indigo-50 to-purple-50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative overflow-hidden bg-gradient-to-br ${bgColorClasses[color]} rounded-2xl p-6 shadow-lg border border-${color}-100`}
    >
      {/* Animated background blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full blur-2xl`}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-600">{title}</p>
            <motion.h3
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-3xl font-bold text-gray-900"
            >
              {value}
            </motion.h3>
          </div>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} text-white shadow-lg`}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        </div>

        {trend && (
          <div className="flex items-center gap-2">
            {trend > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`text-sm font-semibold ${
                trend > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {Math.abs(trend)}%
            </span>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        )}
      </div>

      {/* Shine effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        className="absolute inset-0 w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </motion.div>
  );
};

export default StatsCard;
