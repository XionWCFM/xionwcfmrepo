export const objectKeys = <GenericObject extends Record<PropertyKey, unknown>>(obj: GenericObject) => {
  return Array.from(Object.keys(obj) as Array<keyof GenericObject>);
};
