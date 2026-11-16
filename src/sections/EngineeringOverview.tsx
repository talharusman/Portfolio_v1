import { Container } from "@/components/ui/Container";
import { home } from "@/data/home";

export function EngineeringOverview() {
  return (
    <section aria-label="Engineering overview" className="border-y border-rule">
      <Container>
        <ul className="divide-y divide-rule lg:grid lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {home.overview.map((item) => (
            <li
              key={item}
              className="py-4 text-small font-medium lg:px-6 lg:first:pl-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
