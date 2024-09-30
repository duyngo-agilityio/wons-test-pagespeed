/**
 * @param requiredFields [] The required fields on form
 * @param dirtyFields [] The fields, which the users touched and fill data on
 * @param errors {} The errors fields
 * NOTE: If the user touched and fill data for the fields, which defined on array requiredFields and without errors message
 *  ==> The button should enable.
 * When the button enable AND user focusing on the last element
 * the UX: hit `enter` on the last field to submit form should work
 */
export const isEnableSubmitButton = (
  requiredFields: string[],
  dirtyFields: string[],
  errors: Record<string, unknown>,
): boolean => {
  const isMatchAllRequiredFields: boolean = requiredFields.every((field) =>
    dirtyFields.includes(field),
  );

  return isMatchAllRequiredFields && errors && !Object.keys(errors).length;
};

/**
 * Function get dirty state
 */
export const getDirtyState = <T extends object>(
  baseObject: T,
  targetObject: T,
) => {
  const baseKeys = Object.keys(baseObject) as Array<keyof T>;
  const targetKeys = Object.keys(targetObject) as Array<keyof T>;

  if (baseKeys.length !== targetKeys.length) return false;

  for (const key of baseKeys) {
    if (!Object.prototype.hasOwnProperty.call(targetObject, key)) return false;

    // Trim the values before comparing
    const baseValue = String(baseObject[key]).trim();
    const targetValue = String(targetObject[key]).trim();

    if (baseValue !== targetValue) return false;
  }

  return true;
};
