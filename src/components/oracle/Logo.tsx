import logoMark from "@/assets/oracle-mark.png";

interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export const Logo = ({ size = 24, showWordmark = true, className = "" }: LogoProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img
      src={logoMark}
      alt="oracle"
      width={size}
      height={size}
      className="select-none"
      draggable={false}
    />
    {showWordmark && (
      <span className="font-display text-[17px] font-semibold tracking-tight text-foreground lowercase">
        oracle
      </span>
    )}
  </div>
);