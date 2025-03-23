import type { NextRequest } from "next/server"
import { ImageResponse } from "next/og"
import type { ReactElement } from "react"

export const runtime = "edge"

const interSemiBold = fetch(new URL("./Inter-SemiBold.ttf", import.meta.url)).then((res) => res.arrayBuffer())

export async function GET(req: NextRequest): Promise<Response | ImageResponse> {
  try {
    const { searchParams } = new URL(req.url)

    // Check for explicit theme parameter first, then fall back to header
    const theme = searchParams.get("theme")
    const isDark = theme === "dark" || (theme !== "light" && req.headers.get("Sec-CH-Prefers-Color-Scheme") === "dark")

    const title = searchParams.has("title") ? searchParams.get("title") : "xGov Explorer - Algorand Governance"

    const summary = searchParams.has("summary") ? searchParams.get("summary") : ""

    return new ImageResponse(
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isDark ? <DarkSvg /> : <LightSvg />}
        <div
          style={{
            position: "absolute",
            fontFamily: "Inter",
            fontSize: "48px",
            fontWeight: "600",
            letterSpacing: "-0.04em",
            color: isDark ? "white" : "black",
            top: "250px",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "pre-wrap",
            maxWidth: "750px",
            textAlign: "center",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {title}
        </div>
        {summary && (
          <div
            style={{
              position: "absolute",
              fontFamily: "Inter",
              fontSize: "24px",
              fontWeight: "400",
              color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
              top: "340px",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "pre-wrap",
              maxWidth: "650px",
              textAlign: "center",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {summary.length > 100 ? `${summary.substring(0, 100)}...` : summary}
          </div>
        )}
      </div>,
      {
        width: 843,
        height: 441,
        fonts: [
          {
            name: "Inter",
            data: await interSemiBold,
            style: "normal",
            weight: 400,
          },
        ],
      },
    )
  } catch (e) {
    if (!(e instanceof Error)) throw e

    console.log(e.message)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

function LightSvg(): ReactElement {
  return (
    <svg
      fill="none"
      height="441"
      viewBox="0 0 843 441"
      width="843"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_5_3)">
        <rect fill="white" height="441" width="843" />
        <path
          d="M421 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M469 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M516 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M564 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M374 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M326 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M135 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M183 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M231 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M278 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M88 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M40 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M707 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M755 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M802 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M659 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M612 0V307"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M841 105L7.39098e-06 105"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M841 57L7.39098e-06 57"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M841 153L7.39098e-06 153"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M841 201L7.39098e-06 201"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M841 9L7.39098e-06 8.99998"
          stroke="#999999"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <rect fill="url(#paint0_radial_5_3)" height="441" width="841" x="2" />
        <g filter="url(#filter0_f_5_3)" opacity="0.3">
          <path
            d="M380.212 410C317.656 297.133 289.595 147.189 339.938 79.0527C390.281 10.9163 508.998 45.4216 547 153.881L452.005 204.983L380.212 410Z"
            fill="#7E7E7E"
          />
        </g>
        <rect
          fill="#EFEFEF"
          height="87"
          rx="13.05"
          transform="rotate(-180 465 197)"
          width="87"
          x="465"
          y="197"
        />
        <rect
          height="88.5"
          rx="13.8"
          stroke="url(#paint1_radial_5_3)"
          stroke-opacity="0.15"
          strokeWidth="1.5"
          transform="rotate(-180 465.75 197.75)"
          width="88.5"
          x="465.75"
          y="197.75"
        />
        <rect
          height="88.5"
          rx="13.8"
          stroke="url(#paint2_linear_5_3)"
          stroke-opacity="0.5"
          strokeWidth="1.5"
          transform="rotate(-180 465.75 197.75)"
          width="88.5"
          x="465.75"
          y="197.75"
        />

        <path d="M402.76928,148.19293c-.4858,1.72727-.73185,3.51313-.73124,5.30742,0,1.8399.25476,3.62084.73124,5.30742h7.95169c-.19084-1.76271-.28691-3.5344-.28778-5.30742,0-1.68894.09435-3.48874.28778-5.30742h-7.95169ZM399.70278,146.1478c.0356-.21272.10741-.41777.2123-.60622,4.39921-11.9213,17.6296-18.01916,29.5509-13.61994,6.31413,2.33005,11.29146,7.30792,13.62081,13.6223.10413.18627.17592.38886.2123.59915.77842,2.31167,1.20066,4.78375,1.20066,7.35726,0,2.57115-.42459,5.04794-1.20302,7.35726-.03564.21014-.10663.41272-.20994.59915-4.39856,11.92154-17.62862,18.02012-29.55016,13.62156-6.31425-2.3297-11.29185-7.3073-13.62156-13.62156-.10464-.18773-.17643-.39195-.2123-.60387-.80001-2.36866-1.2064-4.85243-1.20302-7.35254,0-2.57115.42223-5.04558,1.20066-7.35254M421.49857,134.03981c-1.00959,0-1.96256.4529-2.89667,1.47192-.96005,1.04497-1.81631,2.61125-2.53105,4.58089-.50715,1.40116-.91995,2.94857-1.2384,4.56202h13.33223c-.2992-1.54925-.71315-3.07413-1.2384-4.56202-.71237-1.96964-1.571-3.53592-2.53105-4.58089-.93411-1.01902-1.88708-1.47192-2.89667-1.47192M432.27853,158.80776h7.94933c.47649-1.68658.73124-3.46751.73124-5.30742s-.25476-3.62084-.73124-5.30742h-7.94933c.19343,1.81867.28542,3.61848.28542,5.30742s-.09436,3.48874-.28778,5.30742M428.16234,162.34604h-13.32988c.3208,1.6111.73125,3.16086,1.2384,4.56202.71237,1.96964,1.571,3.53592,2.53105,4.58089.93411,1.01902,1.88708,1.47193,2.89667,1.47193s1.96256-.4529,2.89667-1.47193c.96005-1.04497,1.81867-2.61125,2.53105-4.58089.50715-1.40116.91995-2.94857,1.2384-4.56202M414.34181,171.60453c-.63678-1.11384-1.17128-2.28311-1.59694-3.49346-.66187-1.87695-1.16837-3.80512-1.51438-5.76504h-7.06947c2.15859,4.2195,5.77785,7.51011,10.18316,9.25849M438.83613,144.65465c-2.15859-4.21949-5.77785-7.51011-10.18316-9.2585.6251,1.07092,1.15348,2.25742,1.5993,3.49346.64633,1.78565,1.14876,3.75058,1.51674,5.76504h7.06712Z" fill="#111827" stroke-width="0" />

        <g filter="url(#filter1_f_5_3)">
          <path
            d="M376.011 119.882L378.011 188.882C378.011 171.215 379.511 132.682 379.511 123.882C379.511 115.082 386.178 111.882 389.511 111.382L460.011 107.882C438.844 106.382 393.511 107.082 385.511 107.882C377.511 108.682 375.844 116.215 376.011 119.882Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="766"
          id="filter0_f_5_3"
          width="633"
          x="114"
          y="-156"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_5_3"
            stdDeviation="100"
          />
        </filter>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="89.8817"
          id="filter1_f_5_3"
          width="92.011"
          x="372"
          y="103"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_5_3"
            stdDeviation="2"
          />
        </filter>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(418 -39) rotate(90) scale(336 640.762)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_5_3"
          r="1"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(508.5 197) rotate(90) scale(111.857)"
          gradientUnits="userSpaceOnUse"
          id="paint1_radial_5_3"
          r="1"
        >
          <stop />
          <stop offset="1" />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_5_3"
          x1="465"
          x2="484.031"
          y1="197"
          y2="232.344"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint3_linear_5_3"
          x1="430.306"
          x2="446.639"
          y1="164.256"
          y2="184.501"
        >
          <stop />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint4_linear_5_3"
          x1="435.827"
          x2="435.735"
          y1="135.5"
          y2="159.828"
        >
          <stop />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_5_3">
          <rect fill="white" height="441" width="843" />
        </clipPath>
      </defs>
    </svg>
  );
}

function DarkSvg(): ReactElement {
  return (
    <svg
      fill="none"
      height="441"
      viewBox="0 0 843 441"
      width="843"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_4)">
        <rect fill="black" height="441" width="843" />
        <path
          d="M421.176 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M468.824 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M516.471 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M564.118 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M373.529 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M325.882 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M841 105L7.39098e-06 105"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M841 57L7.39098e-06 57"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M841 153L7.39098e-06 153"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M841 201L7.39098e-06 201"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M841 9L7.39098e-06 8.99998"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M135.294 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M182.941 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M230.588 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M278.235 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M87.6471 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M40 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M707.059 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M754.706 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M802.353 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M659.412 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <path
          d="M611.765 4.22058V306.779"
          stroke="#333333"
          strokeDasharray="3.18 3.18"
          strokeWidth="0.794118"
        />
        <rect fill="url(#paint0_radial_1_4)" height="441" width="841" />
        <g filter="url(#filter0_f_1_4)" opacity="0.3">
          <path
            d="M380.212 410C317.656 297.133 289.595 147.189 339.938 79.0527C390.281 10.9163 508.998 45.4216 547 153.881L452.005 204.983L380.212 410Z"
            fill="#0141FF"
          />
        </g>
        <rect
          fill="black"
          fillOpacity="0.5"
          height="87"
          rx="13.05"
          width="87"
          x="378"
          y="110"
        />
        <rect
          height="88.0875"
          rx="13.5937"
          stroke="url(#paint1_radial_1_4)"
          stroke-opacity="0.15"
          strokeWidth="1.0875"
          width="88.0875"
          x="377.456"
          y="109.456"
        />
        <rect
          height="88.0875"
          rx="13.5937"
          stroke="url(#paint2_linear_1_4)"
          stroke-opacity="0.5"
          strokeWidth="1.0875"
          width="88.0875"
          x="377.456"
          y="109.456"
        />
           <path d="M402.76928,148.19293c-.4858,1.72727-.73185,3.51313-.73124,5.30742,0,1.8399.25476,3.62084.73124,5.30742h7.95169c-.19084-1.76271-.28691-3.5344-.28778-5.30742,0-1.68894.09435-3.48874.28778-5.30742h-7.95169ZM399.70278,146.1478c.0356-.21272.10741-.41777.2123-.60622,4.39921-11.9213,17.6296-18.01916,29.5509-13.61994,6.31413,2.33005,11.29146,7.30792,13.62081,13.6223.10413.18627.17592.38886.2123.59915.77842,2.31167,1.20066,4.78375,1.20066,7.35726,0,2.57115-.42459,5.04794-1.20302,7.35726-.03564.21014-.10663.41272-.20994.59915-4.39856,11.92154-17.62862,18.02012-29.55016,13.62156-6.31425-2.3297-11.29185-7.3073-13.62156-13.62156-.10464-.18773-.17643-.39195-.2123-.60387-.80001-2.36866-1.2064-4.85243-1.20302-7.35254,0-2.57115.42223-5.04558,1.20066-7.35254M421.49857,134.03981c-1.00959,0-1.96256.4529-2.89667,1.47192-.96005,1.04497-1.81631,2.61125-2.53105,4.58089-.50715,1.40116-.91995,2.94857-1.2384,4.56202h13.33223c-.2992-1.54925-.71315-3.07413-1.2384-4.56202-.71237-1.96964-1.571-3.53592-2.53105-4.58089-.93411-1.01902-1.88708-1.47192-2.89667-1.47192M432.27853,158.80776h7.94933c.47649-1.68658.73124-3.46751.73124-5.30742s-.25476-3.62084-.73124-5.30742h-7.94933c.19343,1.81867.28542,3.61848.28542,5.30742s-.09436,3.48874-.28778,5.30742M428.16234,162.34604h-13.32988c.3208,1.6111.73125,3.16086,1.2384,4.56202.71237,1.96964,1.571,3.53592,2.53105,4.58089.93411,1.01902,1.88708,1.47193,2.89667,1.47193s1.96256-.4529,2.89667-1.47193c.96005-1.04497,1.81867-2.61125,2.53105-4.58089.50715-1.40116.91995-2.94857,1.2384-4.56202M414.34181,171.60453c-.63678-1.11384-1.17128-2.28311-1.59694-3.49346-.66187-1.87695-1.16837-3.80512-1.51438-5.76504h-7.06947c2.15859,4.2195,5.77785,7.51011,10.18316,9.25849M438.83613,144.65465c-2.15859-4.21949-5.77785-7.51011-10.18316-9.2585.6251,1.07092,1.15348,2.25742,1.5993,3.49346.64633,1.78565,1.14876,3.75058,1.51674,5.76504h7.06712Z" fill="#FAFAFA" stroke-width="0" />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="766"
          id="filter0_f_1_4"
          width="633"
          x="114"
          y="-156"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_1_4"
            stdDeviation="100"
          />
        </filter>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(416 -39) rotate(90) scale(336 640.762)"
          gradientUnits="userSpaceOnUse"
          id="paint0_radial_1_4"
          r="1"
        >
          <stop stopOpacity="0" />
          <stop offset="1" />
        </radialGradient>
        <radialGradient
          cx="0"
          cy="0"
          gradientTransform="translate(421.5 110) rotate(90) scale(111.857)"
          gradientUnits="userSpaceOnUse"
          id="paint1_radial_1_4"
          r="1"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" />
        </radialGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_1_4"
          x1="378"
          x2="397.031"
          y1="110"
          y2="145.344"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint3_linear_1_4"
          x1="430.306"
          x2="446.639"
          y1="164.256"
          y2="184.501"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint4_linear_1_4"
          x1="435.827"
          x2="435.735"
          y1="135.5"
          y2="230"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity=".1" />
        </linearGradient>
        <clipPath id="clip0_1_4">
          <rect fill="white" height="441" width="843" />
        </clipPath>
      </defs>
    </svg>
  );
}
