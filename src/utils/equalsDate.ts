export function areTodayDate(date: string): boolean {
  const givenDate = new Date(date);
  const today = new Date();
  
  return (
    givenDate.getDate() === today.getDate() &&
    givenDate.getMonth() === today.getMonth() &&
    givenDate.getFullYear() === today.getFullYear()
  );
}