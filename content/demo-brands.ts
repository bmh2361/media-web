export type BrandLogo = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  href?: string;
  approvalStatus: "demo" | "approved" | "published";
};
export const demoBrands: BrandLogo[] = Array.from({ length: 12 }, (_, index) => {
  const n = String(index + 1).padStart(2, "0");
  return {
    id: `demo-mark-${n}`,
    name: `Studio mark ${n}`,
    src: `/media/demo/marks/mark-${n}.svg`,
    width: 160,
    height: 64,
    alt: `Abstract interface demo mark ${n}`,
    approvalStatus: "demo"
  };
});
