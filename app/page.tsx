export const revalidate = 60;

import { HellcoreStore } from "./components/HellcoreStore";
import { getProducts, getBanners } from "./lib/sheets";

const BANNER_PRELOAD_WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export default async function Page() {
  const [products, banners] = await Promise.all([getProducts(), getBanners()]);
  const firstBannerUrl = banners[0]?.imageUrl;

  return (
    <>
      {firstBannerUrl && (
        <link
          rel="preload"
          as="image"
          fetchPriority="high"
          imageSrcSet={BANNER_PRELOAD_WIDTHS.map(
            (w) => `/_next/image?url=${encodeURIComponent(firstBannerUrl)}&w=${w}&q=90 ${w}w`
          ).join(", ")}
          imageSizes="100vw"
        />
      )}
      <HellcoreStore products={products} banners={banners} />
    </>
  );
}
