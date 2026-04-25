/**
 * Stylized continent silhouettes for the global prediction map.
 * Coordinates are simplified geography on a 1000×500 equirectangular-ish canvas.
 * Designed to be RECOGNIZABLE (not a real GeoJSON projection) — North America
 * left, Africa centered low, Eurasia across the middle, Oceania bottom right.
 *
 * In a future iteration this can be swapped for a real TopoJSON via d3-geo.
 */
export const CONTINENT_PATHS: string[] = [
  // North America (Alaska + Canada + USA + Mexico)
  "M 80 90 L 110 80 L 145 78 L 175 90 L 205 95 L 235 92 L 270 100 L 300 115 L 312 145 L 305 175 L 290 200 L 268 215 L 245 232 L 225 248 L 210 265 L 195 248 L 175 235 L 150 222 L 128 205 L 110 185 L 95 160 L 85 130 Z",
  // Greenland
  "M 360 75 L 395 70 L 415 85 L 410 115 L 388 130 L 365 122 L 355 100 Z",
  // Central America (thin)
  "M 215 268 L 235 270 L 255 280 L 268 295 L 262 310 L 245 305 L 228 295 L 218 282 Z",
  // South America
  "M 270 305 L 295 308 L 320 320 L 338 345 L 348 380 L 345 415 L 332 445 L 310 462 L 288 458 L 272 432 L 263 400 L 258 365 L 262 335 Z",
  // Europe (Iberia + France + UK + Scandinavia + Eastern)
  "M 460 130 L 478 118 L 498 110 L 518 108 L 540 110 L 560 120 L 575 135 L 580 152 L 568 170 L 545 178 L 522 182 L 500 188 L 478 192 L 460 185 L 448 172 L 442 155 L 448 140 Z",
  // United Kingdom (separate island)
  "M 458 138 L 472 132 L 478 148 L 472 162 L 458 162 L 452 150 Z",
  // Scandinavia
  "M 510 95 L 528 88 L 545 92 L 552 110 L 545 128 L 528 132 L 514 122 Z",
  // Africa
  "M 490 215 L 520 210 L 555 215 L 588 222 L 605 240 L 612 270 L 608 305 L 595 340 L 575 375 L 548 400 L 518 410 L 495 400 L 480 372 L 472 340 L 470 305 L 475 270 L 482 240 Z",
  // Middle East / Arabia
  "M 580 198 L 612 200 L 635 215 L 642 240 L 632 262 L 610 268 L 588 262 L 575 245 L 572 220 Z",
  // Russia / North Asia (long horizontal)
  "M 555 95 L 600 88 L 645 85 L 690 82 L 735 80 L 780 82 L 820 88 L 855 100 L 868 122 L 855 142 L 820 152 L 778 155 L 735 152 L 690 148 L 645 142 L 605 135 L 575 125 Z",
  // China + East Asia
  "M 715 165 L 750 162 L 785 168 L 815 180 L 832 205 L 838 232 L 825 255 L 800 268 L 770 270 L 745 262 L 725 245 L 715 220 L 712 195 Z",
  // Korean peninsula
  "M 818 215 L 830 215 L 832 235 L 822 245 L 815 235 Z",
  // Japan (3 islands)
  "M 855 195 L 868 198 L 875 215 L 870 232 L 858 235 L 850 220 L 850 205 Z",
  "M 845 240 L 855 242 L 855 255 L 845 256 Z",
  // India subcontinent
  "M 685 220 L 710 218 L 735 225 L 745 250 L 738 280 L 718 298 L 698 295 L 685 275 L 680 248 Z",
  // Southeast Asia (Indochina + Indonesia rough)
  "M 758 270 L 785 268 L 808 280 L 815 305 L 800 322 L 778 320 L 762 305 L 758 285 Z",
  "M 770 335 L 808 338 L 832 348 L 835 362 L 818 368 L 790 365 L 772 355 Z",
  // Australia
  "M 798 372 L 832 368 L 868 372 L 892 385 L 895 410 L 880 425 L 850 432 L 818 428 L 795 415 L 788 395 Z",
  // New Zealand
  "M 905 425 L 918 428 L 922 442 L 912 450 L 902 442 Z",
];
