import PrivacyControls from "@/components/PrivacyControls";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Privacy Settings
            </h1>
            <p className="text-lg text-muted-foreground">
              Control who can see your connections and manage your privacy preferences with granular precision.
            </p>
          </div>

          <PrivacyControls />
        </div>
      </div>
    </div>
  );
};

export default Privacy;