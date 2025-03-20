const IconShield = ({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) => (
  <>
    <svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      className={className}
      color={color || "currentColor"}
      viewBox="0 0 391.1333 370.26367"
      >
        <path d="M4.97217,16.82275c-1.71387-.79102-3.01709-2.10791-3.78906-3.82275h2.35742c.60498.87988,1.35449,1.52393,2.34912,2.021l2.61035,1.20557,2.58936-1.19531c2.01074-1.00488,3.41064-3.22656,3.41064-5.40625V2h-5.25V0h7.25v9.625c0,3.11816-1.81738,5.93994-4.62988,7.18945l-3.5376,1.6084-3.36035-1.6001Z" fill="currentColor" strokeWidth="0"></path><rect y="6" width="4.5" height="2" fill="currentColor" strokeWidth="0"></rect>
      <rect width="4.5" height="2" fill="currentColor" strokeWidth="0"></rect></svg>
  </>
);

export default IconShield;
