import { EditorialSection } from "@/components/EditorialSection";
import { InterestsMatrix } from "@/components/InterestsMatrix";
import { about } from "@/data/about";

export function AreasOfInterest() {
  return (
    <EditorialSection id="interests" index="03" label="Domains" title="Areas of interest">
      <InterestsMatrix interests={about.interests} />
    </EditorialSection>
  );
}
