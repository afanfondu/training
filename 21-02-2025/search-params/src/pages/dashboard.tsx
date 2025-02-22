import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function Dashboard() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const username = params.get("username");
    if (!username) {
      navigate("/");
      alert("redirecting to home, set username first");
    }
  }, [params, navigate]);

  return <h1>Dashboard - {params.get("username")}</h1>;
}
