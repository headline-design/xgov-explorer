// utils/avatarGenerator.js

// Simple hash function to convert a string into a number
export const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Convert a hash into a color by modifying the hue
  export const hashToHueColor = (hash, offset) => {
    const hue = (hash + offset) % 360; // Get a value between 0 and 360
    return `hsl(${hue}, 100%, 50%)`; // Generate a full saturation, 50% lightness color
  };

  // Function to generate SVG content with unique gradients
  export const generateSvgAvatar = (id, size) => {
    const hash = simpleHash(id);
    const color1 = hashToHueColor(hash, 0); // Start color
    const color2 = hashToHueColor(hash, 137); // End color with an offset to ensure variation
    const gradientId = `gradient-${hash.toString(16)}`; // Convert hash to hexadecimal for a unique ID

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}px" height="${size}px" viewBox="0 0 ${size} ${size}" version="1.1">
      <defs>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="${gradientId}">
          <stop stop-color="${color1}" offset="0%"/>
          <stop stop-color="${color2}" offset="100%"/>
        </linearGradient>
      </defs>
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect fill="url(#${gradientId})" x="0" y="0" width="${size}" height="${size}"/>
      </g>
    </svg>`;
  };
