// Project-specific fees and an optional client budget are authorised by the
// commercial brief. Fixed public packages and published prices remain blocked.
export function containsPublicPricing(value) {
  const copy = value
    .replace(
      /Each project is scoped around the actual brief\. We do not force clients into fixed public packages\./g,
      ""
    )
    .replace(/每个项目均根据真实需求单独定义，不通过公开固定套餐限制项目范围。/g, "");
  return /\b(?:pricing|prices?|packages?|starting from)\b|(?:价格|套餐|起价|价位)|(?:[£$€¥]\s*\d|\d[\d,]*(?:\.\d+)?\s*(?:(?:GBP|USD|EUR|RMB)\b|元|英镑))/i.test(
    copy
  );
}
