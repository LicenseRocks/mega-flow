import { useWatch } from "react-hook-form";

const getConditionValues = (conditions, control, wizardData) => {
  const name = conditions.map((c) => {
    if (c.includes(":")) {
      const [n] = c.split(":");
      return n;
    }
    return c;
  });

  return useWatch({
    control,
    name,
    defaultValue: wizardData,
  });
};

export const checkCondition = (conditions, control, wizardData) => {
  const hasConditions = conditions && conditions.length > 0;
  if (hasConditions) {
    const conditionValues = getConditionValues(conditions, control, wizardData);

    return conditions.some((c) => {
      if (c.includes(":")) {
        const [name, value] = c.split(":");
        return (
          conditionValues[name] === value ||
          conditionValues[name]?.includes(value)
        );
      }
      return conditionValues[c]?.length > 0 || !!conditionValues[c];
    });
  }
  return true;
};
