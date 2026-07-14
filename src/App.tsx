import { AppLayout } from "@/layouts/AppLayout";
import { HomePage } from "@/pages/HomePage";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <AppLayout>
        <HomePage />
      </AppLayout>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
