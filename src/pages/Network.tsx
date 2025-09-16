import SocialGraph from "@/components/SocialGraph";

const Network = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Network
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your connections and view your social graph with complete privacy control.
            </p>
          </div>

          <SocialGraph />
        </div>
      </div>
    </div>
  );
};

export default Network;