import { useRef } from "react";
import { useSearchParams } from "react-router";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      setParams({ username: inputRef.current.value });
    }
  };

  return (
    <section className="form">
      <form onSubmit={submitHandler}>
        <input ref={inputRef} type="text" placeholder="Enter username" />
        <button type="submit">Set Username</button>
      </form>
    </section>
  );
}
