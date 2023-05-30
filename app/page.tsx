import { Checklist } from "components/Checklist";
import { PassportProvider } from "providers/Passport";

export default function Home() {
  return (
    <main className="max-w-screen-md container mx-auto mt-24 font-mono">
      <h1 className="text-4xl text-center mb-8 font-bold">
        gitcoin passport faucet
      </h1>
      <Checklist />
    </main>
  );
}
