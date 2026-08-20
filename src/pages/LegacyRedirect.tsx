import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface LegacyRedirectProps {
  to: string;
}

export const LegacyRedirect: React.FC<LegacyRedirectProps> = ({ to }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(`${to}${location.search}`, { replace: true });
  }, [navigate, to, location.search]);

  return (
    <div className="flex items-center justify-center min-h-[50vh] text-center p-8">
      <p className="text-sm text-muted-foreground animate-pulse">
        Yönlendiriliyorsunuz...
      </p>
    </div>
  );
};
