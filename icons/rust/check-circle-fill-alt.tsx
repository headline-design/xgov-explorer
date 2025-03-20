export const IconCheckCircleFillAlt = ({
  className,
  size,
  style,
  bgClass,
  fgClass,
}: {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
  bgClass?: string;
  fgClass?: string;
}) => (
  <svg
    data-testid="geist-icon"
    height={size || 16}
    strokeLinejoin="round"
    viewBox="0 0 16 16"
    width={size || 16}
    style={{ color: "currentColor", ...style }}
    className={className}
  >
    <path
      d="M14,8c0,3.31372-2.68628,6-6,6s-6-2.68628-6-6,2.68629-6,6-6,6,2.68629,6,6Z"
      className={fgClass || "transparent"}
      fill="currentColor"
      fillRule="evenodd"
      strokeWidth={0}
    />
    <path
      d="M16,8c0,4.4183-3.5817,8-8,8S0,12.4183,0,8,3.58172,0,8,0s8,3.58172,8,8ZM11.5303,6.53033l.5304-.53033-1.0607-1.06066-.5303.53033-3.9697,3.96967-.96967-.96967-.53033-.53033-1.06066,1.06066.53033.53033,1.5,1.49997c.29289.2929.76777.2929,1.06066,0l4.49997-4.49997Z"
      className={bgClass || "transparent"}
      fill="currentColor"
      fillRule="evenodd"
      strokeWidth={0}
    />
  </svg>
);
