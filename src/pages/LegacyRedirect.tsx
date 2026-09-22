import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface LegacyRedirectProps {
  to: string;
}

export const LegacyRedirect: React.FC<LegacyRedirectProps> = ({ to }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(`${to}${location.search}${location.hash}`, { replace: true });
  }, [navigate, to, location.search, location.hash]);

  return (
    <div className="flex items-center justify-center min-h-[50vh] text-center p-8">
      <p className="text-sm text-muted-foreground animate-pulse">
        Yönlendiriliyorsunuz...
      </p>
    </div>
  );
};

// Preserve deep links when navigating in the SPA or using the Vite dev server.
// Production HTTP redirects are handled by nginx.conf.
export const CrosshairLegacyRedirect: React.FC = () => {
  const { pathname } = useLocation();
  let path = pathname.replace(/^\/crosshair/i, "/crossio").replace(/\/+$/, "");
  path = path.replace(/\/(privacy-policy|terms-of-use|terms-of-service)\.html$/i, "/$1");
  path = path.replace(/\/terms-of-service$/i, "/terms-of-use");
  return <LegacyRedirect to={path} />;
};
