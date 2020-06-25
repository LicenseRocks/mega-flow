export const stepBorderAndTitleColor = ({ isActive, isPassed, theme }) => {
  if (isActive) return theme.colors.primary.main;
  if (isPassed) return theme.colors.gray.dark;
  return theme.colors.gray.medium;
};

export const stepFlagColor = ({ isActive, isPassed, theme }) => {
  if (isActive || isPassed) return theme.colors.white;
  return theme.colors.gray.medium;
};

export const stepFlagBackgroundColor = ({ isActive, isPassed, theme }) => {
  if (isActive) return theme.colors.primary.main;
  if (isPassed) return theme.colors.gray.dark;
  return theme.colors.gray.regular;
};
