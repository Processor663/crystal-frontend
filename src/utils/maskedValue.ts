const maskValue = (value: string, visibleStart = 0, visibleEnd = 4) => {
  const maskedLength = value.length - visibleStart - visibleEnd;

  return (
    value.slice(0, visibleStart) +
    "*".repeat(Math.max(maskedLength, 0)) +
    value.slice(-visibleEnd)
  );
};

export default maskValue

// Examples
// maskValue("12345678901", 3, 4);
//  123****8901

// maskValue("12345678901");
// *******8901
