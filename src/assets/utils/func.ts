export const hexToRgb = (hex: string) => {
  // Удаляем решетку, если она есть
  hex = hex.replace(/^#/, '');
  
  // Разбираем HEX на составляющие
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  
  // Возвращаем RGB в формате строки
  return `${r}, ${g}, ${b}`;
}