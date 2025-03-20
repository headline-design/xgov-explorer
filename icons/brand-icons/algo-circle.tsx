const AlgoCircle = ({className} : {className?: any}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={256}
      height={256}
      viewBox="0 0 256 256"
      className={className}
      fill="none"
    >
      <circle cx={128} cy={128} r={128}  className="fill-invertBlack" />
      <path
        d="M182.09 183.16H163.405L151.27 138.02L125.18 183.165H104.32L144.645 113.285L138.155 89.0248L83.7799 183.18H62.9099L131.82 63.8198H150.09L158.09 93.4748H176.94L164.07 115.855L182.09 183.16Z"
        className="fill-invertWhite"
      />
    </svg>
  )


export default AlgoCircle;