// File location: components/role.tsx

import { FeatureShowcase } from "@/components/ui/feature-showcase";
import Image from "next/image";

interface TeamMember {
  title: string;
  description: string;
  name: string;
  designation: string;
  location: string;
  src: string;
}

export default function Role() {
  const teamMembers: TeamMember[] = [
    {
      title: "Digital Tourist ID Platform",
      description:
        "Leading the development of Ethereum smart contracts for Digital Tourist ID minting. Specializing in KYC data hashing, on-chain storage solutions, and blockchain verification APIs. Setting up private Ethereum networks for comprehensive testing and deployment.",
      name: "Anubhav",
      designation: "Blockchain Developer",
      location: "Smart Contracts & Web3",
      src: "/team/img1.jpg",
    },
    {
      title: "GPS Tracking & Geofencing Logic",
      description:
        "Implementing real-time GPS tracking in React Native/Expo with advanced geofencing capabilities. Developing location-based alert triggers, SOS/Panic button functionality, and safety score computation algorithms for enhanced tourist security.",
      name: "Aryan",
      designation: "Mobile App Geofencing Specialist",
      location: "GPS & Location Services",
      src: "/team/img2.jpg",
    },
    {
      title: "Anomaly Detection Engine",
      description:
        "Building sophisticated 'impossible travel' detection algorithms and time-series analysis for location patterns. Creating advanced risk scoring models for tourist behavior analysis and implementing real-time data processing pipelines.",
      name: "Sarthak",
      designation: "AI/ML Backend Developer",
      location: "Machine Learning & Analytics",
      src: "/team/img3.jpg",
    },
    {
      title: "Mobile App & Dashboard Development",
      description:
        "Crafting intuitive React Native/Expo mobile app interfaces and comprehensive Next.js authorities dashboard. Developing robust APIs for seamless data flow and implementing multi-language support covering 10+ Indian languages.",
      name: "Saif",
      designation: "Full Stack Developer",
      location: "Frontend & Backend",
      src: "/team/img4.jpg",
    },
    {
      title: "System Integration & Web3 Connectivity",
      description:
        "Designing comprehensive system architecture and integrating blockchain with backend services. Managing API gateways, data flow optimization, and Web3 wallet integration for seamless user experience across the platform.",
      name: "Ujjwal",
      designation: "Web3 & Architecture Lead",
      location: "System Architecture",
      src: "/team/img5.jpg",
    },
    {
      title: "ML Models & Demo Preparation",
      description:
        "Developing cutting-edge ML models for pattern recognition and creating compelling data visualizations for the dashboard. Leading final presentation preparation, demo coordination, and managing model training optimization processes.",
      name: "Vibhuti",
      designation: "AI/ML & Presentation Lead",
      location: "Machine Learning & Demo",
      src: "/team/img6.jpg",
    },
  ];

  return <FeatureShowcase features={teamMembers} />;
}
