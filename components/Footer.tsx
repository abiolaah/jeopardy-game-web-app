import { amita, pacifico } from "@/utils/fonts";

const Footer = () => {
  return (
    <>
      <div className="w-full border border-gray-200 h-0.5 my-4 rounded-lg" />
      <p className="font-bold text-4xl">
        <span className={amita}>&copy; {`2024 `}</span>
        <span className={pacifico}>PoderVille Inc.</span>
      </p>
    </>
  );
};

export default Footer;
