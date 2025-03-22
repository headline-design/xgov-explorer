export interface FaqItem {
  question: string;
  answer: string;
  source: string;
}

export const faqItems: FaqItem[] = [
  // General xGov Explorer Questions
  {
    question: "What is xGov Explorer?",
    answer:
      "xGov Explorer is a platform that showcases the best projects that have been awarded xGov grants through the Algorand Foundation's community governance program. It allows users to discover, track, and manage Algorand xGov-funded projects.",
    source: "xGov Explorer Documentation",
  },
  {
    question: "How do I claim my project on xGov Explorer?",
    answer:
      "To claim your project, navigate to your proposal page, click on the 'Claim This Proposal' button, and sign in with GitHub. Your GitHub username must match the one associated with the proposal to successfully claim it.",
    source: "xGov Explorer Documentation",
  },

  // xGov Program Fundamentals
  {
    question: "What is the difference between Governance and xGov?",
    answer:
      "Algorand Community Governance comprises two programs: Governance and xGov. The programs differ in terms of participant eligibility and the measures that participants are required to vote on. Anyone who holds ALGO can participate in Governance, while xGov qualification criteria is based on operating Algorand nodes involved in consensus processes, with voting rights determined by the number of blocks proposed by your node.",
    source: "Algorand Foundation",
  },
  {
    question: "What is the xGov program?",
    answer:
      "The xGov program is a community governance initiative by the Algorand Foundation that funds projects contributing to the Algorand ecosystem. It empowers the community to propose, vote on, and fund initiatives that advance the Algorand blockchain. In the new version, xGovs are block producers with voting power derived from the number of blocks produced in a given period, and only retroactive grant proposals for open-source contributions and projects are accepted.",
    source: "Algorand Foundation",
  },

  // Becoming an xGov
  {
    question: "How do I become an xGov?",
    answer:
      "In the new version of xGov, to participate, you need to operate an Algorand node involved in consensus processes. There is no minimum ALGO stake requirement. Each block proposed by your node will accord you one xGov vote. During the pilot phase, Governors who opted in as xGovs had their rewards accrued from Governance deposited into the xGov Term Pool following the end of each Governance Period, which equated to their xGVP (xGov Voting Power).",
    source: "Algorand Foundation",
  },
  {
    question: "What are the Term Pool unlocking dates?",
    answer:
      "The Term Pools from the pilot phase have specific unlocking dates: Term Pool 1 - June 30, 2024 (Payout scheduled for July 3, 2024); Term Pool 2 - September 30, 2024; Term Pool 3 - December 31, 2024; Term Pool 4 - March 31, 2025. Each Term Pool is locked for 12 months while the xGov Term is in session.",
    source: "Algorand Foundation",
  },

  // xGov Responsibilities
  {
    question: "What are my responsibilities as an xGov?",
    answer:
      "As an xGov, you have several key responsibilities: 1) Vote in every session - once you have opted in, your tokens are locked for 12 months, and you must vote in every session to redeem your deposited ALGO. If you fail to vote, you will lose your xGov status and forfeit your share of ALGO in the Term Pool(s). 2) Stay informed - review proposals on the GitHub xGov Proposals Repository and do your own research ahead of voting. 3) Join the discussion - engage with fellow xGovs on GitHub and the Algorand forum to review and discuss proposals.",
    source: "Algorand Foundation",
  },
  {
    question: "How do I check my xGov status?",
    answer:
      "You can view your xGov status through the xGov Portal by connecting the Algorand wallet you used for Governance when you opted into the xGov Program or your nominated controller address (available from Term Pool 2 onwards). Visit the xGov Status Page at https://xgov.algorand.foundation/status or the xGov Portal at https://xgov.algorand.foundation.",
    source: "Algorand Foundation",
  },

  // xGov Council
  {
    question: "What is the xGov Council?",
    answer:
      "The xGov Council is a proposed governance body consisting of 13 members elected via general governance. The Council evaluates proposals for compliance with terms and conditions, provides guidance for the broader xGov membership, maintains transparency through public discussions, and makes decisions on proposal compliance. Council members must be publicly doxxed, have an identified Algorand address, and undergo KYC with the Algorand Foundation.",
    source: "Algorand Foundation",
  },
  {
    question: "What are the eligibility requirements for the xGov Council?",
    answer:
      "Any community member with Algorand technical knowledge and a strong reputation can run for the council. Candidates must be publicly doxxed, have an identified Algorand address, and undergo the KYC process with the Algorand Foundation. Broader inclusivity is encouraged to incorporate diverse perspectives from outside the xGov domain. xGov councilors cannot submit grant proposals during their council term.",
    source: "Algorand Foundation",
  },

  // Proposal and Voting Process
  {
    question: "How are projects selected for xGov funding?",
    answer:
      "Projects are selected through a community voting process. In the new version, only retroactive grant proposals for open-source contributions and projects are accepted. The voting mechanism varies by category based on the requested amount: Small (10k-50k ALGO), Medium (50k-250k ALGO), and Big (≥250k ALGO), with different discussion and voting periods for each. Democratic quorums of 10%, 15%, and 20% apply respectively, along with weighted quorums of 20%, 30%, and 40%.",
    source: "Algorand Foundation",
  },
  {
    question: "What is the KYC requirement for xGov proposals?",
    answer:
      "Proposal submitters now need to meet a KYC requirement. This change, established from pilot phase feedback, limits the number of active proposals to one per KYC-verified individual or entity at any time to ensure focused completion of proposals.",
    source: "Algorand Foundation",
  },

  // Project Tracking and Contribution
  {
    question: "How do I track the progress of xGov-funded projects?",
    answer:
      "xGov Explorer provides progress tracking features for all funded projects. Project teams post regular updates, and you can see the completion percentage, milestones, and latest developments directly on each project's page. You can also review the Alpha Phase voting session results from the previous xGov pilot phase.",
    source: "xGov Explorer Documentation",
  },
  {
    question: "Can I contribute to xGov-funded projects?",
    answer:
      "Yes, many xGov-funded projects are open source and welcome contributions. You can find project repositories on their respective GitHub pages and contribute code, documentation, or other resources as needed. The new xGov system specifically focuses on retroactive grants for open-source contributions, further encouraging community participation.",
    source: "xGov Explorer",
  },

  // Additional Information
  {
    question: "What types of projects receive xGov funding?",
    answer:
      "xGov funds a diverse range of projects including DeFi applications, developer tools, educational resources, community initiatives, infrastructure improvements, and ecosystem growth projects that benefit the Algorand blockchain. In the new version, the focus is on retroactive funding for open-source contributions that have already demonstrated value to the ecosystem.",
    source: "Algorand Foundation",
  },
  {
    question: "How often are xGov grants awarded?",
    answer:
      "Under the new system, xGov membership eligibility assessments occur via snapshots taken every 1 million blocks (approximately one month). The voting periods vary by proposal size: Small proposals (1 week discussion + 1 week voting), Medium proposals (2 weeks discussion + 2 weeks voting), and Big proposals (3 weeks discussion + 3 weeks voting).",
    source: "Algorand Foundation",
  },
  {
    question: "Can I propose a project for xGov funding?",
    answer:
      "Yes, but under the new system, only retroactive grant proposals for open-source contributions and projects are accepted. Proposal submitters must meet KYC requirements, and each KYC-verified individual or entity is limited to one active proposal at a time. The proposal process follows ARC-34 (xGov Proposal Process), and proposals can be found on the GitHub xGov Proposals Repository.",
    source: "Algorand Foundation",
  },
  {
    question: "How do I connect my Algorand wallet to xGov Explorer?",
    answer:
      "Click on the 'Connect Wallet' button in the top right corner, select your preferred wallet (Pera, MyAlgo, AlgoSigner, etc.), and follow the prompts to approve the connection. Your wallet address will then be displayed in the top right corner.",
    source: "xGov Explorer Documentation",
  },
  {
    question: "What are the related ARCs for xGov?",
    answer:
      "The key Algorand Request for Comments (ARCs) related to xGov are ARC-33 (Becoming an xGov) and ARC-34 (xGov Proposal Process). These documents outline the formal specifications for xGov participation and proposal submission.",
    source: "Algorand Foundation",
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
