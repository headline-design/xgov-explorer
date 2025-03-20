
import SIWAConnect from "./siwa-connect";

export const AVMWalletsScreen = () => {

  return (
    <div className="space-y-3">
      <SIWAConnect />
    </div>
  );
};

export const LoadingScreen = ({ provider }) => {

  return (
    <div className="pointer-events-auto inset-0 flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-6 text-center">
        <div className="flex flex-col items-center ">
          <div className="text-4xl">{provider.iconLarge}</div>
          <h1 className="text-xl font-bold">Requesting Connection</h1>
          <p className="text-secondary">
            {provider.type === "web3"
              ? `Open the ${provider.name} ${provider.location} to connect your wallet.`
              : `Redirecting to ${provider.name} for authentication.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ErrorScreen = () => (
  <div className="pointer-events-auto">
    <div className="relative z-10 opacity-100">BIG ERROR PROBLEM</div>
  </div>
);
