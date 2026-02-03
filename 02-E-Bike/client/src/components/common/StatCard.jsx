import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon,
  trend,
  color = "primary",
  index = 0,
}) => {
  const IconComponent = icon;

  // Generate deterministic offsets based on index
  const particleOffsets = [
    ((index * 7) % 50) - 25,
    ((index * 13) % 50) - 25,
    ((index * 19) % 50) - 25,
  ];

  const colorClasses = {
    primary: {
      gradient: "from-[#1e4488] to-[#00AFAA]",
      bg: "from-blue-50 to-cyan-50",
      text: "text-[#1e4488]",
    },
    green: {
      gradient: "from-green-500 to-emerald-600",
      bg: "from-green-50 to-emerald-50",
      text: "text-green-600",
    },
    blue: {
      gradient: "from-blue-500 to-cyan-600",
      bg: "from-blue-50 to-cyan-50",
      text: "text-blue-600",
    },
    yellow: {
      gradient: "from-yellow-500 to-orange-600",
      bg: "from-yellow-50 to-orange-50",
      text: "text-yellow-600",
    },
    purple: {
      gradient: "from-purple-500 to-pink-600",
      bg: "from-purple-50 to-pink-50",
      text: "text-purple-600",
    },
    red: {
      gradient: "from-red-500 to-rose-600",
      bg: "from-red-50 to-rose-50",
      text: "text-red-600",
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
    >
      <Card className="relative overflow-hidden transition-all duration-300 border-2 border-transparent hover:shadow-2xl hover:border-gray-200 group">
        {/* Animated gradient background */}
        <motion.div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            colors.bg,
          )}
        />

        {/* Floating particles effect - deterministic values */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={false}
        >
          {particleOffsets.map((offset, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute w-1 h-1 rounded-full bg-gradient-to-br",
                colors.gradient,
              )}
              animate={{
                y: [0, -100],
                x: [0, offset],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
              }}
              style={{
                left: `${20 + i * 30}%`,
                bottom: 0,
              }}
            />
          ))}
        </motion.div>

        <CardContent className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-3">
              <p className="text-sm font-medium tracking-wide text-gray-600 uppercase">
                {title}
              </p>
              <motion.p
                className="text-4xl font-bold text-gray-900"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                {value}
              </motion.p>
              {trend && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="flex items-center gap-1"
                >
                  {trend.isPositive ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <p
                    className={cn(
                      "text-sm font-medium",
                      trend.isPositive ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {trend.value}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Animated Icon */}
            {IconComponent && (
              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.1,
                }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "relative w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                  colors.gradient,
                )}
              >
                {/* Pulse ring */}
                <motion.div
                  className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-br",
                    colors.gradient,
                  )}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                <IconComponent className="relative z-10 w-8 h-8 text-white" />
              </motion.div>
            )}
          </div>
        </CardContent>

        {/* Bottom shine effect */}
        <motion.div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r",
            colors.gradient,
          )}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </Card>
    </motion.div>
  );
};

export default StatCard;
