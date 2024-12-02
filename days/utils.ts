export const speedygonzalez = (fn) => {
  const time = performance.now();
  fn();
  console.log(`Completed in ${(performance.now() - time).toFixed(2)}ms`);
};
