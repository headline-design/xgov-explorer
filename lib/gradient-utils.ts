// Generate a hash from a string
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Generate a color based on a seed
export function generateColor(seed: number, index = 0): string {
  const h = (seed + index * 137) % 360;
  const s = 65 + (seed % 20);
  const l = 55 + (seed % 20);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Generate a second color that complements the first
export function generateComplementaryColor(seed: number, index = 0): string {
  const h = (seed + index * 137 + 180) % 360;
  const s = 65 + ((seed + 7) % 20);
  const l = 55 + ((seed + 11) % 20);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Generate a third color for more complex gradients
export function generateThirdColor(seed: number): string {
  const h = (seed + 90) % 360;
  const s = 65 + ((seed + 13) % 20);
  const l = 55 + ((seed + 17) % 20);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Get gradient type based on seed
export function getGradientType(seed: number): string {
  const types = [
    "linear-gradient(to right bottom, {color1}, {color2})",
    "linear-gradient(to right top, {color1}, {color2}, {color3})",
    "radial-gradient(circle at top right, {color1}, {color2})",
    "linear-gradient(45deg, {color1}, {color2}, {color1})",
    "linear-gradient(135deg, {color1}, {color2}, {color3})",
    "radial-gradient(circle at bottom left, {color1}, {color2}, {color3})",
    "linear-gradient(to right, {color1}, {color2}, {color1})",
    "linear-gradient(to bottom, {color1}, {color2}, {color3})",
  ];

  return types[seed % types.length];
}

// Generate a complete gradient string based on proposal ID
export function generateGradient(id: string): string {
  const seed = hashString(id);
  const color1 = generateColor(seed);
  const color2 = generateComplementaryColor(seed);
  const color3 = generateThirdColor(seed);

  const gradientTemplate = getGradientType(seed);

  // Use replaceAll to replace all occurrences of each placeholder
  return gradientTemplate
    .replaceAll("{color1}", color1)
    .replaceAll("{color2}", color2)
    .replaceAll("{color3}", color3);
}

// Generate a shortened ID for display
export function shortenId(id: string): string {
  if (id.length <= 6) return id;
  return id.substring(0, 6);
}

export function getGradientExplanation(id: string): string {
  return "This unique gradient was generated from the proposal ID hash, creating a visual fingerprint for this proposal.";
}
