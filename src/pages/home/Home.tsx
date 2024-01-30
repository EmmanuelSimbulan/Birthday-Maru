import "./Home.css";
import mainImage from "../../assets/maru-main.png";

import Marquee from "../../components/Marquee/Marquee";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import formatAmPm from "../../utils/formatAmPm";

const transition = { duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] };

const Home = () => {
  return (
    <main className="main-wrapper h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 mt-12 text-center"
      >
        <p>"𝚘𝚞𝚛 𝚏𝚞𝚝𝚞𝚛𝚎 𝚗𝚞𝚛𝚜𝚎"</p>
        <p>Maru Jay Padal</p>
      </motion.div>
      {/* Mobile */}
      <Link
        className="w-48 md:w-72 overflow-hidden rounded-xl md:hidden"
        to={"/maru"}
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={transition}
          src={mainImage}
          alt="Birthday person"
          className="select-none cursor-pointer rounded-xl"
        />
      </Link>
      {/* Mobile */}
      <Link
        className="w-48 md:w-72 overflow-hidden rounded-xl hidden md:block"
        to={"/maru"}
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={transition}
          src={mainImage}
          alt="Birthday person"
          className="select-none cursor-pointer rounded-xl"
        />
      </Link>
      <Marquee
        transition={{ ...transition }}
        message="Happy Birthday."
        small={false}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute bottom-0 mb-12 text-center"
      >
        <p>{formatAmPm(new Date())}</p>
        <p>01.31.2024</p>
      </motion.div>
    </main>
  );
};

export default Home;
