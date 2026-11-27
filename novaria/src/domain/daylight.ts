export const DAY_MS=48*60*1000;
export const gameHour=(elapsedMs:number,startHour=8)=>((startHour+elapsedMs/DAY_MS*24)%24+24)%24;
const stops=[{h:0,light:.16,warmth:.2},{h:5,light:.18,warmth:.3},{h:7,light:.65,warmth:.85},{h:12,light:1,warmth:.45},{h:17,light:.8,warmth:.9},{h:20,light:.25,warmth:.35},{h:24,light:.16,warmth:.2}];
export function daylight(hour:number){const h=((hour%24)+24)%24;const i=stops.findIndex(s=>s.h>h);const a=stops[i-1],b=stops[i];const t=(h-a.h)/(b.h-a.h);const u=t*t*(3-2*t);return {light:a.light+(b.light-a.light)*u,warmth:a.warmth+(b.warmth-a.warmth)*u,sunAngle:(h-6)*Math.PI/12};}
