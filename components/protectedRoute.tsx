"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getContract } from "./ether";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check if user is authenticated in session
        const authenticated = sessionStorage.getItem("AUTHENTICATED");
        
        if (!authenticated) {
          // Not authenticated, redirect to key setup
          router.push("/keyset-up");
          return;
        }

        // Check if private key exists and is accessible
        const encryptedKey = sessionStorage.getItem("ENCRYPTED_OWNER_KEY");
        
        if (!encryptedKey) {
          // No key stored, redirect to key setup
          sessionStorage.removeItem("AUTHENTICATED");
          router.push("/keyset-up");
          return;
        }

        // Try to get the contract to verify key setup is complete
        try {
          getContract();
          setIsAuthenticated(true);
        } catch (error) {
          // Key exists but contract not accessible (password needed)
          // This might happen on page refresh - redirect to unlock
          sessionStorage.removeItem("AUTHENTICATED");
          router.push("/keyset-up");
          return;
        }

      } catch (error) {
        console.error("Auth check failed:", error);
        sessionStorage.removeItem("AUTHENTICATED");
        router.push("/keyset-up");
      } finally {
        setIsLoading(false);
      }
    };

    // Don't check auth for key setup page itself
    if (pathname === "/keyset-up") {
      setIsLoading(false);
      return;
    }

    checkAuth();
  }, [router, pathname]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If on key setup page, always render children
  if (pathname === "/keyset-up") {
    return <>{children}</>;
  }

  // For protected routes, only render if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // This should not happen due to redirects above, but just in case
  return null;
}

// Hook to check if user is authenticated (can be used in components)
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authenticated = sessionStorage.getItem("AUTHENTICATED");
        const encryptedKey = sessionStorage.getItem("ENCRYPTED_OWNER_KEY");
        
        if (authenticated && encryptedKey) {
          try {
            getContract();
            setIsAuthenticated(true);
            return;
          } catch {
            // Contract not accessible
          }
        }
        setIsAuthenticated(false);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    
    // Listen for storage changes (e.g., login/logout in another tab)
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { isAuthenticated };
}

// Utility function to logout
export function logout() {
  sessionStorage.removeItem("AUTHENTICATED");
  sessionStorage.removeItem("ENCRYPTED_OWNER_KEY");
  window.location.href = "/dashboard/keyset-up";
}
