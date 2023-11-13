export const funcGetRGBA = (s) => {    
    if (s[0]==="#" ) {
        //#rrggbb
        return hexToRgba(s);
    } else if (s[0]==="r"){
        if (s[3] === "a"){
            return s;
        } else {                       
            return rgbToRgba(s);
        }
    } else if (s[3]==="a"){
        //format to get hsla example string "hsla(345, 100%, 54%, 0.8)"
        //remove "hsla(" and ")"
        s = s.slice(5, s.length)
        //345, 100%, 54%, 0.8
        s = s.split(",").join("");
        [h, s, l, a] = s.split(" ").map(Number);
        
        return hslToRgba(h, s, l, a);
    } else {
        //format to get hsl example string "hsl(345, 100%, 54%)"
        //remove first4 and last characters from string
        s = s.slice(4, s.length-1);        
        //now its "345, 100%, 54%"
        // remove commas ","
        s = s.split(",").join("");
        //now its  "345 100% 54%"
        //remove "%"
        s = s.split("%").join("");
        //now its "345 100 54"
        
        [h, s, l] = s.split(" ").map(Number);        
        return hslToRgba(h, s, l);
    }
}
const hexToRgba = (s) => {
  
  const hexToDecimal = (hex) =>{
    
    if (hex === "F" || hex === "f") {      
      return 15;
    } else if (hex === "E" || hex === "e") {
      return 14;
    } else if (hex === "D" || hex === "d") {
      return 13;
    } else if (hex === "C" || hex === "c") {
      return 12;
    } else if (hex === "B" || hex === "b") {
      return 11;
    } else if (hex === "A" || hex === "a") {
      return 10;
    } else {
      return +hex;
    }
  }
  let r;
  let g;
  let b;
  let a;
  if (s.length === 7){
    r = Math.round((((hexToDecimal(s[1]) * 16) + hexToDecimal(s[2])) / 256) * 255);
    g = Math.round((((hexToDecimal(s[3]) * 16) + hexToDecimal(s[4])) / 256) * 255);
    b = Math.round((((hexToDecimal(s[5]) * 16) + hexToDecimal(s[6])) / 256) * 255);
    a = 1;
  } else {
    r = Math.round((((hexToDecimal(s[1]) * 16) + hexToDecimal(s[2])) / 256) * 255);
    g = Math.round((((hexToDecimal(s[3]) * 16) + hexToDecimal(s[4])) / 256) * 255);
    b = Math.round((((hexToDecimal(s[5]) * 16) + hexToDecimal(s[6])) / 256) * 255);
    a = Math.round((((hexToDecimal(s[7]) * 16) + hexToDecimal(s[8])) / 256) * 255);
  }
  
  return `rgba(${r},${g},${b},${a})`;
  //#rrbbgg
  
  
}
const rgbToRgba = (s) => {
  return s.slice(0, 3) + a + s.slice(3, s.length) + ', 1)';
}

const hslToRgba = (h, s, l, a=100) => {   
    
    const C = (1 - Math.abs(2 * l - 1)) * s;
    const m = l - C / 2;
    const X = C * (1 - Math.abs(((h / 60) % 2) - 1));

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
      r = C; g = X; b = 0;
    } else if (h >= 60 && h < 120) {
      r = X; g = C; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = C; b = X;
    } else if (h >= 180 && h < 240) {
      r = 0; g = X; b = C;
    } else if (h >= 240 && h < 300) {
      r = X; g = 0; b = C;
    } else if (h >= 300 && h < 360) {
      r = C; g = 0; b = X;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return `rgb(${r},${g},${b},${a})`;   
}