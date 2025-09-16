import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from "@/components/ui/card";
import { Network, Wallet, Zap, Users } from "lucide-react";

const WalletConnect = () => {
  return (
    <Card className="p-8 gradient-surface border border-electric-purple/20 shadow-neon">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
          <Network className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">Connect Your Wallet</h3>
          <p className="text-muted-foreground">
            Securely manage your confidential social graph with Web3 privacy
          </p>
        </div>

        <div className="grid gap-3">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="w-full gradient-primary hover:shadow-glow transition-smooth px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                        >
                          <Wallet className="w-4 h-4" />
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          type="button"
                          className="w-full bg-red-500 hover:bg-red-600 transition-smooth px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                        >
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg border border-cyber-blue/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Connected</p>
                            <p className="text-sm text-muted-foreground">
                              {account.displayName}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="px-4 py-2 border border-cyber-blue/50 hover:bg-cyber-blue/10 rounded-lg text-sm font-medium transition-smooth"
                        >
                          Disconnect
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Zap className="w-3 h-3" />
            <span>Lightning-fast encrypted connections</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WalletConnect;