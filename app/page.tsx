import { Faucet } from "components/Faucet";

export default function Home() {
  return (
    <main className="pt-24 font-mono">
      <h1 className="text-4xl text-center mb-8 font-bold">
        gitcoin passport faucet
      </h1>
      <Faucet />
    </main>
  );
}
