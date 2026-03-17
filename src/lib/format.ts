const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Convert USD mock price to INR-like value and format */
export function formatINR(usdPrice: number): string {
  // Rough conversion for display (1 USD ≈ 83 INR), rounded nicely
  const inr = Math.round(usdPrice * 83);
  return inrFormatter.format(inr);
}
