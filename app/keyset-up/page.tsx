"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { savePrivateKey, unlockPrivateKey } from "../../components/ether";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Key, Lock, Shield } from "lucide-react";
import Image from "next/image";

export default function KeySetupPage() {
  const [mode, setMode] = useState<"new" | "unlock">("new");
  const [privateKey, setPrivateKey] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const authenticated = sessionStorage.getItem("AUTHENTICATED");
    if (authenticated) {
      router.push("/dashboard");
    }
  }, [router]);

  // Determine initial mode based on whether key exists
  useEffect(() => {
    const encryptedKey = sessionStorage.getItem("ENCRYPTED_OWNER_KEY");
    if (encryptedKey) {
      setMode("unlock");
    }
  }, []);

  const validatePrivateKey = (key: string): boolean => {
    // Check if it's a valid Ethereum private key (64 hex characters, with or without 0x prefix)
    const cleanKey = key.startsWith("0x") ? key.slice(2) : key;
    return /^[a-fA-F0-9]{64}$/.test(cleanKey);
  };

  const handleNewKey = async () => {
    setError("");

    // Validation
    if (!privateKey.trim()) {
      setError("Please enter your private key");
      return;
    }

    if (!validatePrivateKey(privateKey)) {
      setError(
        "Invalid private key format. Please enter a valid Ethereum private key."
      );
      return;
    }

    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Ensure private key has 0x prefix
      const formattedKey = privateKey.startsWith("0x")
        ? privateKey
        : `0x${privateKey}`;
      savePrivateKey(formattedKey, password);
      sessionStorage.setItem("AUTHENTICATED", "true");
      router.push("/dashboard");
    } catch (err) {
      setError(
        "Error saving key. Please check your private key and try again."
      );
      console.error("Key save error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = async () => {
    setError("");

    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);

    try {
      unlockPrivateKey(password);
      sessionStorage.setItem("AUTHENTICATED", "true");
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (mode === "new") {
        handleNewKey();
      } else {
        handleUnlock();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className=" justify-center items-center mb-4">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={70}
              height={70}
              className="object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            {mode === "new" ? "Setup Your Key" : "Unlock Dashboard"}
          </CardTitle>
          <CardDescription>
            {mode === "new"
              ? "Enter your private key and create a secure password to access the dashboard"
              : "Enter your password to unlock the dashboard"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {mode === "new" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="privateKey">Private Key</Label>
                <div className="relative">
                  <Input
                    id="privateKey"
                    type={showPrivateKey ? "text" : "password"}
                    placeholder="Enter your Ethereum private key"
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                  >
                    {showPrivateKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Create Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              <Button
                onClick={handleNewKey}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Setting up...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 mr-2" />
                    Save & Connect
                  </>
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setMode("unlock")}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  Already have a key? Click here to unlock
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="unlockPassword">Password</Label>
                <div className="relative">
                  <Input
                    id="unlockPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleUnlock}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Unlocking...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Unlock Dashboard
                  </>
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode("new");
                    setPassword("");
                    setError("");
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  First time? Enter new private key
                </button>
              </div>
            </>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              <strong>Security Note:</strong> Your private key is encrypted and
              stored locally in your browser. We never send your keys to any
              server.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
