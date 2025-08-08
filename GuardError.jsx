import { useRouteError } from "react-router-dom";

export const GuardError = () => {
  const error = useRouteError();

  return (
    <div style={{ color: "red", padding: "1rem" }}>
      <h2>Error Loading Guard Page</h2>
      <p>{error?.statusText || error?.message || "Server unreachable."}</p>
    </div>
  );
};
