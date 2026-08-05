import { motion } from "framer-motion";
import HeroStats from "./HeroStats";

export default function AuthHero() {
  return (
    <section className="hero-section">

      <div className="hero-glow hero-glow-one"></div>
      <div className="hero-glow hero-glow-two"></div>

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="hero-logo"
      >
        AnuDB
      </motion.div>

      <motion.div
        className="hero-badge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .2 }}
      >
        Developer First Platform
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .3 }}
      >
        Build Cloud Databases
        <br />
        Faster Than Ever.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .5 }}
      >
        Build scalable cloud databases, APIs and backend
        infrastructure with a beautiful developer experience.
      </motion.p>

      <motion.div
        className="hero-features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .7 }}
      >
        <span>PostgreSQL</span>
        <span>REST API</span>
        <span>Realtime</span>
        <span>Authentication</span>
        <span>Storage</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .9 }}
      >
        <HeroStats />
      </motion.div>

    </section>
  );
}