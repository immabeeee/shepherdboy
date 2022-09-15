export const primary = [
  { name: '--white-100', value: '#ffffff' },
  { name: '--grey-100', value: '#FAFAFA' },
  { name: '--grey-200', value: '#EFEFEF' },
  { name: '--grey-300', value: '#E0E0E0' },
  { name: '--grey-400', value: '#C1C1C1' },
  { name: '--black-50', value: '#e0e0e0' },
  { name: '--black-100', value: '#282828' },
  { name: '--black-200', value: '#000000' },
  { name: '--yellow-50', value: '#fff4b4' },
  { name: '--yellow-100', value: '#E7C91F' },
  { name: '--purple-100', value: '#FAF4FF' },
  { name: '--purple-200', value: '#BD70F8' },
  { name: '--purple-300', value: '#6100ab' },
  { name: '--green-100', value: '#f4fffe' },
  { name: '--green-200', value: '#6af8d9' },
  { name: '--box-shadow-100', value: '#E0E0E0' },
  { name: '--error-100:', value: '#7a0000' },
  { name: '--error-200', value: '#953535' },
  { name: '--warn-100', value: '#c57e07' },
  { name: '--warn-200', value: '#a96c06' },
  { name: '--info-100', value: '#BD70F8' },
  { name: '--info-200', value: '#a35bda' },
  { name: '--success-100', value: '#01db72' },
  { name: '--success-200', value: '#00ab58' },
];
const secondary = [
  { name: '--white-100', value: '#0A0A0A' },
  { name: '--grey-100', value: '#0D0D0D' },
  { name: '--grey-200', value: '#161616' },
  { name: '--grey-300', value: '#202020' },
  { name: '--grey-400', value: '#C1C1C1' },
  { name: '--black-50', value: '#4a4a4a' },
  { name: '--black-100', value: '#FAFAFA' },
  { name: '--black-200', value: '#fff' },
  { name: '--yellow-50', value: '#ead870' },
  { name: '--yellow-100', value: '#E7C91F' },
  { name: '--purple-100', value: '#22172b' },
  { name: '--purple-200', value: '#BD70F8' },
  { name: '--purple-300', value: '#6100ab' },
  { name: '--green-100', value: '#162d2b' },
  { name: '--green-200', value: '#6af8d9' },
  { name: '--box-shadow-100', value: '#161616' },
  { name: '--error-100:', value: '#fbdbdb' },
  { name: '--error-200', value: '#f9c8c8' },
  { name: '--warn-100', value: '#fbecdb' },
  { name: '--warn-200', value: '#f9f3c8' },
  { name: '--info-100', value: '#BD70F8' },
  { name: '--info-200', value: '#a35bda' },
  { name: '--success-100', value: '#dbfbe3' },
  { name: '--success-200', value: '#c8f9ce' },
];

export function initTheme(): void {
  const isDarkSet = getStorageThemeValue() === 'secondary';
  const isThemeStored = 'theme' in localStorage;
  const isDarkPrefered = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  if (isDarkSet || (!isThemeStored && isDarkPrefered)) {
    localStorage.setItem('theme', 'secondary');
    secondary.forEach(({ name, value }) => {
      document.documentElement.style.setProperty(name, value);
    });
  } else {
    localStorage.setItem('theme', 'primary');
    primary.forEach(({ name, value }) => {
      document.documentElement.style.setProperty(name, value);
    });
  }
}

export function toggleTheme(): void {
  localStorage.setItem(
    'theme',
    getStorageThemeValue() === 'primary' ? 'secondary' : 'primary'
  );
  initTheme();
}

export function getStorageThemeValue(): string | null {
  return localStorage.getItem('theme');
}
