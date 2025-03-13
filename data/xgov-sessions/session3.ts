const session3Data = {
  id: "V1HM74GNIK",
  type: 3,
  title: "xGov Voting Session 3",
  description:
    "The purpose of this voting session is the allocation of up to 2M Algo in community grants. This is a mandatory session for all xGovs to maintain their eligibility.",
  start: "2024-02-09T23:00:00.000Z",
  end: "2024-03-10T22:59:00.000Z",
  voteGatingSnapshotCid: "bafybeifdxhkjte7jomil7jcypq67yq65aoigi2qihecdxi2tp2cy6x3ldy",
  questions: [
    {
      id: "96ce6726-e52e-4fd0-a747-7117b85b72af",
      prompt:
        "#92 DAOsign by Eugene Fine <eugene@daosign.org>, Ramil Amerzyanov (@ramilexe), Oleksandra Burmenska <sandra@daosign.org>",
      description:
        "**DAOsign: Workflow Orchestration platform built on decentralized Smart Signature protocol** DAOsign is a decentralized and customizable platform where collaboration, authorization, and workflow management are facilitated through cryptographic proofs stored on a blockchain Verifiable Signature is at the core of DAOsign and is based on 3 key proofs: proof-of-identify, proof-of-authority, and proof-of-agreement. Utilizing these proofs, DAOsign provides a platform to design and configure complex workflows that combine smart-contract-based automation with authorized approvals. **Problem:** Outdated Electronic Signatures Technologies Traditional electronic signatures are lack security and transparency, susceptible to compromise and forgery, with no unified system for robust verification. **Solution:** DAOsign Smart Signature DAOsign introduces cryptographic, decentralized signature standard, a technologically advanced alternative to traditional e-signatures, leveraging the security and transparency of blockchain. This technology aims to establish a global standard for secure and verifiable digital signatures, ensuring integrity across borders, legal jurisdictions, and administrative systems.",
      options: [{ id: "78f970a5-3000-4c6e-849f-c38053bb142e", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/92/files",
        category: "Tools",
        focus_area: "Deployment",
        threshold: 554751983679,
        ask: 270000,
      },
    },
    {
      id: "31f3f5a1-63ad-43e2-8d8b-1eff11c88790",
      prompt:
        "#95 Gamify Exploration and Engagement of NFT ecosystem with Open-source browser game by Cosmic Champs (@madshapes-dev)",
      description:
        'Develop a "match-2" open-source browser game with scoring to explore algorand NFT collections. It provides a very visual and engaging experience of discovering Algorand NFT scene. It can be used as a tool for giveaways and competitions to cheaply and easily drive extra activity to the projects. In the future we would like to expand this to become a crosschain platform to help with onboarding new NFT enthusiast to Algorand. You can try a POC version here: <a href="https://cosmic-match.vercel.app" target="_blank">https://cosmic-match.vercel.app</a>',
      options: [{ id: "500137e5-2234-4374-85f9-ac31dfda197d", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/95/files",
        category: "Tools",
        focus_area: "NFT",
        threshold: 61639109297,
        ask: 30000,
      },
    },
    {
      id: "154d83d5-af25-4a7a-a388-41485b49103d",
      prompt: "#96 Cosmic Champs x AlgoBots - Cross-community 3D NFT Collab by Cosmic Champs (@madshapes-dev)",
      description:
        'Last year we added MNGO &amp; AL GOANNA characters to Cosmic Champs PVP battle arena and they were both a huge hit. There is many more Algorand projects that are a great fit for our PVP game. Unfortunatelly it\'s cost prohibitive for us to do such fun collabs as making a fully animated, AR ready, game ready, 3d NFT takes lots of resources. If funded, we will create and distribute AlgoBots x CosmicChamps NFTs for free to help promote AlgoBots (one of the OG Algorand projects that deserves more spotlight for its contributions to the Algorand ecosystem through all these years) to our players and our game to the their community. Such collabs work because they address different types of audiences and thus help spark interest to explore other parts of ecosystem or Algorand itself. To get better idea here is two of our recent collab NFTs that are playable in our game: <a href="https://nft.cosmicchamps.com/nft/1280977773" target="_blank">MNGO</a> ,<a href="https://nft.cosmicchamps.com/nft/1108380528" target="_blank">PEPE</a>',
      options: [{ id: "f652b3f4-cf2a-4ce7-888f-f5b11537b61f", label: "yes" }],
      metadata: {
        link: "https://github.comandation/xGov/pull/96/files",
        category: "Community",
        focus_area: "Gaming",
        threshold: 41092739531,
        ask: 20000,
      },
    },
    {
      id: "826d55ae-7467-4c02-b4bd-b5ecd56d8d87",
      prompt: "#98 Launch of Nimblr - Audits, Licensing, & GO LIVE! by Adam Hofmann (@ahrevival)",
      description:
        "Development is complete and Nimblr is ready to launch it's pioneering decentralized insurance platform on Algorand. Nimblr is seeking support form the xgov program to enhance the integratity and functionality of our system. Leveraging Algorand's speed, security, and efficiency, Nimblr's aim is to change the insurance industry by seamlessly integrating insurance professionals, carriers, capital providers, and insureds. The grant proposal focuses on three critical areas: smart contract audits, licensing fees and go live costs. The final pieces needed for Nimblr to go live!",
      options: [{ id: "67741cdf-3963-4ff4-8951-81cad10b39c6", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/98/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 736116844240,
        ask: 358271,
      },
    },
    {
      id: "2991ee2e-f37c-4dc1-bebb-985082cab6bd",
      prompt:
        "#99 AlgoLearn Platform  Interactive Learning for New Developers by Costa Leo (@atsoc1993), Costa Leo <atsoc1993@gmail.com>",
      description:
        'This proposal outlines a request for funding to pursue a comprehensive educational initiative aimed at empowering new developers in the blockchain space within the Algorand ecosystem. The project originates from a vision to create a learning platform for developing on the Algorand blockchain— a website with interactive IDEs (Integrated Development Environments) where you can not only learn but also try out coding directly, with access to a locally hosted Algorand testnet node for real-world practice. Although all functionalities of Algorand are open-sourced in some way or fashion across various GitHub repos, YouTube channels, and developer documentation, new developers will find themselves grasping at straws when trying to compile an application of their own. For example, we have multiple showcasings for different varieties of completed smart contracts for different kinds of applications, but no content that explains why a smart contract is formatted the way it is, how to debug your smart contract, or how to walk through safely creating asserts to ensure prevention of exploits. These are just more complex issues, but even simple explanations or walkthroughs of various applications when developing on Algorand are spread thin across the ecosystem, with little substance explaining how things work. Starting with simple implementations and building into more complex projects, its vital to understand how everything comes together from start to finish, topics such as: compiling the final smart contract natively without using dAppflow, encoding and decoding the approval/clear programs, sending transactions, deducing the hex string for a particular method in a smart contract, and passing that specific method into an argument within a transaction object, including mandatory app arguments and foreign assets that need to be passed into transaction objects lest the transaction fails. These points highlight the endless gaps in current educational content, and extremely common mishaps that could make a 1-2 hour long project takes days or even weeks for new developers. As much as I value the work we have done so far for educational content, it is an absolute must that we expand on several developer topics and ensuring all new developers brandish the tools we have available on Algorand with confidence. This series centers on the beginning of AlgoLearn, and all profits will be used to fund and captain AlgoLearn indefinitely. See "Present Proposal" section for details about AlgoLearn and what this proposal will manifest.',
      options: [{ id: "d4cf9a30-64d8-4d66-aa4b-9c802a0182e8", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/99/files",
        category: "Tools",
        focus_area: "Education",
        threshold: 247000000000,
        ask: 120000,
      },
    },
    {
      id: "462e3b47-2777-4584-ad3c-1d917e5ef376",
      prompt: "#100 GPU-based vanity address generator for Algorand by Marcin Zawiejski (@dragmz)",
      description: "A tool for generating Algorand vanity addresses using GPU acceleration.",
      options: [{ id: "c245d1b8-f486-436d-a22d-b9ce51f0c5c8", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/100/files",
        category: "Tools",
        focus_area: "Other",
        threshold: 97541835826,
        ask: 47474,
      },
    },
    {
      id: "49604f78-0aa3-4a60-aacb-381603450760",
      prompt: "#104 Notiboy Web3 Chat by AP (@Vidhyanandcs)",
      description:
        "We at Notiboy has a vision to make web3 communication more efficient. That means the algorand addresses should be able to communicate with each other by maintaining their privacy. So we are developing a chat application which will help the addresses to chat between each other in an anonymous way. There will also be a facility for group chat which will help formation and development of web3 communites. The users will also be able to send/transfer assets between addresses during their chat.",
      options: [{ id: "33469285-298a-466e-b7eb-fb71d38dbbfa", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/104/files",
        category: "dApps",
        focus_area: "User Onboarding",
        threshold: 123278218595,
        ask: 60000,
      },
    },
    {
      id: "82909be6-1496-42fc-a19e-61c2d4a35262",
      prompt: "#107 XBallot governance protocol by HEADLINE by Aaron Martinez (@headline-design)",
      description:
        "This proposal outlines the XBallot governance protocol, a pioneering initiative poised to revolutionize the Algorand ecosystem. XBallot is not just a technical solution, it's a catalyst for decentralized empowerment, fostering an environment where transparency, user agency, and community-driven development are paramount. - **Enriched Governance Protocol**: Beyond basic DAO functionalities, XBallot integrates advanced mechanisms for decentralized decision-making, enhanced security measures, and a seamless user experience. - **Innovative On-Chain Social Feeds**: A groundbreaking feature, providing a platform for verified, immutable community interactions, setting a new standard for blockchain-based communication. - **Dynamic Account Toolkit**: Beyond wallet generation, this toolkit introduces a suite of services, including advanced security features, user analytics, and seamless integration with other Algorand services. Feature 1: DAO Management XBallot is a comprehensive governance protocol that allows users to create and manage DAOs on the Algorand blockchain. The protocol includes a variety of features that enable users to create and manage DAOs, including: voting, proposals, treasury, and more. The protocol is also fully decentralized, featuring a unique on-chain data aggregation system that allows users to interact with the protocol directly from their Algorand wallet. All user interaction is performed on-chain, ensuring that all data is immutable and transparent. Our custom balance indexer is critical to the protocol, as it maintains an up-to-date record of all user token balances, which in turn allows the protocol to accurately calculate voting power and other important metrics. Feature 2: On-Chain Social Feeds XBallot features a unique on-chain social feed system that allows users to post and interact with content on the blockchain. Users can post text, images, videos, and more, and other users can interact with the content by liking, commenting, and sharing. All content interaction is executed on-chain, ensuring that it is immutable and transparent. Social feeds can be utilized by DAOs to post important information, such as proposals, voting results, and more. Users can also post content to their personal social feed, which can be used to share information with other users. Feature 3: Account Toolkit The Account Toolkit is set to redefine user interaction within the blockchain. By providing users with tools to customize their blockchain footprint, XBallot is not just offering a service, it's inviting users to be architects of their digital identity, enhancing both personal security and engagement within the Algorand ecosystem.",
      options: [{ id: "de038ea8-6998-44a9-b7e3-7c7bb6908753", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/107/files",
        category: "dApps",
        focus_area: "Other",
        threshold: 770488866222,
        ask: 375000,
      },
    },
    {
      id: "ab67da56-6f63-41e1-8491-36dd5d307617",
      prompt: "#108 Airgap vault & wallet integration via isolated modules by AP (@Vidhyanandcs)",
      description:
        "Airgap vault is an open-source vault that helps algorand community to convert their old mobile phone to a cold storage for generation and management of private keys. Airgap wallet is an open-source wallet with web, android, iOS, mac, windows and linux support. It currently supports BTC, ETH, XTZ, DOT, GLMR, ATOM, ICP, RBTC &amp; more. Unlike other wallet ecosystems, your private key (seed phrase) is never stored in the wallet app but in the vault. We are proposing a plan to integrate airgap vault and wallet via isolated modules to algorand.",
      options: [{ id: "7544d2eb-ec7f-40cb-b66f-cd6f5c4ecea0", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/108/files",
        category: "Tools",
        focus_area: "Deployment",
        threshold: 173678463631,
        ask: 84530,
      },
    },
    {
      id: "c304f1e5-137d-4110-a744-fd72c3302d0e",
      prompt:
        "#109 Unraveling Algorand's Real World Assets Landscape & DEX Swaps, by Chaintrail - Uncovering Algorand by Leander <nfnomad@chaintrail.io>, Chaintrail (@Chaintrail)",
      description:
        "We'll be unraveling the landscape of Real-World Assets tokenized on Algorand. Showing web2 and web3 consumers that Algorand is 'the' blockchain best suited for RWA (using actual on-chain data). Made by Chaintrail, a blockchain intelligence &amp; insights platform focussed on uncovering Algorand in full (Dapp impact, NFT's, RWA, Network insights, TVL, Stables, ...)",
      options: [{ id: "f1b1cea8-633b-4582-a8b6-fb5363db1c59", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/109/files",
        category: "Tools",
        focus_area: "Monitoring",
        threshold: 195190512776,
        ask: 95000,
      },
    },
    {
      id: "322bd7dc-e736-43d7-82a1-91fee2f89606",
      prompt: "#110 Pixelnode - Oneclick node manager by Shivaprasad Manupadi (@shivamanupadi)",
      description:
        "PixelNode is a user-friendly One-click node solution for Algorand node management. Offering a seamless installation process and an intuitive web interface for easy interaction with Algorand nodes.",
      options: [{ id: "b89c99fa-9b8b-4685-b31e-5aab6bd3cd36", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/110/files",
        category: "Tools",
        focus_area: "Node",
        threshold: 513659244148,
        ask: 250000,
      },
    },
    {
      id: "11d21d24-0dc8-4d73-aaba-4de267df5c70",
      prompt: "#112 Thurstober Tools - Onboarding Enhancements, Upgrades, and Redesign by Joseph Glenn (@loafpickleWW)",
      description:
        "The Team at Thurstober Tools (Formerly Evil Tools) has listened to the community requests for new tools. In this proposal we want to add in NFD Vault Support to reduce the opt-friction for new Algorand Users, Add in the ability to enter an NFD root and airdrop to all the segements, Add ARC-36 Support (Non-Rarity Filters) to our Simple Mint and Update Tools, Add in advanced asset tools to change the Manager, Freeze, and Clawback Address, and add in a tool where you can enter a Wallet Address to download the tx history. Included in this proposal free of charge will also be a site re-design.",
      options: [{ id: "fe632f99-a353-478e-9957-7aa0e9dfdaf8", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/112/files",
        category: "Tools",
        focus_area: "User Onboarding",
        threshold: 41092739531,
        ask: 20000,
      },
    },
    {
      id: "6673b2ee-71b1-42d2-8479-f1e44f824aa0",
      prompt: "#113 Thurstober Wallet Enhancer - Asset Details and Atomic Swaps by Joseph Glenn (@loafpickleWW)",
      description:
        "Listening to community feedback, we want to enhance the wallet enhancer with this proposal! Users have requested Asset Details for when you click on an asset. This will show the asset information including the metadata and give the user the ability to add, opt out, or send right from that asset page. In addition we intend on allowing users to make trades where you can go on another wallet, select assets, and set up an atomic swap transfer for any algorand ASAs.",
      options: [{ id: "d92d8b3c-b3a8-42ac-81ee-09ef18203e69", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/113/files",
        category: "Tools",
        focus_area: "User Onboarding",
        threshold: 41092739531,
        ask: 20000,
      },
    },
    {
      id: "bc41ccdb-f0a6-4299-8c1e-214961b2c750",
      prompt: "#114 Thurstober Claims - Atomic Swap Creation and Redemption by Joseph Glenn (@loafpickleWW)",
      description:
        "This proposal has been highly requested from app developers on Discord and Telegram. Here users will be able to use new API endpoints to easily create automated swap links. This will help reduce the onboarding friction of having to add an ASA to claim something as the atomic swap will have the opt in and transfer in once signing. In addition to creating the ability for bots to tap into the website, we will be developing an example discord bot to make things easier to develop and have a manual swap creation feature, becuase why not?",
      options: [{ id: "70717416-470e-4680-b33d-6a37ed91a26f", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/114/files",
        category: "Tools",
        focus_area: "User Onboarding",
        threshold: 41092739531,
        ask: 20000,
      },
    },
    {
      id: "202d4903-4e5d-4911-a29c-5d39a75e2bb8",
      prompt: "#115 AlgoMinter - NFT Image Generator by Zachary Minner (@1forh)",
      description:
        "I am developing an app that allows users to generate NFT collections utilizing user-uploaded image data (layers) as well as customizations that offer fine-grain control over the generated images. The dApp will allow the user to upload layer files, set rules for specific traits, preview images based on collection size, and then either download the images or mint them straight to the Algorand blockchain using ARC69, ARC19 specifications.",
      options: [{ id: "70eba3ef-98d1-4d7f-830c-a8a692642101", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/115/files",
        category: "dApps",
        focus_area: "NFT",
        threshold: 82185479063,
        ask: 40000,
      },
    },
    {
      id: "052898d6-48a4-4087-b2aa-de8f43db2fbf",
      prompt: "#116 Subscription Payments by krby.algo (@kylebeee)",
      description:
        "Subscription payments are a common feature across most industries and are essential to bridging the rest of the world to Algorand. We're building a first class subscription system &amp; platform that will bring the next generation of recurring payment rails to Algorand. In a multitude of ways, our smart contract design streamlines control, accessibility and management of subscriptions for both businesses and end users on Algorand. With version 1.0 of the contracts already written, Akita is looking to build out the UI interfaces and expand on their functionality (More details below in the Roadmap section). These contracts will serve both businesses on Algorand via Javascript SDKs and the Akita creator subscription platform.",
      options: [{ id: "6d83c9f9-8de2-4ba8-a5ef-35d2873f5cac", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/116/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 102731848829,
        ask: 50000,
      },
    },
    {
      id: "2f24ae93-ed37-420d-bd54-8553f750d0cf",
      prompt: "#117 Plugin-Based Account Abstraction by krby.algo (@kylebeee)",
      description:
        "This proposal aims to bring production ready stateful smart contracts &amp; tooling that act as an abstraction layer for interacting with the Algorand blockchain. This will allow businesses to offer their users a seamless onboarding experience &amp; focus on delivering value to their customers, while amending some of the current UX friction points for new users. Through the use of plugins, users will be able to safely delegate authorizations opening up a whole new world of possibilities for the Algorand ecosystem.",
      options: [{ id: "8e305b9b-7b37-46d2-acdd-859af5b03b05", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/117/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 102731848829,
        ask: 50000,
      },
    },
    {
      id: "e95a3015-b5ec-4417-843f-ac7005b9b595",
      prompt: "#118 The First WebMarket - A Micropayment Content Exchange by Dugan Messman (@dsmessman)",
      description:
        "There currently is no widely used application that uses blockchain technology. The average person still does not use blockchain to make transactions. They are stuck in the financial past. In the future, everyone will use Algorand like digital cash -- paying one another with peer-to-peer payments. pressdot is one of the first steps to achieving that future: a micropayment monetization system for internet content is vital infrastructure for onboarding every human on the planet to Algorand. With this grant, pressdot will develop a platform to onboard the next million crypto non-natives to Algorand, all the while developing never seen before use of the technology.",
      options: [{ id: "a8602991-53c9-4d8b-a69d-23a33b54d0d4", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/118/files",
        category: "dApps",
        focus_area: "Other",
        threshold: 1027318488296,
        ask: 500000,
      },
    },
    {
      id: "493c617a-8e7e-44eb-967c-8ac0eca0da30",
      prompt:
        "#119 Zorkin - Social Login for Self-Custodial Account Authentication with ZK-SNARKs by Winton Nathan-Roberts (@mangoplane)",
      description:
        'Zorkin plans to develop a <a href="https://z.cash/learn/what-are-zk-snarks/" target="_blank">ZK-SNARK</a> based solution for low-friction user authentication and transaction authorization with <a href="https://en.wikipedia.org/wiki/Social_login" target="_blank">Social Login</a> via supported OAuth providers (e.g. Google), linking the user\'s OAuth identity to a unique Algorand Account from which transactions can be authorized. Some Algorand specific user experience challenges, such as explicit asset Opt-In approval, will be addressed cohesively. A fiat on-ramp will be integrated into the solution for regulatory-compliant blockchain asset purchases using popular payment methods such as credit card. It will be launched as a paid service with pricing that is estimated, although not guaranteed, to be competitive with alternatives like <a href="https://web3auth.io/" target="_blank">Web3Auth</a>. Disclaimers: - The proposal is subject to terms, conditions and disclaimers as outlined in the body of the proposal - Should the proposal be unfunded or fail to pass, we reserve the right to discontinue Zorkin development, terminate our plans and close any public services',
      options: [{ id: "c7b741aa-afd8-4037-a296-137a959a276b", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/119/files",
        category: "dApps",
        focus_area: "User Onboarding",
        threshold: 205463697659,
        ask: 100000,
      },
    },
    {
      id: "cc6c3351-e24a-46c5-94a5-ba291f7903a1",
      prompt:
        "#120 How to ALGO NFT - Explore our articles/tutorials to become an Algorand NFT expert. by Zachary Minner (@1forh)",
      description:
        'The live version of (How to ALGO NFT)[https://www.howtoalgonft.com/] has been around for about a year. It has various categories related to onboarding and NFTs. Most of the categories contain links to external resources. I am currently in the process of redesigning and rebuilding the website using Next.js/Payload CMS. You can view the progress at the link below. https://staging.howtoalgonft.com We\'ll be adding well-written articles for each of the 6 "Algorand NFT Essentials" to help users with all sorts of Algorand NFT-related topics.',
      options: [{ id: "aa026ff5-d25b-43dd-8fd4-3ebe835c4a43", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/120/files",
        category: "dApps",
        focus_area: "User Onboarding",
        threshold: 20546369765,
        ask: 10000,
      },
    },
    {
      id: "8d3777ca-c459-4cc0-8e13-023f3b5a48fa",
      prompt: "#121 Podcast and website expansion by The Next Block (@thenextblock3)",
      description:
        "The Next Block, a media company, focuses on video content creation within the Algorand ecosystem. With two years of experience in live interviews, we are expanding our reach with a new website for blogs and media content. Our proposal extends to fostering growth in NFT and DeFi communities, using proposed funds for impactful content creation. This strategic approach aligns with our dedication to advancing the Algorand ecosystem while contributing to the broader blockchain landscape.",
      options: [{ id: "bb5d67dd-dbd3-4a40-8fa4-979d88275329", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/121/files",
        category: "Community",
        focus_area: "Education",
        threshold: 51365924414,
        ask: 25000,
      },
    },
    {
      id: "131f0b4a-3427-4b83-9c1e-9a4bd7e3a539",
      prompt: "#122 Fast Cometa & New features by Nikita Gorokhov (@nikitacometa)",
      description:
        "Cometa is a staking/farming platform on Algorand launched in <b>August 2022</b>. Our current goal is to empower liquidity, popularity and growth of all the projects in the ecosystem. But we want to do much more. As we go into Q1 2024 more bullish than ever, we would like to start with several minor features that will help the growth of our website as well as the whole Algorand ecosystem. These features include really important platform optimizations &amp; bug fixes and new features: Vault/Airdrop pools and Portfolio Tracker.",
      options: [{ id: "25b8eaa2-dc33-408a-bce0-c494a7b9c390", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/122/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 205463697659,
        ask: 100000,
      },
    },
    {
      id: "bf1e8b18-ee6b-45af-921d-2d1b312a53b0",
      prompt: "#123 AlgoDirectory (directory.algo) by Brian (@SilentRhetoric), Christian (@tak-o-kat)",
      description:
        'AlgoDirectory will help people discover all that the Algorand ecosystem has to offer while enabling users to easily create &amp; edit listings through an on-chain model. The Directory will become permissionless and sustainable by leveraging Algorand\'s powerful capabilities to put listings on chain and let owners maintain them through a novel "Vouching Protocol" smart contract.',
      options: [{ id: "e8066ccb-56a8-4d86-a170-c1383d1c4052", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/123/files",
        category: "dApps",
        focus_area: "User Onboarding",
        threshold: 102731848829,
        ask: 50000,
      },
    },
    {
      id: "72d062a2-0f97-4d46-9f3f-1bfb04c887b4",
      prompt: "#130 Community Code Contribution Contest (C4) by SilentRhetoric (@SilentRhetoric)",
      description:
        "The Community Code Contribution Contest (C4) will be an ARC-34-compliant community contest among developers in the Algorand ecosystem to contribute high-quality features and bug fixes to the core code libraries that make Algorand work. The contest will also generate recognition for winning developers on social media to bring attention to their efforts to make Algorand's codebase better.",
      options: [{ id: "69440a31-b1f2-4ef2-8b28-71c20ea1ef1d", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/130/files",
        category: "Community",
        focus_area: "Libraries",
        threshold: 91316285787,
        ask: 44444,
      },
    },
    {
      id: "5540cb8f-cbe9-44ae-944d-e8205c451a2d",
      prompt: "#141 Securing ASA Stats API high availability for the next 2 years by Ivica Paleka (@ipaleka)",
      description:
        "ASA Stats API makes all the ASA Stats website's functionalities available to any development team or individual. As we provide it for the cost of next to nothing, during the bear market some major Algorand projects have abandoned their development and decided to use the ASA Stats API instead. Our stance is - at least until the ecosystem recovers - that any price increase would probably be counterproductive for everyone in the ecosystem. So we are using this opportunity to allow the continuation of the API development, as well as its improvement and administration for the next 2 years. On top of that, this proposal will allow us to provide a tenfold increase in our API bandwidth and high availability with an uptime equal to or very close to 100%. ASA Stats has processed dozens of millions of requests in the last two years and this proposal will allow billions of them in the future.",
      options: [{ id: "6db09322-4782-4fd4-acfb-3b81b8dbf95f", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/141/files",
        category: "Tools",
        focus_area: "Other",
        threshold: 119168944642,
        ask: 58000,
      },
    },
    {
      id: "eb273365-7976-4a89-9c49-1e51384c60b2",
      prompt: "#142 Composable Marketplace by Asalytic by Vilijan Monev (@Vilijan)",
      description:
        "The goal of this proposal is to build the necessary infrastructure (smart contracts, API, parsers) for trading NFTs in a decentralized way, where each party that contributed to the NFT sale receives a cut from the fees. The NFT listing can happen on any **platform A** and the NFT purchase can happen on any **platform B** while both parties receiving equal amount of fees. We call this infrastructure a _**Composable Marketplace**_. We strongly believe that this open-source infrastructure will bring more innovation on the NFT scene and will create synergy instead of a competition between all the companies that use and leverage the NFTs on Algorand.",
      options: [{ id: "1e2ab6be-7ac7-48fb-a370-d6421ef14966", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/142/files",
        category: "Tools",
        focus_area: "NFT",
        threshold: 102731848829,
        ask: 50000,
      },
    },
    {
      id: "eb33f829-2a02-4fb3-b920-2efa93411418",
      prompt: "#143 Educational Fungi Farm by Sean Deegan (@solluna168)",
      description:
        "Solluna Mushroom Farms is a farm-to-table business that is adopting Algorand's blockchain technology to educate/onboard mushroom growers and buyers. We aim to achieve this by implementing the following key features to our business plan: (1) an ASA (Algorand Standard Asset) rewards only program for our customers and supporters, (2) an NFT based grow kit and farming course, and (3) an innovative regenerative sustainablity mushroom farm. We are requesting funding in order to execute these key features.",
      options: [{ id: "deec25eb-5e6f-4d37-9211-b9821888ad90", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/143/files",
        category: "Community",
        focus_area: "Other",
        threshold: 113005033712,
        ask: 55000,
      },
    },
    {
      id: "eaaf8e5d-5776-48da-bc21-9907affd66f1",
      prompt: "#144 Cosmic Champs x Algoleagues - Cross-community 3D NFT Collab by Cosmic Champs (@madshapes-dev)",
      description:
        'Last year we added MNGO &amp; AL GOANNA characters to Cosmic Champs PVP battle arena and they were both a huge hit. There is many more Algorand projects that are a great fit for our PVP game. Unfortunatelly it\'s cost prohibitive for us to do such fun collabs as making a fully animated, AR ready, game ready, 3d NFT takes lots of resources. If funded, we will create and distribute AlgoLeagues Algoman x CosmicChamps NFTs for free to help promote AlgoLeagues (one of the OG Algorand projects) to our players and our game to the their large user base that is also present outside of Algorand ecosystem. Such collabs work because they address different types of audiences and thus help spark interest to explore other parts of ecosystem or Algorand itself. To get better idea here is two of our recent collab NFTs that are playable in our game: <a href="https://nft.cosmicchamps.com/nft/1280977773" target="_blank">MNGO</a> ,<a href="https://nft.cosmicchamps.com/nft/1108380528" target="_blank">PEPE</a>',
      options: [{ id: "9717a566-1203-4990-93c0-9088729eecd0", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/144/files",
        category: "Community",
        focus_area: "Gaming",
        threshold: 41092739531,
        ask: 20000,
      },
    },
    {
      id: "91a44aa4-ff99-46b0-aac3-596b87eb8386",
      prompt:
        "#145 Fostering on-chain engagement and attracting new users among Algorand's Japanese community. by aper (@aper0xmei)",
      description:
        "Japanese people still have significant influence on the price aspects of cryptocurrencies, and not only with BTC. In various cryptocurrencies such as ADA, SOL, MATIC, ASTR, XDC, ENJ, XEM, JASMY, IOST, Japanese involvement alone has the power to maintain a certain price level, regardless of actual demand. However, in the case of Algorand, there are very few Japanese users. Even with a generous estimate, the number of users holding ALGO is around 500, and on-chain activity accounts for less than 10%. This overall figure has hardly changed for about three years, despite the presence of a Japanese Algorand Ambassador and community champ. Honestly, he has little achievement in terms of recruitment, and since there is no expectation of significant influx from him, there is a need for community-driven efforts. The main reasons for the lack of Japanese users are largely attributed to the characteristics of the Japanese population: Almost 100% of ordinary Japanese individuals cannot handle languages other than Japanese. Attempting to obtain ALGO for on-chain activities in Japan through normal means incurs a minimum fixed fee of 3000? (approximately $20) and approximately a 5% fluctuation fee. Japanese people tend to follow celebrities and some are willing to move significant amounts based on celebrity statements. However, there are no influential celebrities among Algorand users in Japan. To address this situation, the following approaches will be implemented to enhance the understanding of existing users and attract new users: Provide high-quality information in Japanese that cryptocurrency users seek. Give a few ALGO to individuals who do not currently possess ALGO, have them create their own wallets, and offer incentives to those who achieve certain results. However, this will be limited to users who can be confirmed as real individuals through some form of verification. Form partnerships with influential influencers or organizations.",
      options: [{ id: "20456582-1e0c-44ce-ad5a-a950ef04b71d", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/145/files",
        category: "Community",
        focus_area: "Education",
        threshold: 24655643719,
        ask: 12000,
      },
    },
    {
      id: "e2be5c35-afa3-4843-83b0-714c2da8fc67",
      prompt: "#148 CompX - CoinTracker+ by Kieran Nelson (@xxiled-plastic-cat)",
      description:
        "So you’ve found the next 100x coin, your excited! You bought some yesterday and you bought some today - but the price changed in that time - green candles of course! - but how does that affect your return? What’s your average buying price? What happened in between your buys, what was the volume? Coin Tracker+ is another innovative feature brought to you by CompX. Analytics are great but personalised analytics are even better. Select any coin/token/ASA/NFT and get a personalised dashboard related to your holdings, buying, selling, average prices and overall P+L. Find farming/staking opportunities to your holdings and get alerts on price changes.",
      options: [{ id: "e22eeea2-71f0-4040-a3e0-bc2e028366fc", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/148/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 102731848829,
        ask: 50000,
      },
    },
    {
      id: "e5b65db3-51f6-4b75-bdd5-986388a8f068",
      prompt: "#149 CompX - Farm Rewards with Lock Weighting by Kieran Nelson (@xxiled-plastic-cat)",
      description:
        "AT CompX we pride ourselves on bringing innovative solutions to the Algorand DeFi ecosystem. Our auto-compounding farms give users new strategies to earn higher yield in a more efficient manner. To further enhance our auto-compounding farm product we want to introduce a mechanism where users can yield additional rewards on top of the farm APR and the auto-compounding bonus.",
      options: [{ id: "4d7c0317-cefc-4865-92f8-5587fb365a98", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/149/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 410927395318,
        ask: 200000,
      },
    },
    {
      id: "d596a68a-3257-477f-863e-f1a9d3bbee07",
      prompt: "#150 Cross Chain Community Collaboration by Linnen (@ambassador-linnen)",
      description:
        "We are a group of ambassadors who have been running cross project collaberations on algorand for over a year. We Have partnered with several well known algorand projects to produce giveaways, NFT collabs, twitter spaces, discord games and twitch streams. We Propose to use this grant to continue with this work across multiple blockchains including Solana, Ethereum, Polygon and more. This wil help us to onboard new users to algorand who are already in the web3 space. We expect they will continue to participate in the ecosystem beyond our involvment once they realise the smooth user experience of Algorand as well as the speed and cost of transaction. This wil benefit the whole ecosystem.",
      options: [{ id: "8d6ed96a-5b88-49e6-8790-2c82c84e7e17", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/150/files",
        category: "Community",
        focus_area: "Social",
        threshold: 30819554648,
        ask: 15000,
      },
    },
    {
      id: "2217e4a6-22ce-4fc3-b53a-de3de507dcb2",
      prompt:
        "#152 Algorand is THE chain for Gaming (establishing the RWA narrative) by Cosmic Champs (@madshapes-dev)",
      description:
        "Gaming will onboard the next big wave of users to Algorand. As one of the oldest and biggest games on algorand we are uniquely positioned to to carry lions share of that influx. Our recent nomination for best blockchain game of 2023 is a good indicator of that. To help establish the narrative that Algorand is great for gaming it is crucial that lead games are secure, performant and ideally built to appeal the masses (e.g. actually fun to play) - all of which Cosmic Champs is! To date, we are the only game that supports real time 3d PVP, with authoritative servers (more secure) on Algorand. This increased security and performance - which are both crucial as they implicity represent Algorand itself (to an uneducated user, a buggy or slow game experience can easily be turned into misconception that Algorand is buggy and slow) are incuring high infrastructure costs for our project and our platform. To meet the increasing userbase and be prepared for future influx on gamers, we need to migrate our server fleet to a more powerful instances that will be able to handle sudden spikes in active game sessions better. Xgov grant will help us to maintain the industry standard performance without introducing friction to the new people entering Algorand ecosystem for the intermediate time until we reach critical mass to become profitable.",
      options: [{ id: "a93eb7df-902c-4500-be7b-d68d32267fbc", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/152/files",
        category: "Community",
        focus_area: "User Onboarding",
        threshold: 205463697659,
        ask: 100000,
      },
    },
    {
      id: "9a18538e-0e6b-424c-8879-6af102db1a49",
      prompt: "#153 Neighborhood Vehicle Share -mobility as a service application- by William H. (@dangnangdang)",
      description:
        "This project aims to transform vehicle rental/operation for members of society who have not previously been able to afford such a luxury. This is not the tokenization of assets explicitly, but a rather similar idea functionally.",
      options: [{ id: "d706c2a5-4b55-49e4-a0ff-19cef278fcf9", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/153/files",
        category: "dApps",
        focus_area: "Deployment",
        threshold: 616391092977,
        ask: 300000,
      },
    },
    {
      id: "73d3881b-8420-406e-bb83-5f283b9f6e3a",
      prompt:
        "#154 Cosmic Champs partnering with legendary indie toy company to bring physical toy in-game on Algorand by Cosmic Champs (@madshapes-dev)",
      description:
        "The Toy Collectibles market was estimated at 13bilion in 2022 and is estimated to grow to 25bilion by 2025. It is rapidly growing market that is also a great match to combine with NFT technology. If succesfully funded we are partnering with an established player in the collectible toy industry that holds singinficant brand IPs for action toys that are also a perfect fit for our mobile game (imagine transformers or gundam mobile suit IP being added to Cosmic Champs game). We will do a limited physical run of a known collectible toy (not a cosmic champs character) and integrate it in our game as NFT. Each figurine will have its NFT counterpart. We will work on establishing a behaviour driven distribution channel, that will open Algorand to a whole new audience of collectors to interact ecosystem and pave the road for near future when industry behemots like Disney or Marvel will be looking for the blockchain to offer ther products as NFT + physicial collectibles. We see huge potential to onboard new community and also to establish the narrative that Algorand is the best chain for phigital (physical + digital) products. At the same time we do acknowledge that the costs of such endeavours are quite high and it is not possible to do it on our own budget.",
      options: [{ id: "40db845d-67c6-4b8e-8bd6-2db44d64f9d1", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/154/files",
        category: "Community",
        focus_area: "User Onboarding",
        threshold: 513659244148,
        ask: 250000,
      },
    },
    {
      id: "317d1081-ae10-46a0-bd5a-679e741a849b",
      prompt: "#156 Open Source ARC53 Tooling by krby.algo (@kylebeee)",
      description:
        "This proposal aims to build out &amp; open source tooling for decentralized self-soveriegn project details on Algorand. ARC53 is a community page spec that enables projects &amp; companies with onchain assets to trustlessly share details about their business for exploration by the community and other business entities on-chain. NFT marketplaces, wallets, and other dapps can utilize this spec to enable users to explore projects &amp; companies on-chain. This proposal aims to build out open source tooling to enable this spec to be easily utilized by the community.",
      options: [{ id: "2100c169-58c8-4850-b9e2-d8bbfd71f233", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/156/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 51365924414,
        ask: 25000,
      },
    },
    {
      id: "a4147bbd-e06b-4c5b-b53f-7f046706869e",
      prompt:
        "#157 Centralised Bridge Proposal - Two-Way Cardano (ADA) to Algorand (Algo) by Giles Campbell & Ronan Clooney (@clooneyr)",
      description:
        "This proposal outlines the development of a centralised bridge facilitating the seamless transfer of Cardano (ADA) and Algorand (ALGO) between the two chains. The bridge aims to leverage the unique nature of the Cardano and Algorand relationship and provide users on both networks with a secure and efficient means to transfer and utilise assets across ecosystems. Excess bridged assets will be held in cold storage through our custody provider. Why centralised? Speed and simplicity of implementation, a decentralised version though desirable would take significantly longer and require more resources. Costs associated with the build include additional tech requirements, marketing on both chains, custody provider fees and multiple audits ensuring the security of assets. If approved we can leverage the relationship with our custody provider allowing additional assets to flow between ecosystems. The Algorand ecosystem has a unique relationship with Cardano and we believe the time has come to take the first steps to embrace this. The Algomint team is also uniquely positioned to attract liquidity from ADA once the bridge is approved and a suitable reward mechanism is in place. Discussions with significant Cardano community members has revealed yield is the primary incentive that would drive interest in Algorand from the ADA community but would need to be accompanied by thorough tutorials and awareness campaigns. Significant additional research into implementation of a decentralised iteration will be continued moving forward. ### Bridge Development (260,000A) - **Infrastructure Setup:** Establish a secure and robust infrastructure for the centralised bridge. - **Custody Provider Integration:** Integrate with a reputable custody provider to securely store bridged assets in cold storage. - **User Interface:** Develop a user-friendly interface for users to initiate and monitor cross-chain transactions. - **Security Audits:** Conduct thorough security audits. - **Integration Testing:** Perform extensive testing of bridge's functionality and security. - **Deployment:** Deploy the centralised bridge, custody integration, and user interface components. The reward structure will be designated and designed around TDR and collaborations with other Algorand defi platforms.",
      options: [{ id: "67a2abb1-45b8-4958-a4cd-8ab607ebd8b8", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/157/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 534205613914,
        ask: 260000,
      },
    },
    {
      id: "3c7eb90c-98ca-40e9-9ffe-d0a838115d01",
      prompt: "#158 X-NFT Cardano Integration by Giles Campbell (@GilesTNT)",
      description:
        "The X-NFT team proposes to build a one way bridge and incentivise ADA users with X-NFT to make the leap to Algorand DeFi and NFT communities. We will engage artists (ideally Cardano natives) to produce a collection specifically marketed to Cardano community members. This collection would be redeemable only on Algorand. Cardano users who earn / receive the token will be able to seamlessly transfer through our custom built one-way bridge to Algorand, where it would be burned, and replaced by the Algorand native X-NFT token. The aim is to incentivise users from Cardano to experience both Algorand Defi and NFT communities. We believe that rewards will create a high likelihood that users who receive X-NFT within the Cardano ecosystem will bridge and use Algorand to realise that value where redemptions are possible and trading liquidity is concentrated. X-NFT distribution will be targeting areas with the highest number of suitable users. The token’s utility and focused liquidity will remain on Algorand acting as the driving force behind the need to bridge to Algorand. This is a stand alone application. ### Project Development Token Generation on Cardano: Generate &amp; manage X-NFT tokens on Cardano. #### Bridge Mechanism: Create a one-way bridge mechanism to securely transfer X-NFT from Cardano to Algorand. This is planned to be centralised and very simple (mint &amp; burn) to keep the process as easy and seamless as possible. #### Mint &amp; Burn Process: Implement a seamless process to burn X-NFT on Cardano and mint the Algorand native X-NFT token. #### Reward System: Design and integrate a reward system ideally via Cardano's DeFi platforms to incentivize users for bridging to Algorand. #### Marketing: The new project will be marketed to the Cardano community engaging with KOL’s within Algorand and Cardano to drive engagement and awareness.",
      options: [{ id: "b7d588c6-9490-41f4-b32f-98cf41e12c56", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/158/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 349288286020,
        ask: 170000,
      },
    },
    {
      id: "1611eb1a-fc9f-4db7-9fd0-aecfa65d0bb5",
      prompt: "#159 Dynamic Interest Peg Stability Mechanism and Zap Vaults by Giles Campbell, Nimi (@jesulonimi21)",
      description:
        "This proposal outlines the development of innovative features within the xBacked ecosystem on Algorand. We aim to introduce a new peg mechanism with dynamic loan rates, ensuring the stability of the pegged value. Additionally, we plan to build a zap function for vaults, enabling users to bring one side of the LP, allowing the protocol to mint xUSD for the other side. These vaults will operate on an auto-compounding mechanism, gradually paying off loans and enhancing the ecosystem's resilience. # Project Components - Design and Implement Dynamic Loan Rate Mechanism: Develop a robust mechanism that dynamically adjusts loan rates based on the peg's stability. If xUSD depegs, falling below the desired $1 value the protocol interest rates will increase with the increase varying depending on the severity of the depeg. Integration with xUSD Protocol: Integrate the dynamic loan rate mechanism seamlessly into the xUSD protocol. Smart Contract Development: Develop and deploy smart contracts to enable the dynamic adjustment of loan rates. - Design and Development: Create a user-friendly zap function allowing users to bring only one side of a whitelisted LP, triggering the protocol to mint xUSD for the other side with the LP becoming collateral for the xUSD issued. Auto-Compounding Mechanism: Implement an auto-compounding feature within vaults to ensure continuous rewards are compounded into an increased collateral position. Security Audits and Testing: Conduct thorough security audits and extensive testing to ensure the reliability and safety of the zap function and auto-compounding mechanism.",
      options: [{ id: "ad91041e-06d4-4043-a0c5-2500d2f6c22a", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/159/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 359561470903,
        ask: 175000,
      },
    },
    {
      id: "a4b4d2a0-a867-4c38-b789-c882a250f9e8",
      prompt: "#160 VoteCoin - GitHub tools by Everyday Algonaut, Ludo Scholtz (@scholtz)",
      description:
        "This grant request outlines our proposal to develop innovative GitHub tools that leverage decentralized autonomous organization (DAO) principles and the Algorand blockchain to manage source code through onchain voting decisions. The project aims to empower developers and communities by providing a transparent and efficient platform for collaborative decision-making and consensus-building. The proposed solution centers around the utilization of Vote Coin standard on the Algorand blockchain to facilitate onchain voting processes. By integrating Vote Coin standard into GitHub's existing infrastructure, we aim to create a seamless experience for developers, allowing them to propose, discuss, and vote on various aspects of source code management directly within the GitHub platform. The key objectives of this project is: Integration with GitHub: We will build a set of tools and interfaces that seamlessly integrate with GitHub's existing functionality. These tools will enable start of DAO vote on each Pull Request, and after end of the voting session with positive DAO result, the merge of the pull request. The successful implementation of this project will revolutionize source code management by introducing a transparent and democratic decision-making process within the GitHub ecosystem and all allgorand onchain communities. By leveraging the power of Vote Coin and the Algorand blockchain, developers and communities will have a platform to collectively shape the evolution of software projects. We believe that this project has the potential to foster collaboration, innovation, and consensus-building within the software development community, leading to enhanced quality and inclusivity in code development. We kindly request your support in the form of a grant to bring this project to fruition and contribute to the advancement of decentralized governance within the software development ecosystem.",
      options: [{ id: "5e734e5c-cc83-4d81-a94e-a7f534cde1fe", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/160/files",
        category: "Community",
        focus_area: "Deployment",
        threshold: 164370958127,
        ask: 80000,
      },
    },
    {
      id: "3acb9d26-5185-4b75-b82b-69882127e956",
      prompt: "#161 VoteCoin - Introduction Video by Everyday Algonaut, Ludo Scholtz (@scholtz)",
      description:
        "Vote Coin DAO created onchain voting standard and open source solutions capable of efficient onchain community decision making. This includes the fractionalized and categorized delegation of the voting power, encrypted voting, trusted list management and results calculation by multiple functions. With this grant request we ask for grant to fund creation of the video describing vote coin open standard and how it helps and may help Algorand ecosystem.",
      options: [{ id: "e2d811a1-d046-40bb-a5ac-9d31e56318f2", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/161/files",
        category: "Community",
        focus_area: "User Onboarding",
        threshold: 32874191625,
        ask: 16000,
      },
    },
    {
      id: "cb326737-4bcf-40ac-ab07-84382c5997a9",
      prompt: "#162 ASA.Gold - Introduction Video by Everyday Algonaut, Ludo Scholtz (@scholtz)",
      description:
        "ASA.Gold is gold tokenization project on Algorand with novel way to audit gold reserves - everybody can see the composition of gold reserves. Each gold item in the reserves is marked with serial number and NFT is minted for it. Each NFT is purchasable at the onchain eshop, and owners can resell it at the secondary NFT marketplace or he can redeem the gold item by parcel delivery to his home address.",
      options: [{ id: "390f3d31-9bdf-48c5-a479-2dd6972a847e", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/162/files",
        category: "Community",
        focus_area: "User Onboarding",
        threshold: 32874191625,
        ask: 16000,
      },
    },
    {
      id: "7887c171-dece-4590-a657-8a793a3d9bd3",
      prompt: "#163 Biatec AMM - Milestone 3 by Ludovit Scholtz (@scholtz)",
      description:
        'Biatec AMM has recevied xGov grant <a href="https://github.com/algorandfoundation/xGov/pull/80/files?short_path=213d36e#diff-213d36ec8d75cbf65265ce0a01b8ff8891715f15282f28bbd7b29d62ba85e050">#80</a> and is in process of creating concentrated liqudity AMM. This proposal requests funds for milestone 3 - Integration to DEX aggregator. Check our progress - <a href="https://dex.biatec.io">dex.biatec.io</a>. We will improve Algorand\'s DeFi ecosystem and with concentrated liquidity AMM we will give users better swap quotes and liquidity providers better yields in comparision with using traditional AMMs. This grant proposal aims to advance the development and open source implementation of Automated Market Makers (AMMs) with concentrated liquidity. AMMs have emerged as a crucial component of decentralized finance (DeFi), providing efficient and decentralized mechanisms for trading digital assets. However, traditional AMMs suffer from certain limitations, such as inefficient capital utilization and vulnerability to impermanent loss. Concentrated liquidity models address these issues by allowing liquidity providers (LPs) to concentrate their funds within specific price ranges, thereby enhancing capital efficiency and reducing the risk of impermanent loss. This proposal seeks funding to support research, development, and implementation efforts focused on creating open source algorand AMM smart contract. By supporting this grant proposal, you will contribute to the advancement of decentralized finance by addressing the limitations of traditional AMMs and enhancing capital efficiency and risk management through the implementation of concentrated liquidity models. This research and development effort will foster innovation, attract liquidity providers, and improve the overall user experience in the rapidly evolving Algorand DeFi ecosystem.',
      options: [{ id: "e39ba4bb-89ba-4056-b5ef-e950b901d916", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/163/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 410927395318,
        ask: 200000,
      },
    },
    {
      id: "786bb6f5-f21f-489e-b239-59ef5da1aef8",
      prompt: "#164 Prague community meetup by Everyday Algonaut, Ludo Scholtz (@scholtz)",
      description:
        "We want to build community in Central Europe - in Prague. We will host the algorand meetup event during Prague Blockchain Week.",
      options: [{ id: "26d52ab7-3ec4-442d-8087-9addd9a4f453", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/164/files",
        category: "Community",
        focus_area: "User Onboarding",
        threshold: 30819554648,
        ask: 15000,
      },
    },
    {
      id: "5ad1bee3-70f3-40cf-95c4-2c134efae536",
      prompt: "#165 Messina one Algorand and EVM NFT Bridge by Messina Team Member, Kevin Vernooij (@FoundryKev)",
      description:
        "Messina.one intends to build an Ethereum &lt;&gt; Algorand NFT bridge by leveraging its existing expertise in the bridging space. Messina believes that enabling native bridging of NFTs between networks helps to grow the domain by opening up various opportunities for creators on Algorand. Messina already built and deployed an NFT bridge between Polygon and Cronos and will benefit from the experience and existing in-house technology. Messina also developed a new NFT standard that ensures exclusivity of NFTs and allows for only one unique NFT to ever be alive on chain at the same time. The bridge would allow seamless transfer of NFTs between Algorand and all EVM based chains including, but not limited to, Polygon, Ethereum, Base, Optimism, Arbitrum, and Avalanche.",
      options: [{ id: "59db278f-4fc7-49e6-81e2-11fff5e15d20", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/165/files",
        category: "Tools",
        focus_area: "NFT",
        threshold: 616391092977,
        ask: 300000,
      },
    },
    {
      id: "600076db-b65b-43ee-a40a-778d97c86b8d",
      prompt: "#167 Token CEX Listing Proposal for Meld Gold Assets by Michael Cotton & Dominic Hawton (@aetherplex)",
      description:
        "Meld Gold proposes to have GOLD$ &amp; SILVER$ ASA’s listed on a global centralised exchange in conjunction with developing the ability to market make ensuring the assets are readily available with minimal pricing spread.",
      options: [{ id: "6b289a29-7588-4767-a873-8e8245888c06", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/167/files",
        category: "Community",
        focus_area: "Defi",
        threshold: 513659244148,
        ask: 250000,
      },
    },
    {
      id: "53bec509-ebd6-4429-85f0-9aa9d65a8e30",
      prompt: "#168 Pact.fi Marketing Initiatives by Michael Cotton, AJ Milne, Mateusz Tomczyk (@tulustul)",
      description:
        "This proposal focuses on securing funding for a marketing professional and marketing campaigns for Pact, a user-friendly Algorand dApp designed for mobile-first trading experiences. The funds will be allocated to enhance the visibility, accessibility, and adoption of Pact by implementing targeted marketing strategies for a 3 month period.",
      options: [{ id: "1e5a691b-07a8-49bf-838c-e922dee45329", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/168/files",
        category: "dApps",
        focus_area: "Dex",
        threshold: 267102806957,
        ask: 130000,
      },
    },
    {
      id: "22a74ad7-00d5-465c-918c-3c52dac8fcac",
      prompt:
        "#170 An Intuitive Tool for Agreement Signing, Voting & Immutable Record Keeping with No-code Contract by Mark Crae (@dolphinkitty), Jesco Brandt (@heartberg)",
      description:
        "This proposal seeks to fund a new Agreement Signing &amp; Voting tool that enables any user, brand, or community to deploy custom contracts for streamlined proposal creation, encrypted agreement signing, decentralized voting, and immutable record keeping. By providing these essential collaboration and decision-making features within a highly intuitive user-experience, we aim to attract and onboard teams and businesses, primarily from outside the Algorand ecosystem.",
      options: [{ id: "c60f99c9-6000-4e34-b9e0-075a4a203127", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/170/files",
        category: "dApps",
        focus_area: "Other",
        threshold: 256829622074,
        ask: 125000,
      },
    },
    {
      id: "ad5b74c0-616f-4eb1-8618-7acb242a44fc",
      prompt: "#1 ABSTAIN FROM VOTING",
      description:
        "IMPORTANT: VOTE FOR THIS PROPOSAL ONLY IF YOU DON'T LIKE ANY OF THE COMMUNITY PROPOSALS or IF THE ONES YOU LIKE HAVE ALREADY PASSED. ",
      options: [{ id: "3a31c5fb-ab83-47a1-b4d4-4ab0483fd89f", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/1/files",
        category: "Mock",
        focus_area: "None",
        threshold: 20546400000000000,
        ask: 10000000000,
      },
    },
  ],
  created: {
    at: "2024-02-09T14:32:03.924Z",
    by: "FASFLVW3DIBVKEBEXGTIQWQ7I3Z44IGPRJXRE2O7WLLLXM75DXUWGGJ2H4",
  },
  communityGrantAllocation: 2000000000000,
  version: "2.1.0",
}

export default session3Data

