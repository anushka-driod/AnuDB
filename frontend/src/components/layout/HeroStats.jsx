import { motion } from "framer-motion";

const stats = [
  { title: "Projects", value: "12K+" },
  { title: "Developers", value: "40K+" },
  { title: "API Requests", value: "1.8B" },
];

export default function HeroStats() {
  return (
    <div className="hero-stats">
      {stats.map((item, index) => (
        <motion.div
          key={item.title}
          className="hero-stat-card"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1 + index * 0.15,
            duration: 0.5,
          }}
        >
          <h3>{item.value}</h3>
          <p>{item.title}</p>
        </motion.div>
      ))}
    </div>
  );
}