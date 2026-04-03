import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import OnboardingSection from "./OnboardingSection";
import SimulationSection from "./SimulationSection";
import DashboardSection from "./DashboardSection";
import AiAssistantSection from "./AiAssistantSection";

import { useState } from "react";

function OnboardingPage() {
  const [userData, setUserData] = useState({
    transport: 25,
    diet: 4,
    elec: 300,
    flight: 2,
    created: false,
  });
  return (
    <>
      <Navbar />

      <OnboardingSection setUserData={setUserData} />
      {userData.created && (
        <>
          <DashboardSection userData={userData} />
          <SimulationSection userData={userData} />
          <AiAssistantSection />
        </>
      )}

      <Footer />
    </>
  );
}
export default OnboardingPage;