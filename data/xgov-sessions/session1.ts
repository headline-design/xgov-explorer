const session1Data = {
  id: "V1H6FF5ENK",
  type: 3,
  title: "xGov Voting Session 1",
  description:
    "The purpose of this voting session is the allocation of up to 2M Algo in community grants. This is a mandatory session for all xGovs to maintain their eligibility.",
  informationUrl: "https://forum.algorand.org/tag/voting-session-1",
  start: "2023-07-31T14:00:00.000Z",
  end: "2023-08-31T13:59:00.000Z",
  voteGatingSnapshotCid: "bafkreieh77pgmvfexyxbnbexwu4n5x54kgdfop7lzfo26peyrjcwhn6uii",
  questions: [
    {
      id: "1f91fb33-a30e-4ffc-9f4e-31aab2fa7867",
      prompt: "#6 Transaction Builder UI by No-Cash-7970 (@No-Cash-7970)",
      description:
        "The “Transaction Builder UI” (name not final) will be an online tool that provides an easy and user-friendly way to create just about any transaction on Algorand. Creating and sending a transaction on Algorand without an existing tool for that particular type of transaction requires using the SDK or `goal`, which requires programming knowledge and/or a node setup. Just about every wallet makes simple payment transactions easy. However, many of the more advanced transactions are either difficult or impossible within the wallets’ UIs. This creates a large gap where a non-programmer user cannot conveniently use many of Algorand’s more advanced features. The purpose of the Transaction Builder UI is to fill in this gap.",
      options: [{ id: "14835561-7a1e-4492-aa02-d12355121d60", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/6/files",
        category: "Tools",
        focus_area: "User Onboarding",
        threshold: 1069503,
        ask: 1,
      },
    },
    {
      id: "b27703ae-a303-4969-8f18-44c2e33cf973",
      prompt: "#8 Evil Tools by Joseph Glenn (@LoafPickleWW)",
      description:
        "Over the last 6 months, Evil Tools have developed a slew of no-code tools to carry out monotonous processes on the Algorand Blockchain and allowing users with no coding experience to work efficiently and easily. To Date, we have developed Mass Mint Tools for ARC3, ARC19, ARC69, Mass Updater tools for ARC19 and ARC69, Mass Asset Add, Mass Send, Mass Asset Opt Out, IPFS Collection Upload, wallet holding tools, and tools that allow people to find holders of collections and multimint assets. We hope to continue to add more mass tools like Mass Freeze, Mass Clawback, Mass Asset Destroy, while also improving the UI/UX we already have built. We have also made the decision to Open Source the Tools once we integrate everything.",
      options: [{ id: "99e263c8-6019-464f-8fe9-159d0568c576", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/8/files",
        category: "Tools",
        focus_area: "User Onboarding",
        threshold: 10695036099,
        ask: 10000,
      },
    },
    {
      id: "349aa5f2-6dff-4f03-b34a-751a57e255c5",
      prompt: "#9 AWallet by Ludovit Scholtz (@scholtz)",
      description:
        'AWallet is <a href="https://forum.algorand.org/t/algorand-wallet-open-source/3497">first open source</a> Algorand wallet. Wallet allows multisig features, ledger powered accounts, rekeying, making account online and protect algorand network, vanity account generation, ARC14 support, contains algorand native payment gateway, and more. AWallet is built as docker image so that anybody can run it locally in their environment and debug for example sandbox accounts. We hope to continue to add more features. With this ARC43 request we seek feedback on the product and possibly the help by community. The AWallet was built by community and is meant to be for Algorand community.',
      options: [{ id: "80b260c5-74a3-4b1f-9e06-56b7a1e2f324", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/9/files",
        category: "Tools",
        focus_area: "Wallet",
        threshold: 10695036099,
        ask: 10000,
      },
    },
    {
      id: "d5eafc8a-f641-4d4b-b794-17d930a7a8c1",
      prompt: "#14 Fund Unnamed Wallet by Liquid Glass (@0xLiquidGlass)",
      description:
        "Unnamed Wallet is a wallet implements UTXO to give users pseudonymity It is build on Algorand and it is an open sourced project and it is fully ran by volunteers who are willing to put in their valuable time to develop it If you wish to help Unnamed but are unable to do so due to a busy schedule or you are not a programmer, you can help Unnamed by donating some Algos to the project to show your support to the project",
      options: [{ id: "c7bbb625-6498-4e94-b2e5-a6b7274e93db", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/14/files",
        category: "Tools",
        focus_area: "Wallet",
        threshold: 6525041524,
        ask: 6101,
      },
    },
    {
      id: "d1c55962-7bf0-4eaa-a45f-9fda052d1d5c",
      prompt: "#17 ASA Stats Point in Time - tax reporting reference for US citizens by Ivica Paleka (@ipaleka)",
      description:
        "ASA Stats is the Algorand blockchain portfolio tracker for web, iOS, and Android. On top of real-time monitoring of up to five user addresses for free, the ASA Stats Point in Time will bring the possibility to evaluate user accounts at any moment in the past. After the implementation, Algorand blockchain users will be able to create transparent references for tax reporting. This proposal implies the deployment of all the needed data and templates for **US citizens** tax reports for free. At the same time, users from the rest of the world will get a foundation for implementation through the ASA Stats user widgets system.",
      options: [{ id: "d49dbc8d-192d-4c52-99b9-c3dfd9b683d4", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/17/files",
        category: "Tools",
        focus_area: "Defi",
        threshold: 21390072199,
        ask: 20000,
      },
    },
    {
      id: "37468828-0539-459b-b822-e8bbdb6a4dfc",
      prompt: "#18 Coq-avm library for AVM version 8 by Mark (@mpetruska)",
      description:
        'The aim is to finish the implementation of the coq-avm library for version 8 af the AVM. An introduction of the library can be found here: <a href="https://drive.google.com/file/d/1lafzfhvD-R5va4YQjO-yxfwnHskgCC0a/view">coq-avm-introduction.pdf</a>',
      options: [{ id: "a0fb46fd-83b8-4122-af28-c9c6b4c0bdcd", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/18/files",
        category: "Tools",
        focus_area: "Teal",
        threshold: 267375902492,
        ask: 250000,
      },
    },
    {
      id: "6e646a06-ffe5-4d95-a341-93141933f0ab",
      prompt: "#19 Algorand Foundation market operations dashboard by Sot Papasot (@papasotiriou)",
      description: "A dashboard that monitors the Algorand foundation market operations in 2023 that updates daily.",
      options: [{ id: "3e5db7fa-364c-458e-a448-29c212213475", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/19/files",
        category: "Tools",
        focus_area: "Monitoring",
        threshold: 4278014439,
        ask: 4000,
      },
    },
    {
      id: "f720c08f-a1e5-4def-8f40-d5dbf3edbec5",
      prompt:
        "#20 Building the Future of Competitive Gaming Grant Proposal for Our Free-to-Play Blockchain Game by Aquiles benitez (@aquilesdel90)",
      description:
        "Develop a third-person shooter game that captivates the gaming community with a captivating story, impressive graphics, and enjoyable gameplay. Our goal is to provide an immersive gaming experience where users can also learn to utilize blockchain technology, as the game is accessible to everyone for free. Through real-time competitive tournaments, we aim to foster competitiveness and encourage active community participation within the game. Main project objectives: Main project objectives: 1. Create a competitive and immersive gaming experience, challenging players with thrilling battles and real-time tournaments. 2. Offer a competitive and thrilling gaming experience. 3. Attract a vibrant community to the Algorand network. 4. Foster an active Algorand community through our game, attracting passionate players who contribute to its growth. 5. Showcase Algorand's capabilities in gaming, demonstrating fast, secure, and transparent transactions and unique blockchain features. 6. Drive Algorand adoption in the gaming industry by leveraging the advantages and opportunities Algorand offers to game developers through the Unity SDK, fostering collaborations and long-term partnerships. 7. Provide a free and fair gaming experience with optional in-game purchases. 8. Include Algorand NFT artists, collaborating to create skins and characters from their collections.",
      options: [{ id: "100d14e8-d66b-4042-98b1-553ad74f9684", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/20/files",
        category: "Community",
        focus_area: "Gaming",
        threshold: 374326263488,
        ask: 350000,
      },
    },
    {
      id: "78c09851-ddf4-4430-a911-2e4a1845f9bf",
      prompt: "#23 OpenAMM by Ludovit Scholtz (@scholtz)",
      description:
        "This grant proposal aims to advance the development and open source implementation of Automated Market Makers (AMMs) with concentrated liquidity. AMMs have emerged as a crucial component of decentralized finance (DeFi), providing efficient and decentralized mechanisms for trading digital assets. However, traditional AMMs suffer from certain limitations, such as inefficient capital utilization and vulnerability to impermanent loss. Concentrated liquidity models address these issues by allowing liquidity providers (LPs) to concentrate their funds within specific price ranges, thereby enhancing capital efficiency and reducing the risk of impermanent loss. This proposal seeks funding to support research, development, and implementation efforts focused on creating open source algorand AMM smart contract. By supporting this grant proposal, you will contribute to the advancement of decentralized finance by addressing the limitations of traditional AMMs and enhancing capital efficiency and risk management through the implementation of concentrated liquidity models. This research and development effort will foster innovation, attract liquidity providers, and improve the overall user experience in the rapidly evolving Algorand DeFi ecosystem.",
      options: [{ id: "895170bb-de03-448f-93b4-a213892a7884", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/23/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 213900721993,
        ask: 200000,
      },
    },
    {
      id: "4bbfaf48-0351-449d-b09f-37fd2b45879e",
      prompt: "#24 VoteCoin - GitHub tools by Ludovit Scholtz (@scholtz)",
      description:
        "This grant request outlines our proposal to develop innovative GitHub tools that leverage decentralized autonomous organization (DAO) principles and the Algorand blockchain to manage source code through onchain voting decisions. The project aims to empower developers and communities by providing a transparent and efficient platform for collaborative decision-making and consensus-building. The proposed solution centers around the utilization of Vote Coin standard on the Algorand blockchain to facilitate onchain voting processes. By integrating Vote Coin standard into GitHub's existing infrastructure, we aim to create a seamless experience for developers, allowing them to propose, discuss, and vote on various aspects of source code management directly within the GitHub platform. The key objectives of this project is: Integration with GitHub: We will build a set of tools and interfaces that seamlessly integrate with GitHub's existing functionality. These tools will enable start of DAO vote on each Pull Request, and after end of the voting session with positive DAO result, the merge of the pull request. The successful implementation of this project will revolutionize source code management by introducing a transparent and democratic decision-making process within the GitHub ecosystem and all allgorand onchain communities. By leveraging the power of Vote Coin and the Algorand blockchain, developers and communities will have a platform to collectively shape the evolution of software projects. We believe that this project has the potential to foster collaboration, innovation, and consensus-building within the software development community, leading to enhanced quality and inclusivity in code development. We kindly request your support in the form of a grant to bring this project to fruition and contribute to the advancement of decentralized governance within the software development ecosystem.",
      options: [{ id: "2ce01b78-cb64-4672-9ae1-1478477af7e0", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/24/files",
        category: "Community",
        focus_area: "Deployment",
        threshold: 106950360996,
        ask: 100000,
      },
    },
    {
      id: "7aeb559b-2e58-49bb-9073-6f9df7262463",
      prompt: "#25 Notiboy Web3 Chat by AP (@Vidhyanandcs)",
      description:
        "In web3 an identity is represented by an address rather than a username or password. When a web3 entity try to communicate with other entities using web2 social media platforms, they find it difficult because of this difference in identity. We at notiboy are building applications that will make communication more effective for algofam. Our notification service helps the web3 projects to effectively communicate with end-user addresses. As a next step, we would like to build a web3 specific chat application that will facilitate address-to-address communication. This application will be integrated into our web and mobile apps. APIs will be made available that can be integrated by the web3 projects to provide a in-app chat experience for their end-users.",
      options: [{ id: "91d70318-891f-42dd-b929-5d6a53a368f8", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/25/files",
        category: "dApps",
        focus_area: "User Onboarding",
        threshold: 90907806847,
        ask: 85000,
      },
    },
    {
      id: "53c846db-becc-4120-8ef4-de2463893e3b",
      prompt:
        "#26 ASA Stats Offer - Algorand blockchain ASA/NFT creators' channel by Ivica Paleka (@ipaleka), Marcin Zawiejski (@dragmz), Eduard Ravnic (@kerrilija)",
      description:
        "ASA Stats offer represents a proposal to exchange two or more ASA between an authenticated Algorand address owner and the owner of any other Algorand address. An authenticated user is a person who has proven ownership of one or multiple Algorand addresses. After both participants approve an offer, the assets defined by the offer are transferred to the recipients' addresses through the proxy escrows. Ultimately, two identical ASA Stats Offer NFTs are created and allocated to the participants' addresses. The owners of those NFTs are allowed to repeat the same offer an unlimited number of times free of charge.",
      options: [{ id: "488198b2-63f5-47a9-bca5-4cc8ebefd153", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/26/files",
        category: "Tools",
        focus_area: "User Onboarding",
        threshold: 58822698548,
        ask: 55000,
      },
    },
    {
      id: "25def462-b6fe-47cd-a61b-fcad9208a2c3",
      prompt:
        "#28 Algorand SVM Chain Proposal Technical Deep Dive by Neel Somani, David Lin, Grant Gerber, Veronica, Pratham Prasoon (@PrasoonPratham)",
      description:
        "Eclipse offers rollups-as-as-service, so that developers can deploy customized app chains for their projects without worrying about infrastructure, security, or reliability. Eclipse wants to build out a SVM rollup for Algorand deployed on Algorand's in-house Data Availability option. There are two provocative aspects to the Algorand SVM chain: 1. The first-ever rollup deployed to Algorand 2. A Solana virtual machine execution layer, so Solana programs can deploy to Algorand This proposal will cover a detailed roadmap with milestones, and benefits for the community. A technical deep dive on the architecture of the rollup in the additional information part.",
      options: [{ id: "f183838e-706a-4890-b801-40a2653802a3", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/28/files",
        category: "Tools",
        focus_area: "Deployment",
        threshold: 343455041787,
        ask: 321135,
      },
    },
    {
      id: "c39ef95e-b863-47f4-9c79-25bd9c0d3b21",
      prompt: "#30 ShareALGO+CreditRating by 1m1 (@1m1-github)",
      description:
        "problem: imagine there exists a cool dApp on Algorand that a (new) user wants to try. probably less than 1 $ALGO is enough to try the dApp, more than 0 $ALGO is needed for sure. however, the smallest amount a user can on-ramp into Algorand currently is ca. 30 $USD worth. that is a huge hurdle to a new user to just try, a waste even, since 1 $ALGO already allows for 1k transactions. solution: let's assume for simplicity that each user only needs 1 $ALGO to use/try whatever cool dApp. 1 user (A) buys 30 $USD worth of $ALGO from a typical credit-card to Algorand on-ramp. this user keeps 1 $ALGO for itself and makes the other 29 $ALGO available to others, on-chain. 29 other users (B1, ..., B29) can each borrow 1 $ALGO on-chain and use that $ALGO to try some dApp, without on-ramping. the borrowing creates debt. each B owes A 1 $ALGO, which they eventually have to repay. debt is a smart signature, allowing A to retrieve upto the borrowed amount (potentially plus interest, as a parameter) after a certain time. unpaid debt results in negative reputation for any B. any service/dApp could check our service for existing debt/credit-rating to potential deny interaction. as B interacts with various dApps on-chain, B eventually will either have received $ALGO to pay back A or B will on-ramp itself, once convinced that having $ALGO is worthwhile to use the awesome services available on Algorand. this solution lowers the hurdle to try Algorand for completely new users (which is what we want) via an on-chain sharing+debt solution regulated via reputation. credit rating: this solution only works if the ecosystem uses credit rating provided, else a malicious user could create lots of new accounts, borrow lots of $ALGO, never pay back and never have suffer a negative consequence. the credit rating system would be an on-chain API for anyone to check against. over time, the credit rating can include credit events from other dApps.",
      options: [{ id: "c8a602c7-9653-4973-aff9-984059ef990f", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/30/files",
        category: "dApps",
        focus_area: "User Onboarding",
        threshold: 320851082990,
        ask: 300000,
      },
    },
    {
      id: "3cfb06cf-a3c2-4c45-a1bd-ddf8f0d99c8f",
      prompt: "#31 Add arbitrary decimal precision exp, log, pow to the AVM by 1m1 (@1m1-github)",
      description:
        'This would expand the AVM capabilities (uniquely?) to enable much more complex kinds of dApps, needed for Financial, Scientific or Mathematical use cases. This would allow Algorand to have balancer.fi style smart contracts, e.g. to represent a "FairTreasury", which is missed by every project. Even basic financial contracts need roots, e.g. to convert yearly to daily volatility. Such functionality can be easily tested with 100% correctness. Normally, opcodes are kept basic in assembly language due to hardware limitations. The AVM however is a virtual machine and hence not bound by such limitations. Hence there is nothing stopping us from adding such super powers to the AVM. It would invite a lot more innovation. The details and an MVP have been written up in the following PR, which has been shown to be popular in the community: https://github.com/algorandfoundation/specs/pull/79 Btw, Consensys has shown interest to me privately to similarly arithmetize the EVM. The AVM already allows for some decimal math, this change would complete it to add full decimal precision including negative numbers. The current (e.g. b+) decimal math is based on (positive only) binary representations, which cannot even represent 0.1 exactly. The proposed is a decimal float type (not floating point), which represents any decimal value exactly, thus allowing for arbitrary precision math.',
      options: [{ id: "254a7fed-f253-424a-9ba6-b6138c7f1f1f", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/31/files",
        category: "Tools",
        focus_area: "Defi",
        threshold: 213900721993,
        ask: 200000,
      },
    },
    {
      id: "873c9acb-48f1-4c12-8d86-20e897dd2e08",
      prompt: "#32 wiki3 by 1m1 (@1m1-github)",
      description:
        "Humanity keeps reliable knowledge in white papers. White papers are summarized in encyclopedias. The best (though not perfect) existing encyclopedia is Wikipedia. Let's bring it to web3. Given any statement (a sentence, a white paper, an article, etc.), anyone can vote on the veracity (as a number) of this statement between 0 and 1, 0 meaning absolutely false, 1 meaning absolutely true, or any number inbetween. Each voter will own on-chain identities (NFTs) which are attached to the vote. A frontend allows any user to inquire the average veracity for a given statement filtered on some combination of identities. Examples: \"What do professional biologists think about Darwin's paper on evolution?\" \"What do people of my city think about the paper that claims that timezones and daylight savings are useless?\" Every person is free to choose it's own judgement of any statement. Now we provide transparent data to help the person choose make up it's own mind. The voting is incentivised via reward coins, which could be traded in open markets, giving them value. We would start with universities, by handing out academic identities via academic emails. The burden of identity checking is kept with universities. After, institutes of accreditation can be added (e.g. Lawyers, Doctors, etc.). Eventually, governments will be giving their citizens identities on-chain. Any and all reliable on-chain identity providers can be added to the system. We get a single source to check the veracity level of any statement for any given group.",
      options: [{ id: "088cb1ec-d761-469e-8420-96063b67f123", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/32/files",
        category: "dApps",
        focus_area: "Social",
        threshold: 213900721993,
        ask: 200000,
      },
    },
    {
      id: "783c5e32-097b-4e70-930d-14686b9ed1df",
      prompt: "#33 FairTransfer by 1m1 (@1m1-github)",
      description:
        "This smart contract solves the problem of credit-risk-free coin transfer, founders vesting and fair inheritance. Many employers pay their employees once a month, at the end of month. That leaves the entire credit-risk with the employee. If they paid at the beginning of the month, all the credit-risk would be with the employer. To reduce credit-risk, some employers pay weekly. With FairTransfer, employees can be paid every second, efficiently, thus minimizing credit-risk. An employer locks coins in the smart contract and an employee can pull coins out anytime, pro-rata, per-second granular. Pro-rata can be on a linear xor exponential xor logarithmic xor any other pre-defined schedule (each needs implementation). The same smart contract works for founders vesting their project coins. Or parents giving an inheritance to their progeny, over time rather than all at once. It is efficient as the beneficiary optimizes for itself and decides whenever it wants to pull the coins. In the modern world, employees would probably pull their coins after each working day, if not even more often, especially if each transaction costs as little as Algorand makes it. It gives a beneficiary access to it's capital as soon as earned, instead of the letting the e.g. employer earn all the yield, as currently the case. This smart contract could reduce so much of the entire worlds' credit-risk.",
      options: [{ id: "d0149bd8-90a8-4ccf-a86d-034145b7e3d2", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/33/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 427801443987,
        ask: 400000,
      },
    },
    {
      id: "bb69a4d9-e020-4bf0-9a47-471c6509bd20",
      prompt: "#34 Algorand-Monero Swaps by Yared Afework (@HashMapsData2Value)",
      description:
        "This xGov proposal is a request for funding to produce a suite of tools that will allow for two entities, one owning XMR (Monero) and the other Algo (or ASA), to swap with each other. This can be done trustlessly, though there is the possibility of one wasting the time of the other. The benefits of introducing this are numerous, including making Algorand the gateway for Monero and turning it into a privacy layer for Algorand. Note that this is scoped as an MVP with the absolute minimum necessary to make this work, and will require some technical know-how.",
      options: [{ id: "5173c6fa-776c-4c6c-90cc-03aaa1bbb85b", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/34/files",
        category: "dApps",
        focus_area: "Dex",
        threshold: 106950360996,
        ask: 100000,
      },
    },
    {
      id: "4a7b49d9-5458-4e96-bce7-f8c05efd4bfa",
      prompt:
        "#37 NFT Lending – dApp by Benedetto Biondi, Gidon Katten (@gidonkatten), Stefano Faieta (@stefanofa), Ibu Karel, Giuseppe Palazzolo (@palace22)",
      description:
        "The ALGO Amount requested refers to the first milestone of the entire project, the plan is to propose a single milestone during each quarter so to give opportunity for more projects to request grants in each single xGov Grant batch. In the context of this proposal, the definition of “NFTs” encompasses any on-chain tokenized asset. This includes, but is not limited to: - Tokenized Real-World Assets - Lofty property tokens - Vesta Equity property tokens - NFTs incl. art, collectibles and in-game assets - NFDs - Opulous MFTs To truly spark activity in the ecosystem and unlock new opportunities, NFTs must be financialized. The proposal specifically focuses on including NFTs in lending and borrowing operations. NFTs are one of the most compelling use cases of the Algorand blockchain. They are heavily traded and exchanged, and the community which supports them is strong and vibrant. Because of Algorand’s ASA technology, tokenizing assets is incredibly simple and powerful in this ecosystem. However, financial tooling for NFTs barely exists on Algorand at the moment. This xGov proposal leads to the development of a decentralized NFT lending platform where users can collateralize their NFTs to borrow fungible tokens. The platform features two markets: a peer-to-peer market and a peer-to-pool market, offering flexibility and liquidity to participants. The project’s aim is to design and develop the necessary infrastructure, protocols, and algorithms for the NFT lending platform. Extensive market research, rigorous testing, and optimization efforts will be undertaken to deliver a user-friendly platform with robust security measures. The development of this NFT lending platform will evolve the ecosystem by unlocking the value of tokenized assets and enabling access to liquidity through borrowing fungible tokens. The tools will be open-sourced, meaning any project can integrate this technology and shape it to their needs. Benefits and revenue will proliferate around Algorand’s network. NFT Lending fosters financial inclusion, empowers NFT holders to leverage their assets, and opens up new opportunities for participants within the tokenization space. The long-term applications of this technology are limited only by how much value, and how many different things, can be tokenized.",
      options: [{ id: "8e53c976-e3be-4958-a98c-c33bcab80430", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/37/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 1053461055818,
        ask: 985000,
      },
    },
    {
      id: "6636694f-748d-4590-b12b-bfb5f224c572",
      prompt:
        "#38 A funding request for volume and liquidity improvements across the Algorand ecosystem. by Grzegorz Raczek (@grzracz), Erik Hasselwander (@ErikHasselwander), BunsanMuchi (@BunsanMuchi), David Blazek (@Zykoz)",
      description:
        "This proposal features three distinct components designed to increase volume and access to liquidity across the Algorand ecosystem. > Integrating Stableswaps and Lending Pools into the Vestige Aggregator, as well as open-sourcing the routing smart contract > Establishing a fully decentralized on-chain aggregator for new dApps to utilize the available liquidity on Algorand > Developing a comprehensive margin trading platform that leverages existing liquidity for all actions, driving volume towards the entire ecosystem by enabling up to 20x leveraged positions # Component 1: Stableswap and Lending Pools Aggregator Integration We will integrate stableswaps into the Vestige aggregator, enabling tokens like gALGO to have greater utility by providing instant access to swap from gALGO to any other asset in the ecosystem with minimal slippage. This will be achieved by utilizing highly liquid stableswap pools, which are not currently routed through any Algorand aggregator. This milestone also covers integrating AlgoFi's existing lending pools, as well as the soon-to-be-released Folks Finance lending pools, into the Vestige aggregator. These integrations play a pivotal role in optimizing liquidity utilization for bridged and stable assets, leading to a significant reduction in price impact. A 10000 ALGO swap to goBTC through our router nets you over a percent more than doing a single swap, and these integrations will boost this number a lot. This grant will enable us to open-source the smart contract used for the routing, equipping other developers with the necessary tools to create their own complex swap transactions without reinventing the wheel concerning cfAMM swaps, stableswaps and lending pool integrations. # Component 2: Fully Decentralized Liquidity Aggregator The component is a fully on-chain, decentralized liquidity aggregator. This on-chain tool will be callable from other dApps, allowing developers to tap into on-chain liquidity programmatically without incurring significant price impact from single-pool swaps. Furthermore, an oracle-like component will be introduced to track on-chain liquidity over time, enabling smart slippage during transaction execution and preventing frontrunning or MEV-like attacks. # Component 3: Decentralized Perpetual Margin Trading The third component is a fully decentralized perpetual margin trading platform, offering a wide range of leverage for specific on-chain assets. This protocol will exclusively tap into existing AMMs for opening orders, closing orders, and liquidating orders by leveraging the decentralized liquidity aggregator mentioned earlier. This approach ensures that liquidation incentives and fees remain within the ecosystem, instead of being consumed by bots and moved off-chain, which is a current issue.",
      options: [{ id: "c3da2baa-b343-4405-a288-8b28fd0efb03", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/38/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 374326263488,
        ask: 350000,
      },
    },
    {
      id: "707df81d-be97-4de9-b667-743c7d0e558c",
      prompt: "#39 Humble.sh Hummingbot connector by Martin Sigwald (@tinchosig)",
      description:
        "Build a Humble.sh connector for the open source Hummingbot market making bot and maintain the connector for the first 6 months",
      options: [{ id: "71a8d88d-59ad-4722-a343-5d545e873f2b", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/39/files",
        category: "Tools",
        focus_area: "Dex",
        threshold: 342241155189,
        ask: 320000,
      },
    },
    {
      id: "edc195b2-342b-4796-80ae-efe5090670ed",
      prompt:
        "#41 MINTHOL.ART, the next-generation loyalty program and coupon platform by Bertalan Miklos (@solkimicreb)",
      description:
        "MINTHOL leverages blockchain technology to decouple businesses from their loyalty programs. Businesses may sign up as perk providers and leave the rest to coupon managers who create thematic coupon collections with various hand-picked perks. MINTHOL seamlessly handles the negotiation and monetization between these two parties. Coupons follow NFT standards to connect the current NFT scene with web3, web2, and real-world businesses. NFT creators may add benefits to their collections via perk subscriptions. End users can discover, own, and trade thematic, multi-business coupons. They may browse their coupons and verify their ownership with a QR code. Businesses scan these QR codes to instantly apply the necessary discounts. A range of customizable coupon options caters to every use case - like tradeable, user-bound, one-off, limited-use, reusable, time-restricted, or subscription-based coupons.",
      options: [{ id: "310168b1-6293-40fa-a565-b37f751a8d9d", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/41/files",
        category: "Tools",
        focus_area: "NFT",
        threshold: 128340433196,
        ask: 120000,
      },
    },
    {
      id: "fd0ea29d-f1cf-4075-ab45-159d5c7d27ff",
      prompt: "#42 Project Galapago - NFT Lending Protocol by Jack Hui (@jack-jackhui), Vivian Wang",
      description:
        "<a href=\"https://galapago.app\">Project Galapago</a> is setting its sights on becoming the first-ever peer-to-pool NFT lending platform on Algorand. Our goal? To completely change how NFTs are used in finance. For this ambitious task, we're asking for an ALGO grant for the first milestone of our project. We're all about fairness. That's why we're only going to propose one milestone each quarter. This way, more projects can compete for grants in each xGov Grant batch. What we're planning is groundbreaking. We want to create a fully decentralized platform where people can use their NFTs (or NFT & crypto) to get instant liquidity. This will unlock new possibilities for liquidity in the Algorand ecosystem. With our platform, the value of tokenized assets will be taken to the next level. Our vision is to open doors that have stayed closed until now. ### What is Project Galapago? Project Galapago is a groundbreaking decentralized lending platform that enables users to borrow and lend against both Non-Fungible and Fungible tokens. By unlocking the latent capital in these tokens, Project Galapago aims to maximize capital efficiency and provide users with the opportunity to yield additional returns on their holdings. We see a future filled with diverse tokenized assets with wide-ranging utility, applications, and connections to real-world assets. We predict a dramatic shift in the way valuable assets are transacted and accounted for in the next two decades. Project Galapago endeavors to be the bedrock of this transformation by providing a highly customizable, permissionless infrastructure to meet the emerging needs of efficient on-chain capital use. Our ultimate goal is to enpowering NFT users to unlock the true value of their assets. ### Addressing the Unmet Needs in NFT segment: The crypto landscape is laden with assets of significant value in the form of Non-Fungible and Fungible Tokens. However, these assets often remain idle, leading to inefficiencies in capital utilization. Particularly, NFT owners find themselves in a dilemma where they have to sell their prized possessions to gain the liquidity necessary for further investments in NFTs or other avenues. Current lending solutions fall short in terms of support for diverse types of collateral and don't allow users the flexibility to tailor their borrowing and lending strategies to their specific risk preferences. Additionally, they necessitate users to manage borrow positions against individual NFTs instead of a broader collection of both Fungible and Non-Fungible Tokens. Project Galapago is poised to address these challenges by enabling users to utilize multiple asset types as collateral, thus enhancing capital efficiency. This platform's revolutionary features will transform the way users borrow, lend, and manage their portfolio of Fungible and Non-Fungible tokens. Under Project Galapago, our interpretation of Non-Fungible Tokens (NFTs) covers a broad spectrum of on-chain tokenized assets. These include, but are not limited to: Tokenized Real-World Assets Property tokens, examples being those from Lofty and Vesta Equity Digital and physical art pieces, collectibles, and virtual game assets NFDs and Opulous MFTs, among others In our view, all these diverse entities fall under the umbrella of NFTs and are ripe for the unique financial applications we aim to develop.",
      options: [{ id: "f9f671b7-9e6a-4fcc-a6b2-2231430105f9", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/42/files",
        category: "dApps",
        focus_area: "Defi",
        threshold: 941163176771,
        ask: 880000,
      },
    },
    {
      id: "d8cc8206-f10e-45cf-a29d-b684af3a0efb",
      prompt: "#43 Choice Coin Compliance by Brian Haney (@Bhaney44)",
      description:
        "Choice Coin DAN is a decentralized autonomous network, choice software platform, and R&D hub that uses the Choice Coin cryptocurrency to power its software systems. The goal for this project is to create a decentralized compliance mechanism for digital assets on Algorand. One of the key features of governance software infrastructure currently missing from solutions on Algorand is compliance. As such, this grant will be for a web application and open source software for Choice Coin compliance software, which will be available to the Algorand network to help assist in the compliance process.",
      options: [{ id: "22849f04-35a9-460c-a9f6-e9ec569b1039", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/43/files",
        category: "dApps",
        focus_area: "Banking",
        threshold: 10693966596,
        ask: 9999,
      },
    },
    {
      id: "2ceb7958-128f-42c0-b53b-e232f2939da4",
      prompt: "#48 Alright by Brian Whippo (@SilentRhetoric)",
      description:
        '<a href="https://alright.app">Alright</a> is a peer-to-peer agreements app to safely exchange goods & services with anyone through decentralized escrow. It enables two people to lock in an agreement to buy or sell something, secure the deal with collateral as a security deposit, and release the payment when they are both ready. Alright is for any transaction that comes with some counterparty risk of non-performance, and it is faster, easier, and cheaper than using traditional middleman escrow services. See the Alright <a href="https://alright.gitbook.io/alright/">pitch and all the details</a>. This grant proposal is for the first milestone in the roadmap, to launch the Alright app to TestNet. ## Alright - Escrow for Everyone ### The Problem De-risking transactions is costly and complex. Marketplaces charge high fees for trust, but reviews can be faked and disputes are a quagmire. Nearly half of gig workers report not being paid, and three-quarters of people say they would leave marketplaces. Traditional escrow services are expensive, complicated, and slow, if people even use them. ### The Solution Alright de-risks transactions with decentralized escrow that is easy, fast, and affordable. Payment when the job is completed successfully? Payment when the item arrives as described? Payment when you both agree it? Alright, then! ### How It Works Paying through an Alright escrow agreement is a simple three-step process: 1. Agree on your payment terms plus a security deposit and lock in the deal together 2. Do your thing! Finish the job, send the stuff, and make sure everything is alright 3. When you are both ready, send the payment forward and release the collateral When both people put up a security deposit, they have a very strong incentive to act honestly and complete the deal as agreed. <a href="https://ibb.co/hRFJ9sm"><img src="https://i.ibb.co/QFv3Q9K/diagram-complete-gray-bg.png" alt="diagram-complete-gray-bg" border="0"></a> ### Technology The Alright smart contract and interface are carefully designed to maximize Algorand\'s capabilities, demonstrate Web3 values, and achieve several qualities: - **Safety:** Deposited funds are locked only when both parties fully match on terms and deposits are in, payments and collateral are not released until both parties confirm - **Flexibility:** Deposits can be recalled, requests can be rejected, payouts can be adjusted, and deals can be customized for different combinations of payments and collateral - **Convenience:** All workflows are asynchronous and can be completed in any sequence with no need to coordinate actions - **Capability:** Up to 32kb of supporting data can be attached to active deals directly on chain - **Scalability:** Rewritten from the Hackathon prototype to now utilize box storage, the app can support unlimited users and up to 30 concurrent deals per account with no minimum balance requirement on user\'s accounts - **Performance:** Thanks mostly to Algorand, every workflow step completes with Web2 speed as users expect - **Resilience:** The Alright client works with zero dependency on a centrally-owned back end--you can download/install the app and use it forever (decentralized hosting will also be explored) ### Use Cases Many common transactions involve risk of something going wrong, and Alright\'s collateralized deals enable buyers to confirm everything is all right before paying and sellers to know they will get paid. - Freelancing: Gigs, contracts, commissions - when you need to ensure the work gets done - Vehicles: Cars, bikes, motorcycles, boats - when you need to feel safe meeting in person - Collectibles: Art, antiques, memorabilia - when you need to confirm authenticity - Valuables: Instruments, electronics, jewelry - when you need to check it out it first - Real Estate: Rentals, houses, land - when you need to inspect it or ensure care is taken - Digital Assets: Swaps, tokens, game items - when you need to swap and can\'t do it atomically ### Example Workflow Beth wants to hire Dave to build a website for her. They agree on a price and the requirements the site must meet. Beth chooses to escrow her payment through Alright so that Dave gets paid when the work is delivered. To keep them both honest, they each put up a security deposit for a portion of the payment amount. The payment and security deposits are sent to Alright\'s smart contract, and when the details match, Alright locks them in. Beth feels confident that Dave will complete the project because he has collateralized their agreement. Dave can start work knowing Beth will follow through on the payment because she has also contributed collateral. Dave presents the finished product to Beth and requests payment. Beth is satisfied with the work and agrees to release the funds. As soon as she does so, her payment is forwarded to Dave and they both receive their collateral back. ### Ethos Empowerment - Alright is founded on the idea that people should be able to transact with each other safely without needing to trust a middleman or paying expensive fees for corporate guarantees. Secured agreements help align people\'s incentives to act honestly and deal fairly. Accessibility - Peer-to-peer escrow agreements are underpinned by blockchain technology because it shares the same values of enabling a more inclusive financial system. Algorand\'s carbon-negative, borderless network confirms transactions in seconds, making a high-performance financial tool accessible to everyone. Transparency - The smart contract which enables decentralized escrow deals is open-source because transparency is valuable in a world that is often opaque. Alright does not require trusting a third party and invites you to read and verify the code for yourself.',
      options: [{ id: "761754a8-1f34-4736-8405-7a4129dcff85", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/48/files",
        category: "dApps",
        focus_area: "Social",
        threshold: 106950360996,
        ask: 100000,
      },
    },
    {
      id: "d5f14508-4310-4462-af75-a412de6da28a",
      prompt: "#49 Algo Wallet Library for SolidJS Web Apps by Brian Whippo (@SilentRhetoric)",
      description:
        "Solid Algo Wallet will be a turn-key SolidJS Typescript/Javascript code library for developers to easily add Algorand wallet and network integration to their web apps. Not a software developer? This proposal will create free code to help creators and builders focus on bringing their ideas to the Algorand community faster.",
      options: [{ id: "5cff6857-ce9a-41ff-be11-129203f9842e", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/49/files",
        category: "Tools",
        focus_area: "Libraries",
        threshold: 10695036099,
        ask: 10000,
      },
    },
    {
      id: "50a1ea2a-8554-4d88-98b7-3ae3e346e650",
      prompt: "#1 Mock Proposal",
      description:
        "If you don't like any of the grant proposals you can apply 100% of your votes to this mock proposal or if you have allocated enough votes to other(s) proposal(s), but still have voting power left, you can apply the remainder here to be able to cast your vote.",
      options: [{ id: "f791d23f-b6ee-491d-a61a-658229897fbb", label: "yes" }],
      metadata: {
        link: "https://github.com/algorandfoundation/xGov/pull/1/files",
        category: "Community",
        focus_area: "User Onboarding",
        threshold: 10695000000000000,
        ask: 10000000000,
      },
    },
  ],
  created: {
    at: "2023-07-29T00:00:55.028Z",
    by: "C3DQJVL6ZVGL6MZ6JBDBEKYEXRV5NCPZYJUJ3BLRDK6V7ETKYC6NO6HOPA",
  },
}

export default session1Data

