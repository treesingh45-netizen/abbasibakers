import React from 'react';

interface AbbasiLogoProps {
  variant?: 'badge' | 'horizontal' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  className?: string;
}

/**
 * Exact high-precision vector recreation of the supplied Abbasi Bakers & Sweets logo:
 * - Split golden circular ring with two deep chocolate brown side dots
 * - Tilted golden line-art chef hat above the AB monogram apex
 * - Intertwined serif "AB" monogram in deep chocolate brown (#52321B) with sweeping S-curve bottom tail
 * - Golden wheat stalk curving up from bottom-left across the A leg (#CFA878)
 * - Urdu script "عباسی" below the monogram
 * - Curved "B A K E R S  &  S W E E T" along the lower arc
 */
export const AbbasiLogo: React.FC<AbbasiLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'light',
  className = '',
}) => {
  const primaryColor = theme === 'dark' ? '#FDFAF5' : '#4E2A14';
  const goldColor = '#C89B57';
  const bgBadge = theme === 'dark' ? '#3B2312' : '#FDFAF5';

  const badgeSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32',
  };

  const BadgeSvg = ({ svgClass }: { svgClass: string }) => (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClass}
      role="img"
      aria-label="Abbasi Bakers & Sweets Logo"
    >
      <defs>
        {/* Bottom arc for curved "B A K E R S  &  S W E E T" text */}
        <path
          id="abbasiBottomTextArc"
          d="M 34,126 A 86,86 0 0,0 206,126"
          fill="none"
        />
      </defs>

      {/* Circular background */}
      <circle cx="120" cy="120" r="108" fill={bgBadge} />

      {/* Top Golden Ring Arc (with gap at 9 o'clock and 3 o'clock) */}
      <path
        d="M 20.8,108 A 100,100 0 0,1 219.2,108"
        stroke={goldColor}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Bottom Golden Ring Arc */}
      <path
        d="M 20.8,132 A 100,100 0 0,0 219.2,132"
        stroke={goldColor}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Left & Right Deep Chocolate Brown Dots */}
      <circle cx="20" cy="120" r="4.5" fill={primaryColor} />
      <circle cx="220" cy="120" r="4.5" fill={primaryColor} />

      {/* Golden Chef Hat above Apex of A */}
      <g
        stroke={goldColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Puffy top of chef hat */}
        <path d="M 106,52 C 97,49 96,37 105,35 C 108,27 123,26 127,34 C 135,33 141,42 135,49 C 133,51 131,52 129,53" />
        {/* Hat band */}
        <path d="M 106,51 L 108,60 Q 119,57 129,61 L 131,51" />
        {/* Subtle band crease on right */}
        <path d="M 119,55 Q 126,55 132,57" strokeWidth="1.9" />
      </g>

      {/* Intertwined "AB" Monogram in Deep Chocolate Brown */}
      <g fill={primaryColor}>
        {/* Left thin leg of A with curved serif foot */}
        <path d="M 110,63 L 113,63 L 85,135 C 80,147 73,152 64,152 L 64,150 C 71,149 76,144 80,134 L 110,63 Z" />

        {/* Right thick leg of A with bottom right terminal */}
        <path d="M 110,63 L 114,63 L 141,136 C 144,144 148,147 153,148 L 153,150 C 143,150 137,147 133,137 L 107,69 Z" />

        {/* Arched crossbar of A */}
        <path d="M 83,128 C 93,118 108,113 124,113 L 125,117 C 110,117 95,122 81,133 Z" />

        {/* Upper loop of B */}
        <path d="M 122,95 L 139,95 C 155,95 164,102 164,113 C 164,123 155,129 139,130 L 132,130 L 131,126 L 138,126 C 149,126 155,121 155,113 C 155,104 148,99 137,99 L 123,99 Z" />

        {/* Lower loop of B sweeping into the long S-curve tail underneath */}
        <path d="M 135,127 L 143,127 C 161,127 171,136 171,149 C 171,163 159,172 142,172 C 129,172 119,166 108,163 C 101,160 94,160 88,162 L 88,160 C 95,157 104,157 114,161 C 125,165 133,168 142,168 C 155,168 162,160 162,149 C 162,137 153,131 136,131 Z" />
      </g>

      {/* Golden Wheat Stalk curving up from bottom-left */}
      <g fill={goldColor} stroke={goldColor}>
        {/* Curved stem */}
        <path
          d="M 83,173 C 76,156 80,141 95,132"
          strokeWidth="1.9"
          strokeLinecap="round"
          fill="none"
        />
        {/* Upper row of wheat kernels */}
        <ellipse cx="92" cy="133" rx="5.2" ry="2.1" transform="rotate(-35 92 133)" />
        <ellipse cx="99" cy="129" rx="5.2" ry="2.1" transform="rotate(-28 99 129)" />
        <ellipse cx="107" cy="126" rx="5.2" ry="2.1" transform="rotate(-20 107 126)" />
        <ellipse cx="115" cy="124" rx="4.8" ry="1.9" transform="rotate(-14 115 124)" />
        {/* Lower row of wheat kernels */}
        <ellipse cx="96" cy="137" rx="5.2" ry="2.1" transform="rotate(-10 96 137)" />
        <ellipse cx="104" cy="134" rx="5.2" ry="2.1" transform="rotate(-6 104 134)" />
        <ellipse cx="112" cy="131" rx="5.2" ry="2.1" transform="rotate(-3 112 131)" />
        <ellipse cx="120" cy="128" rx="4.8" ry="1.9" transform="rotate(-5 120 128)" />
      </g>

      {/* Urdu Calligraphy "عباسی" */}
      <text
        x="120"
        y="192"
        textAnchor="middle"
        fill={primaryColor}
        fontSize="24"
        fontWeight="600"
        fontFamily="'Noto Nastaliq Urdu', 'Cormorant Garamond', serif"
      >
        عباسی
      </text>

      {/* Curved Bottom Text: B A K E R S  &  S W E E T */}
      <text
        fontSize="11.2"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="700"
        letterSpacing="4.5"
        fill={primaryColor}
      >
        <textPath href="#abbasiBottomTextArc" startOffset="50%" textAnchor="middle">
          BAKERS <tspan fill={goldColor}>&amp;</tspan> SWEET
        </textPath>
      </text>
    </svg>
  );

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <BadgeSvg svgClass={badgeSizes[size]} />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <BadgeSvg svgClass={`${badgeSizes[size]} shrink-0`} />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <BadgeSvg svgClass={`${badgeSizes[size]} shrink-0`} />
      <div className="flex flex-col leading-none">
        <span
          className={`font-serif-display text-lg sm:text-2xl font-bold tracking-[0.12em] uppercase whitespace-nowrap ${
            theme === 'dark' ? 'text-[#FDFAF5]' : 'text-[#52321B]'
          }`}
        >
          Abbasi Bakers &amp; Sweets
        </span>
      </div>
    </div>
  );
};

export const WheatDivider: React.FC<{ className?: string; light?: boolean }> = ({
  className = '',
  light = false,
}) => {
  const lineColor = light ? 'bg-[#CFA878]/40' : 'bg-[#CFA878]/60';
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className={`h-[1px] w-12 sm:w-20 ${lineColor}`} />
      <svg
        viewBox="0 0 36 16"
        className="w-8 h-4 text-[#CFA878]"
        fill="currentColor"
      >
        <ellipse cx="10" cy="8" rx="4" ry="1.8" transform="rotate(-20 10 8)" />
        <ellipse cx="18" cy="6" rx="4" ry="1.8" transform="rotate(-10 18 6)" />
        <ellipse cx="18" cy="10" rx="4" ry="1.8" transform="rotate(10 18 10)" />
        <ellipse cx="26" cy="8" rx="4" ry="1.8" transform="rotate(20 26 8)" />
        <circle cx="4" cy="8" r="1.5" />
        <circle cx="32" cy="8" r="1.5" />
      </svg>
      <span className={`h-[1px] w-12 sm:w-20 ${lineColor}`} />
    </div>
  );
};
