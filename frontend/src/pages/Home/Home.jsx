
import React from "react";
import {
  HomeContainer,
  WelcomeSection,
  StatsGrid,
  StatCard,
  StatTitle,
  StatValue,
  InfoSection,
} from "./Home.style";

const Home = () => {
  const stats = [
    { title: "Total Users", value: 25, icon: "👥" },
    { title: "Total Roles", value: 5, icon: "🛡️" },
    { title: "Total Policies", value: 24, icon: "🔐" },
  ];

  return (
    <HomeContainer>
      <WelcomeSection>
        <h2>Welcome to GateFlow!</h2>
        <p>
          Manage users, roles and permissions from one place.
        </p>
      </WelcomeSection>

      <StatsGrid>
        {stats.map((item) => (
          <StatCard key={item.title}>
            <span>{item.icon}</span>
            <div>
              <StatTitle>{item.title}</StatTitle>
              <StatValue>{item.value}</StatValue>
            </div>
          </StatCard>
        ))}
      </StatsGrid>

      <InfoSection>
        <h4>Getting Started</h4>
        <p>
          Welcome to GateFlow, your centralized role-based
          access control management system.
        </p>
        <ul>
          <li>Create and manage users.</li>
          <li>Define roles for your organization.</li>
          <li>Configure module-level permissions.</li>
          <li>Assign roles to users.</li>
        </ul>
      </InfoSection>
    </HomeContainer>
  );
};

export default Home;
