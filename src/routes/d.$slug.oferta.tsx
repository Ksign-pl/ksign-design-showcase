// Podstrona „Oferta" — realny route dla pakietów Business i Premium.
// Dla pakietów one-page przekierowuje na stronę główną dema.

import { createFileRoute, getRouteApi, Navigate, useNavigate } from "@tanstack/react-router";
import { DemoSite } from "@/components/demo/DemoSite";
import { buildFallbackContent } from "@/lib/demo/fallback-content";
import { getPackage } from "@/lib/demo/schema";

const parentApi = getRouteApi("/d/$slug");

export const Route = createFileRoute("/d/$slug/oferta")({
  component: PublicDemoOferta,
});

function PublicDemoOferta() {
  const data = parentApi.useLoaderData();
  const navigate = useNavigate();
  const { slug } = Route.useParams();
  if (data.state !== "active") return null;
  const demo = data.demo;
  if (!getPackage(demo.packageId).multiPage) {
    return <Navigate to="/d/$slug" params={{ slug }} hash="oferta" replace />;
  }

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
        page: "oferta",
        linkBase: `/d/${slug}`,
        onNavigate: (page) => {
          if (page === "home") void navigate({ to: "/d/$slug", params: { slug } });
          else if (page === "oferta") void navigate({ to: "/d/$slug/oferta", params: { slug } });
          else void navigate({ to: "/d/$slug/kontakt", params: { slug } });
        },
      }}
    />
  );
}
