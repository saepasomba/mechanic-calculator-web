/**
 * Calculator utility functions
 */

/**
 * Removes leading and trailing operators from a string
 */
export function trimOperators(str: string): string {
  return str.replace(/^[+\-*/]+|[+\-*/]+$/g, "");
}

/**
 * Sanitizes and validates calculator input
 * - Removes invalid characters
 * - Prevents consecutive operators
 * - Removes leading zeros from numbers
 */
export function sanitizeAndValidateInput(input: string): string {
  // Remove any characters that are not digits, +, or -
  const sanitizedInput = input.replace(/[^0-9+-]/g, "");

  // Prevent consecutive operators
  let validatedInput = sanitizedInput.replace(/([+-]){2,}/g, "$1");

  // Remove leading zeros from numbers, but keep the operators intact
  validatedInput = validatedInput
    .split(/([+-])/)
    .map((part) => (part.match(/^\d+$/) ? part.replace(/^0+/, "") : part))
    .join("");

  return validatedInput;
}

/**
 * Safely evaluates a mathematical expression string
 * Returns 0 if the expression is invalid
 */
export function safeEvaluate(expression: string): number {
  try {
    // Only evaluate if the expression contains valid characters
    if (/^[0-9+\-*/\s]+$/.test(expression)) {
      // Using Function constructor instead of eval for slightly better security
      // Still not completely safe, but better for this use case
      const result = new Function(`return ${expression}`)();
      return typeof result === "number" && isFinite(result) ? result : 0;
    }
    return 0;
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return 0;
  }
}
