/**
Removes any key-value pairs with empty string values from the given object.
Only removes from the first level of properties, any nested objects will not be modified.
*/
export function removeEmptyStringFromObject(obj: object) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== "")
  );
}
