export const IconArrowDown  = ({
    className,
    size,
  }: {
    className?: string;
    size?: number;
  }) => (
    <svg
      data-testid="geist-icon"
      height={size || 16}
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      width={size || 16}
      style={{ color: "currentcolor" }}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.74999 1.75V1H7.24999V1.75V12.4393L3.28032 8.46967L2.74999 7.93934L1.68933 9L2.21966 9.53033L7.29288 14.6036C7.68341 14.9941 8.31657 14.9941 8.7071 14.6036L13.7803 9.53033L14.3107 9L13.25 7.93934L12.7197 8.46967L8.74999 12.4393V1.75Z"
        fill="currentColor"
      />
    </svg>
  )
