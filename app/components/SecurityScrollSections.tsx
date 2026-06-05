import CIATriad from "./CIATriad";
import Pillars from "./Pillars";
import Services from "./Services";

export default function SecurityScrollSections() {
  return (
    <div className="story-flow" aria-label="Security story sections">
      <CIATriad />
      <Pillars />
      <Services />
    </div>
  );
}
