import { cn } from "@/lib/utils"

interface VMkitBadgeProps {
    className?: string
}

const VMKitLogo = () => (
    <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 140 140"
        className="h-4 w-4"
    >
        <defs>
            <clipPath id="clippath">
                <rect
                    y="7.77778"
                    width={140}
                    height={140}
                    fill="none"
                    strokeWidth={0}
                />
            </clipPath>
            <linearGradient
                id="linear-gradient"
                x1="486.87325"
                y1="1406.73403"
                x2="617.37408"
                y2="1406.73403"
                gradientTransform="translate(-151.2022 -612.36321) scale(.4649)"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset={0} stopColor="#fc92cb" />
                <stop offset=".51" stopColor="#dd3ce2" />
                <stop offset={1} stopColor="#b91cbf" />
            </linearGradient>
        </defs>
        <g clipPath="url(#clippath)">
            <rect
                x="313.73913"
                width={140}
                height={140}
                fill="#000"
                strokeWidth={0}
            />
        </g>
        <path
            d="M23.58751,22.81866c-4.28824-.00439-7.76809,3.46836-7.77248,7.75659v33.00525c0,4.29155,3.48093,7.76454,7.77248,7.76454h33.00524c4.29155,0,7.76454-3.47298,7.76454-7.76454V30.5832c.0044-4.28824-3.46835-7.76809-7.75659-7.77248h-.00795s-33.00524.00795-33.00523.00794h-.00001ZM15.81501,90.92725c0-4.29155,3.48093-7.76454,7.77248-7.76454h33.00524c4.29155,0,7.76454,3.47298,7.76454,7.76454v33.00523c0,4.29155-3.47298,7.77248-7.76454,7.77248H23.58751c-4.28824.00439-7.76809-3.46834-7.77248-7.75658v-.01591s0-33.00524-.00002-33.00521ZM76.17496,90.92725c0-4.29155,3.47298-7.76454,7.76454-7.76454h33.00523c4.29155,0,7.77248,3.47298,7.77248,7.76454v33.00523c0,4.29155-3.48093,7.77248-7.77248,7.77248h-32.99729c-4.28824,0-7.76454-3.47629-7.76454-7.76453v-33.00524s-.00795-.00795-.00794-.00793Z"
            fill="#fff"
            fillRule="evenodd"
            strokeWidth={0}
        />
        <path
            d="M98.17814,17.55148c1.68963-7.7457,12.71964-7.79315,14.4947-.06645l.07594.3607.16138.68345c1.92064,8.19141,8.54948,14.44285,16.83928,15.88057,8.08742,1.41435,8.08742,13.02339,0,14.42824-8.34148,1.44354-14.99786,7.75925-16.87724,16.01345l-.19933.91126c-1.76555,7.7362-12.80507,7.68873-14.4947-.06645l-.18037-.77836c-1.81825-8.27471-8.45567-14.6309-16.80132-16.0894-8.06843-1.40486-8.06843-13.00441,0-14.39977,8.32057-1.45094,14.94791-7.77106,16.79183-16.01345l.1234-.56953.06645-.28477s0-.0095,0-.00949h-.00003Z"
            fill="url(#linear-gradient)"
            fillRule="evenodd"
            strokeWidth={0}
        />
    </svg>
)


export function VMkitBadge({ className }: VMkitBadgeProps) {
    return (
        <a
            href="https://vmkit.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "fixed bottom-4 right-4 z-50 flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-black/90 hover:shadow-md dark:bg-white/20 dark:text-white dark:hover:bg-white/30",
                className,
            )}
        >
            <VMKitLogo />
            <span className="leading-[normal]">Powered by VMkit</span>
        </a>
    )
}

