import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren) {
  return <div className="max-w-screen-sm container mx-auto">{children}</div>;
}
export default function Home() {
  return (
    <main className="">
      <Container>
        <ConnectButton />
        <h1>gitcoing passport faucet</h1>
      </Container>
    </main>
  );
}
