"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { savePrivateKey, unlockPrivateKey } from "../../../components/ether";

export default function KeySetupPage() {
  const [mode, setMode] = useState<"new" | "unlock">("new");
  const [privateKey, setPrivateKey] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleNewKey = () => {
    try {
      savePrivateKey(privateKey, password);
      sessionStorage.setItem("AUTHENTICATED", "true");
      router.push("/dashboard/map"); 
    } catch {
      alert("Error saving key");
    }
  };

  const handleUnlock = () => {
    try {
      unlockPrivateKey(password);
      sessionStorage.setItem("AUTHENTICATED", "true");
      router.push("/dashboard/map"); // default landing after auth
    } catch {
      alert("Invalid password");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "100px", gap: "20px" }}>
      {mode === "new" ? (
        <>
          <h2>Enter Private Key & Set Password</h2>
          <input
            type="password"
            placeholder="Private Key"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            style={{ width: "300px", padding: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "300px", padding: "10px" }}
          />
          <button onClick={handleNewKey} style={{ padding: "10px 20px" }}>Save & Connect</button>
          <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setMode("unlock")}>
            Already have a key? Click here
          </p>
        </>
      ) : (
        <>
          <h2>Enter Password to Unlock</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "300px", padding: "10px" }}
          />
          <button onClick={handleUnlock} style={{ padding: "10px 20px" }}>Unlock</button>
          <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setMode("new")}>
            First time? Enter new private key
          </p>
        </>
      )}
    </div>
  );
}
