# Admin Portal

![React](https://img.shields.io/badge/Framework-React-blue)
![Next.js](https://img.shields.io/badge/Framework-Next.js-black)
![Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind%20CSS-teal)
![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-green)
![ethers.js](https://img.shields.io/badge/Library-ethers.js-purple)

This repository contains the **Web Dashboard/Admin Portal module** for the Smart Tourist Safety Monitoring & Incident Response System. The admin portal allows authorities to monitor tourists, view incidents, and access blockchain-verified IDs in real time.

---

## How it helps in the problem statement

The problem statement requires real-time monitoring, IoT-enabled tracking, AI-powered analytics, cybersecurity, and incident management. The Admin Portal contributes by:

- **Tourist Management**: Authorities can view detailed profiles of tourists including KYC information, biometric data, GPS-based travel history, emergency contacts, IoT wearables, digital IDs, and verified documents stored securely on the cloud. This helps verify identities, ensure authenticity, and track travel behavior patterns using big data analytics.
- **Incident Monitoring**: Receive instant alerts from tourists’ mobile apps and IoT devices such as panic button triggers, SOS signals, geo-fencing violations, AI-based suspicious activity detection, anomaly tracking, or unusual behavior, enabling rapid response, law enforcement action, and crisis management through automated workflows.
- **Real-time Visualizations**: Interactive visual dashboards powered by AI/ML show tourist clusters, live GPS maps, IoT sensor feeds, heatmaps of high-risk zones, safety metrics, predictive analytics, and AI-driven insights to help authorities understand overall safety conditions, forecast risks, and mitigate potential threats.
- **Blockchain Verification**: Uses Ethereum smart contracts, decentralized ledgers, cryptographic verification, and Web3 integration to ensure IDs, transactions, and incident logs are immutable, transparent, tamper-proof, and resistant to cyberattacks.
- **Dashboard Integration**: Consolidates all critical information, cloud-based data streams, communication tools, and IoT device feeds in one unified interface so police, emergency responders, cybersecurity teams, and tourism staff can quickly respond to incidents, coordinate actions, and improve operational efficiency with real-time collaboration.


---

## Features (with explanations)

- **View and Manage Tourist Profiles**  
  View KYC details, travel itinerary, emergency contacts, and digital IDs. Authorities can search, filter, and update profiles as needed.

- **Verify Blockchain-based Tourist IDs**  
  Check digital IDs issued via the blockchain to ensure authenticity and validity during the tourist’s visit.

- **Track Panic Alerts and Geo-Fencing Violations**  
  Receive real-time notifications when tourists trigger panic buttons or enter restricted/high-risk zones. Alerts are logged and time-stamped on the blockchain.

- **Monitor Anomalies**  
  AI-based anomaly detection flags unusual tourist behavior such as prolonged inactivity, sudden location drop-offs, or deviation from planned routes, helping authorities investigate potential risks.

- **Visualize Tourist Clusters and Heatmaps**  
  Interactive maps display tourist density, popular destinations, and high-risk zones. Helps plan patrols and ensure safety in real time.

- **Area-Specific Alerts via Blockchain**  
  Authorities can select a specific area on the map and send an alert that is broadcasted through the blockchain. Only tourists currently in that area receive the alert on their mobile app, ensuring precise and effective communication during emergencies.

- **Generate Reports**  
  Generate daily, weekly, or custom reports on tourist movements, incidents, and safety metrics for decision-making and auditing purposes.

- **Real-time Dashboard Updates**  
  All alerts, incidents, and ID verifications appear in real time, ensuring authorities have the latest data for prompt action.

---

## How it connects with blockchain & mobile app

- **Website → Blockchain**: Uses `ethers.js` to interact with deployed Ethereum smart contracts.
- **Website → Mobile App**: Receives alerts, incident reports, and ID issuance notifications from tourists’ apps.
- **ID Verification**: Reads blockchain logs to confirm tourist digital IDs.
- **Incident Logs**: Displays panic alerts, geo-fence violations, anomalies, and area-specific alerts in real time.

---

## How to run the Admin Portal

1. Clone the repository:

```bash
git clone https://github.com/Neuro-Fox/Admin-Portal.git
cd Admin-Portal
npm install
npm run dev
