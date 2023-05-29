import { BsGithub, BsTelegram, BsInstagram } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="footer footer-center py-3 bg-warning text-primary-content">
      <div>
        <p className="font-bold">Talk A Lot Ltd.</p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/Mohammad-Javad-Ameri">
            <BsGithub className="w-[24px] h-[24px]" />
          </a>
          <a href="https://t.me/Mohmmad_Javad_Ameri">
            <BsTelegram className="w-[24px] h-[24px]" />
          </a>
          <a href="https://www.instagram.com/mj__ameri">
            <BsInstagram className="w-[24px] h-[24px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
