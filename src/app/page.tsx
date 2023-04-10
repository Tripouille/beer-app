import { BeersSearchForm } from "@/components/BeersSearchForm";
import { RandomBeersWidget } from "@/components/RandomBeersWidget";

export default function Home() {
  return (
    <>
      <RandomBeersWidget />
      <BeersSearchForm />
    </>
  );
}
