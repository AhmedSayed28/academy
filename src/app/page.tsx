import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <Container className="flex min-h-[50vh] items-center py-section">
      <h1 className="text-heading-1 font-bold tracking-tight text-foreground">
        {siteConfig.name}
      </h1>
    </Container>
  );
}
