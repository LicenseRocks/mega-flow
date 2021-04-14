const getConditionValues = (
  conditions,
  watch,
  wizardData,
  isRecurring,
  recurringName
) => {
  const name = conditions.map((c) => {
    if (c.includes(":")) {
      const [n] = c.split(":");
      return n;
    }
    return c;
  });

  return watch(isRecurring ? [recurringName] : name, wizardData);
};

export const checkCondition = (
  conditions,
  watch,
  wizardData,
  isRecurring,
  recurringName,
  recurringIndex
) => {
  const hasConditions = conditions && conditions.length > 0;
  if (hasConditions) {
    const conditionValues = getConditionValues(
      conditions,
      watch,
      wizardData,
      isRecurring,
      recurringName
    );

    const target = isRecurring
      ? conditionValues?.[recurringName]?.[recurringIndex]
      : conditionValues;

    if (conditionValues && target) {
      return conditions.some((c) => {
        if (c.includes(":")) {
          const [name, value, not] = c.split(":");
          const isTrue =
            target[name] === value ||
            (Array.isArray(value) && target[name]?.includes(value)) ||
            (value === "true" && Boolean(target[name]));

          if (not) return !isTrue;
          return isTrue;
        }
        return target[c]?.length > 0 || !!target[c];
      });
    }
  }
  return true;
};
