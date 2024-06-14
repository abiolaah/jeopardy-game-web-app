import { amita, pacifico } from "@/utils/fonts";

const Footer = () => {
  return (
    <>
      <div className="w-full border bg-gray-200 h-px my-4 rounded-lg shadow-lg" />
      <p className="font-bold text-4xl">
        <span className={amita}>&copy; {`2024 `}</span>
        <span className={pacifico}>PoderVille Inc.</span>
      </p>
    </>
  );
};

export default Footer;
