const getConditionValues = (conditions, watch, wizardData) => {
  const name = conditions.map((c) => {
    if (c.includes(":")) {
      const [n] = c.split(":");
      return n;
    }
    return c;
  });

  return watch(name, wizardData);
};

export const checkCondition = (conditions, watch, wizardData) => {
  const hasConditions = conditions && conditions.length > 0;
  if (hasConditions) {
    const conditionValues = getConditionValues(conditions, watch, wizardData);

    return conditions.some((c) => {
      if (c.includes(":")) {
        const [name, value, not] = c.split(":");
        const isTrue =
          conditionValues[name] === value ||
          (Array.isArray(value) && conditionValues[name]?.includes(value)) ||
          (value === "true" && Boolean(conditionValues[name]));

        if (not) return !isTrue;
        return isTrue;
      }
      return conditionValues[c]?.length > 0 || !!conditionValues[c];
    });
  }
  return true;
};
