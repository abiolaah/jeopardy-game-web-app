import { amita, pacifico } from "@/utils/fonts";

const Footer = () => {
  return (
    <p className="font-bold text-xl">
      <span className={amita}>&copy; {`2024 `}</span>
      <span className={pacifico}>PoderVille Inc.</span>
    </p>
  );
};

export default Footer;
