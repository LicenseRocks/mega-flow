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
