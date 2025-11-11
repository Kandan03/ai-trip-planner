import Header from "@/sections/Header";
import Hero from "@/sections/Hero";

export const metadata = {
  title: "AI Trip Planner",
  description: "Plan your perfect trip with AI assistance",
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
    </main>
  );
}
