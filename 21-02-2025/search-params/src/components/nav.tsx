import { useSearchParams } from "react-router";
import { Link, Outlet } from "react-router";

export default function Nav() {
  const [params] = useSearchParams();
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to={`/dashboard?username=${params.get("username") || ""}`}>
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
