import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="Page not found"
        lead="This address does not match a page on the site. Use the navigation, or go back to the home page."
      />
      <Container>
        <ButtonLink href="/">Go to Home</ButtonLink>
      </Container>
    </>
  );
}
