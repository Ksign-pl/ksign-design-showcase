// Strona główna publicznego dema (Home / one-pager z kotwicami).

import { createFileRoute, getRouteApi, useNavigate } from "@tanstack/react-router";
import { DemoSite } from "@/components/demo/DemoSite";
import { buildFallbackContent } from "@/lib/demo/fallback-content";
import { getPackage } from "@/lib/demo/schema";

const parentApi = getRouteApi("/d/$slug");

export const Route = createFileRoute("/d/$slug/")({
  component: PublicDemoHome,
});

function PublicDemoHome() {
  const data = parentApi.useLoaderData();
  const navigate = useNavigate();
  const { slug } = Route.useParams();
  if (data.state !== "active") return null;
  const demo = data.demo;
  const multiPage = getPackage(demo.packageId).multiPage;

  return (
    <DemoSite
      data={demo}
      content={
        demo.content ??
        buildFallbackContent({
          ...demo,
          clientEmail: "demo@example.com",
          advisorName: "",
          logoUrl: demo.logoUrl ?? "",
          brandColor: demo.brandColor ?? "",
        })
      }
      nav={{
        page: "home",
        linkBase: `/d/${slug}`,
        onNavigate: multiPage
          ? (page) => {
              if (page === "home") void navigate({ to: "/d/$slug", params: { slug } });
              else if (page === "oferta")
                void navigate({ to: "/d/$slug/oferta", params: { slug } });
              else void navigate({ to: "/d/$slug/kontakt", params: { slug } });
            }
          : undefined,
      }}
    />
  );
}
