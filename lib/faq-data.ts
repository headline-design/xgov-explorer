export interface FaqItem {
  question: string;
  answer: string;
  source: string;
}

export const faqItems = [
  {
    question: "What is Algorand's Pure Proof-of-Stake and how does it work?",
    answer:
      "Algorand's Pure Proof-of-Stake (PPoS) is a unique consensus mechanism that ensures high security, fast finality, and true decentralization. It randomly and secretly selects validators for each block, making the network highly secure and efficient. This approach allows Algorand to achieve high transaction speeds and low fees while maintaining a decentralized structure.",
    source: "https://www.algorand.com/technology#PPOS",
  },
  {
    question:
      "What are Algorand Standard Assets (ASAs) and how can they be used?",
    answer:
      "Algorand Standard Assets (ASAs) are a feature that allows users to create and manage various types of assets on the Algorand blockchain. These can include cryptocurrencies, stablecoins, loyalty points, and even non-fungible tokens (NFTs). ASAs provide a standardized way to represent and transfer value on the Algorand network, making it easy for developers to create diverse applications and for users to interact with different types of digital assets.",
    source: "https://developer.algorand.org/docs/get-details/asa/",
  },
  {
    question:
      "How do Algorand's smart contracts enhance decentralized applications?",
    answer:
      "Algorand's Layer-1 smart contracts offer enhanced security and efficiency for developing decentralized applications (dApps). These smart contracts execute directly on the blockchain, reducing complexity and potential points of failure. They support various programming languages and provide features like atomic transfers and stateful smart contracts, enabling developers to create sophisticated and secure dApps with ease.",
    source:
      "https://developer.algorand.org/docs/get-details/dapps/smart-contracts/",
  },
  {
    question:
      "What is Algorand Unified Auth and how does it improve dApp security?",
    answer:
      "Algorand Unified Auth is a secure and efficient authentication system for decentralized applications (dApps). It ensures user data protection while providing seamless experiences. This authentication method simplifies the process for users to interact with dApps on the Algorand network, enhancing both security and user experience by standardizing the authentication process across different applications.",
    source: "https://docs.siwa.org/general-information/siwa-overview",
  },
  {
    question: "How do staking rewards work on Algorand?",
    answer:
      "Staking rewards on Algorand allow users to earn rewards by participating in the network's consensus mechanism. By staking their Algo tokens, users help secure the network and, in return, receive rewards. This process is part of Algorand's Pure Proof-of-Stake system, encouraging active participation and decentralization of the network while providing an incentive for long-term holding of Algo tokens.",
    source: "https://algorand.co/staking-rewards",
  },
  {
    question: "What is xGov Governance and how can I participate?",
    answer:
      "xGov Governance is Algorand's decentralized governance system that allows token holders to participate in the decision-making process for the network. Through xGov, users can vote on key proposals that shape the future of Algorand. To participate, users need to hold Algo tokens and engage in voting sessions on the xGov platform. This system ensures that the Algorand community has a direct say in the network's development and upgrades.",
    source: "https://xgov.algorand.foundation/",
  },
  {
    question: "What is liquid staking on Algorand and what are its benefits?",
    answer:
      "Liquid staking on Algorand allows users to stake their cryptocurrency while receiving tradeable representative tokens. This innovative approach enables users to earn staking rewards while maintaining the liquidity of their assets. The main benefit is that users can participate in network security and earn rewards without locking up their assets completely, as the representative tokens can be used in other DeFi applications or traded on exchanges.",
    source: "https://algorand.co/blog/what-is-liquid-staking-on-algorand",
  },
  {
    question:
      "Where can I find information about Algorand's future developments?",
    answer:
      "Algorand's roadmap provides comprehensive information about the network's vision and upcoming developments. It outlines planned technological advances and future features, giving users and developers insights into Algorand's long-term strategy. The roadmap is regularly updated and can be found on the official Algorand website, offering a clear picture of how the network plans to evolve and innovate in the blockchain space.",
    source: "https://algorand.co/technology/roadmap",
  },
  {
    question: "Will Algorand have an ETF?",
    answer:
      "While there is currently no Algorand-specific ETF, the cryptocurrency ETF landscape is rapidly evolving. With the incoming Trump administration in 2025, experts predict a significant increase in applications for ETFs focused on smaller digital currencies, including Algorand. The nomination of crypto-friendly figures like Scott Bessent to run the U.S. Treasury and the potential appointment of blockchain lawyer Teresa Goody Guillen as SEC Chair could accelerate the approval process for various crypto ETFs. However, any specific Algorand ETF would still require SEC approval. The industry is at the beginning of what could be a new wave of crypto ETF offerings, potentially including those focused on Algorand and other alternative cryptocurrencies.",
    source:
      "https://www.etf.com/sections/news/trump-bessent-may-open-gates-flood-crypto-etfs",
  },
  {
    question: "How does Algorand compare to Ethereum?",
    answer:
      "Algorand and Ethereum are both blockchain platforms supporting smart contracts and decentralized applications. Key differences include: 1) Consensus mechanism: Algorand uses Pure Proof-of-Stake, while Ethereum uses Proof-of-Stake. 2) Transaction speed: Algorand generally offers faster transaction finality. 3) Smart contract languages: Algorand uses TEAL and PyTeal, while Ethereum primarily uses Solidity. 4) Ecosystem size: Ethereum currently has a larger ecosystem of dApps and users.",
    source:
      "https://algorandtechnologies.com/technology/solving-the-blockchain-trilemma",
  },
  {
    question:
      "What is Algorand's role in CBDCs (Central Bank Digital Currencies)?",
    answer:
      "Algorand has been actively involved in CBDC projects. Its blockchain technology is being considered or used by several countries for CBDC development due to its scalability, security, and ability to handle complex financial transactions. For example, the Marshall Islands has used Algorand for its SOV digital currency project.",
    source:
      "https://algorandtechnologies.com/ecosystem/use-cases/marshall-islands-sov",
  },
  {
    question: "Can Algorand smart contracts be upgraded?",
    answer:
      "Yes, Algorand supports upgradable smart contracts. This feature allows developers to modify and improve their smart contracts after deployment, which is crucial for fixing bugs or adding new functionalities. However, the upgrade process must be carefully managed to maintain security and user trust.",
    source:
      "https://developer.algorand.org/docs/get-details/dapps/smart-contracts/apps/#modifying-smart-contracts",
  },
  {
    question: "What is Algorand's environmental impact?",
    answer:
      "Algorand is designed to be environmentally friendly. Its Pure Proof-of-Stake consensus mechanism is significantly more energy-efficient than Proof-of-Work systems used by some other blockchains. Algorand Foundation has also committed to being carbon-negative, offsetting the minimal carbon footprint of its blockchain operations.",
    source:
      "https://algorandtechnologies.com/news/carbon_negative_announcement",
  },
  {
    question: "How can developers start building on Algorand?",
    answer:
      "Developers can start building on Algorand by familiarizing themselves with Algorand's developer documentation, which provides guides on setting up a development environment, creating smart contracts, and building dApps. Algorand supports various programming languages including Python, JavaScript, and Go. The Algorand Developer Portal offers tutorials, SDKs, and API references to help developers get started.",
    source: "https://developer.algorand.org/docs/",
  },
  {
    question: "What are some notable projects built on Algorand?",
    answer:
      "Several notable projects have been built on Algorand, including: 1) Algomint: a digital assets minting platform. 2) JimCoin: A NFT staking platform. 3) Tinyman: decentralized exchange. 4) Lofty.ai: tokenized real estate platform. 5) Folks Finance: lending and borrowing protocol. These projects showcase the diverse applications of Algorand's blockchain technology across various sectors.",
    source: "https://algorand.co/ecosystem/overview",
  },
  {
    question:
      "How does Algorand ensure interoperability with other blockchains?",
    answer:
      "Algorand is working on interoperability solutions to connect with other blockchains. This includes the development of cross-chain bridges and participation in projects like the Blockchain Interoperability Alliance. Algorand's State Proofs technology also enables trustless cross-chain communication, allowing Algorand to connect securely with other networks without relying on external validators.",
    source: "https://medium.com/algorand/state-proofs-e8c7c2dcb131",
  },
];

// Helper function to generate structured data for SEO
export function generateFaqStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${item.answer} (Source: ${item.source})`,
      },
      citation: {
        "@type": "CreativeWork",
        url:
          item.source === "Algorand Foundation"
            ? "https://algorand.foundation/xgov"
            : item.source === "Algorand Foundation Governance"
            ? "https://algorand.foundation/governance"
            : "https://xgov.app/docs",
      },
    })),
  };
}
