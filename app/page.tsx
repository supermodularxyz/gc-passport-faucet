import { Faucet } from "components/Faucet";

export default function Home() {
  return (
    <main className="pt-24">
      <h1 className="text-4xl text-center mb-8 font-bold font-serif">
        Gitcoin Passport Gated Faucet
      </h1>
      <Faucet />
    </main>
  );
}
