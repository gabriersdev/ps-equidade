export function isValidStudentName(name: string): boolean {
  return /^[a-zA-ZÀ-ÿ]+(?:\s+(?:[eE]\s+)?[a-zA-ZÀ-ÿ]+)+$/.test(name.trim());
}

export function isValidBirthDateStr(dateStr: string): boolean {
  const cleanDate = dateStr.replace(/\D/g, "");
  if (cleanDate.length !== 8) return false;

  const day = parseInt(cleanDate.substring(0, 2), 10);
  const month = parseInt(cleanDate.substring(2, 4), 10);
  const year = parseInt(cleanDate.substring(4, 8), 10);

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function formatBirthDateInput(rawValue: string): {
  formatted: string;
  digits: string;
} {
  let digits = rawValue.replace(/\D/g, "");
  if (digits.length > 8) {
    digits = digits.substring(0, 8);
  }

  let formatted = digits;
  if (digits.length > 4) {
    formatted = `${digits.substring(0, 2)} ${digits.substring(2, 4)} ${digits.substring(4)}`;
  } else if (digits.length > 2) {
    formatted = `${digits.substring(0, 2)} ${digits.substring(2)}`;
  }

  return { formatted, digits };
}

