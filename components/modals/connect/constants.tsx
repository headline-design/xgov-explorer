import IconDiscord from "@/icons/brand-icons/discord";
import IconGithub from "@/icons/brand-icons/github";
import IconPera from "@/icons/brand-icons/pera";
import IconTwitter from "@/icons/brand-icons/twitter";


type AuthMethod = "AVM" | "Substrate" | "EVM" | "SVM";

export const VM_NETWORKS = [
  {
    id: 'AVM',
    name: 'Algorand',
    value: 'avm',
  },
  {
    id: 'Substrate',
    name: 'Substrate',
    value: 'substrate',
  },
  {
    id: 'EVM',
    name: 'Ethereum',
    value: 'evm',
  },
  {
    id: 'SVM',
    name: 'Solana',
    value: 'svm',
  },
];

export const ICON_CLASS = 'w-[24px] h-[24px] ';
export const SMALL_ICON_CLASS = 'w-[24px] h-[24px] rounded-lg';
export const BUTTON_CLASS =
  'rounded-full leading-[100%] border button px-3.5 h-[46px] text-primary bg-background-100 button-outline w-full flex justify-center items-center';

export const WEB2_PROVIDERS = [
  {
    id: 'discord',
    name: 'Discord',
    icon: <IconDiscord className={ICON_CLASS} />,
    connector: 'Discord',
    type: 'web2',
  },
  {
    id: 'github',
    name: 'Github',
    icon: <IconGithub className={ICON_CLASS} />,
    connector: 'Github',
    type: 'web2',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: <IconTwitter className={ICON_CLASS} />,
    connector: 'Twitter',
    type: 'web2',
  },
];

export const WEB3_PROVIDERS = [
  {
    id: 'pera',
    name: 'Pera',
    icon: <IconPera className={ICON_CLASS} />,
    connector: 'PeraWallet',
    type: 'web3',
    location:'mobile app'
  },
];

export const WEB3_PROVIDERS_SHORT = [
  {
    id: 'pera',
    name: 'Pera',
    icon: <IconPera className={ICON_CLASS} />,
    connector: 'PeraWallet',
    type: 'web3',
    location:'mobile app'
  },
];

export const WEB3_PROVIDERS_SM = [
  {
    id: 'pera',
    name: 'Pera',
    icon: <IconPera className={SMALL_ICON_CLASS} />,
    connector: 'PeraWallet',
    type: 'web3',
  },
];

export const ALL_PROVIDERS = [...WEB2_PROVIDERS, ...WEB3_PROVIDERS];
