export function getSemestaSchoolLogoSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 84" width="360" height="84" fill="none">
    <defs>
      <linearGradient id="semestaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#005C6E" />
        <stop offset="100%" stop-color="#0A3F50" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E5A93C" />
        <stop offset="100%" stop-color="#C58514" />
      </linearGradient>
    </defs>
    
    <!-- Crest Shield -->
    <g transform="translate(8, 6)">
      <path d="M36 2 C54 2 68 14 68 34 C68 56 42 68 36 72 C30 68 4 56 4 34 C4 14 18 2 36 2 Z" fill="url(#semestaGrad)" stroke="#E5A93C" stroke-width="2.5"/>
      <!-- Inner Shield Accent -->
      <path d="M36 7 C50 7 62 17 62 33 C62 50 41 60 36 64 C31 60 10 50 10 33 C10 17 22 7 36 7 Z" fill="#003540" opacity="0.6"/>
      
      <!-- Open Book of Knowledge -->
      <path d="M22 46 C28 43 34 44 36 47 C38 44 44 43 50 46 L50 34 C44 31 38 32 36 35 C34 32 28 31 22 34 Z" fill="#FFFFFF"/>
      <line x1="36" y1="35" x2="36" y2="47" stroke="#005C6E" stroke-width="1.5"/>

      <!-- Flame of Excellence -->
      <path d="M36 15 C39 21 43 25 41 29 C39 32 33 32 31 29 C29 25 33 21 36 15 Z" fill="url(#goldGrad)"/>
      <circle cx="36" cy="27" r="2.5" fill="#FFE599"/>
      
      <!-- Stars of Achievement -->
      <polygon points="36,9 37,12 40,12 37.5,14 38.5,17 36,15 33.5,17 34.5,14 32,12 35,12" fill="#E5A93C"/>
    </g>

    <!-- School Brand Typography -->
    <text x="86" y="32" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="24" fill="#005C6E" letter-spacing="1.5">SEMESTA</text>
    <text x="210" y="32" font-family="'Nunito', Arial, sans-serif" font-weight="700" font-size="20" fill="#E5A93C" letter-spacing="1">SCHOOL</text>
    
    <text x="86" y="49" font-family="'Nunito', Arial, sans-serif" font-weight="700" font-size="10" fill="#475569" letter-spacing="1.2">SEMARANG · INDONESIA</text>
    
    <line x1="86" y1="56" x2="340" y2="56" stroke="#CBD5E1" stroke-width="1"/>
    
    <text x="86" y="69" font-family="'Nunito', Arial, sans-serif" font-weight="600" font-size="9" fill="#0284C7" letter-spacing="0.5">CAMBRIDGE INTERNATIONAL SCHOOL · ID058</text>
  </svg>`;
}

export function getSemestaSchoolLogoDataUri(): string {
  const svg = getSemestaSchoolLogoSvg();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getDefaultTeacherSignatureSvg(teacherName = 'Ratna Dwi Setyorini'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 70" width="220" height="70" fill="none">
    <!-- Fluid natural pen strokes for teacher signature -->
    <path d="M25 45 C40 20, 48 10, 52 40 C55 58, 62 25, 75 35 C88 45, 95 30, 110 32 C125 34, 135 22, 145 36 C155 50, 170 30, 185 34" 
          stroke="#1E3A8A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42 28 C65 24, 110 26, 175 22" 
          stroke="#1E3A8A" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M60 52 C90 50, 140 52, 195 48" 
          stroke="#1E3A8A" stroke-width="1.6" stroke-dasharray="2,1" stroke-linecap="round"/>
    <text x="30" y="66" font-family="Arial, sans-serif" font-size="9" font-weight="600" fill="#475569">${teacherName}</text>
  </svg>`;
}

export function getDefaultTeacherSignatureDataUri(name = 'Ratna Dwi Setyorini'): string {
  const svg = getDefaultTeacherSignatureSvg(name);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function getDefaultPrincipalSignatureSvg(principalName = 'Ahmad Nurani, S.T., M.Pd.'): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" width="240" height="70" fill="none">
    <!-- Official Principal stamp loop and signature -->
    <path d="M25 40 C35 15, 50 12, 58 35 C64 54, 70 20, 85 24 C100 28, 108 50, 120 30 C132 10, 142 55, 155 35 C170 15, 180 40, 205 32" 
          stroke="#0F172A" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M30 50 C80 47, 130 46, 210 44" 
          stroke="#0F172A" stroke-width="2.0" stroke-linecap="round"/>
    <!-- Stamp ring hint -->
    <circle cx="185" cy="35" r="22" stroke="#DC2626" stroke-width="1.5" stroke-dasharray="4,2" opacity="0.6"/>
    <text x="170" y="38" font-family="Arial, sans-serif" font-size="8" font-weight="700" fill="#DC2626" opacity="0.8">SEMESTA</text>
    <text x="25" y="66" font-family="Arial, sans-serif" font-size="9" font-weight="600" fill="#334155">${principalName}</text>
  </svg>`;
}

export function getDefaultPrincipalSignatureDataUri(name = 'Ahmad Nurani, S.T., M.Pd.'): string {
  const svg = getDefaultPrincipalSignatureSvg(name);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
