const { withContentlayer } = require("next-contentlayer2");

/** @type {import('next').NextConfig} */
const path = require("path");
const { NormalModuleReplacementPlugin } = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "xgov.app",
        "*.xgov.app",
        "localhost:3000",
        "*.localhost:3000",
        "192.168.1.169:3000",
        "*.192.168.1.169:3000",
      ],
    },
  },

  transpilePackages: [
    "next-mdx-remote",
    "contentlayer2",
    "@txnlab/use-wallet-react",
  ],
  webpack: (config, { webpack, isServer }) => {
    if (isServer) {
      // Module not found
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp:
            /(^@google-cloud\/spanner|^@mongodb-js\/zstd|^aws-crt|^aws4$|^pg-native$|^mongodb-client-encryption$|^@sap\/hana-client$|^snappy$|^pino-pretty$|^lokijs$|^react-native-sqlite-storage$|^bson-ext$|^cardinal$|^kerberos$|^hdb-pool$|^sql.js$|^sqlite3$|^better-sqlite3$|^ioredis$|^typeorm-aurora-data-api-driver$|^pg-query-stream$|^oracledb$|^mysql$|^snappy\/package\.json$|^cloudflare:sockets$)/,
        }),
        // temp fix for react-email bug: https://github.com/resendlabs/react-email/issues/868#issuecomment-1782771917
        new NormalModuleReplacementPlugin(
          /email\/render/,
          path.resolve(__dirname, "./renderEmailFix.js")
        )
      );
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
      unknownContextCritical: false,
    };

    return config;
  },

  images: {
    remotePatterns: [
      {
        hostname: "www.google.com",
      },
      {
        hostname: "192.168.1.160",
      },
      {
        hostname: "localhost",
      },
      {
        hostname: "home.localhost",
      },
      {
        hostname: "xgov.app",
      },
      {
        hostname: "siwa.org",
      },
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "pbs.twimg.com",
      },
      {
        hostname: "njbclcehtszuwqtkphdn.supabase.co",
      },
      {
        hostname: "6oqt3m2oqcmu1rpz.public.blob.vercel-storage.com",
      },
      {
        hostname: "njbclcehtszuwqtkphdn.supabase.co",
      },
      {
        hostname: "x-content-cdn.s3.us-east-2.amazonaws.com",
      },
      {
        hostname: "faisalman.github.io",
      },
      {
        hostname: "avatars.dicebear.com",
      },
      {
        hostname: "github.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
