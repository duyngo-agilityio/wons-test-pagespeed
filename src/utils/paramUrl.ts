export const formatQuery = (
  query: Record<string, string | undefined>,
): string => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  return params.toString();
};

/**
 *
 * @param value - It is the period of time from what date to what date
 * @returns - filters[$and][0][createdAt][$gte]=2024-08-27T17:00:00.000Z&
 *            filters[$and][1][createdAt][$lte]=2024-08-31T17:00:00.000Z
 *
 * @example
 * @param - {'createdAt[$gte]': '2024-08-26T17:00:00.000Z',
 *            'createdAt[$lte]': '2024-08-31T17:00:00.000Z', }
 * @returns- filters[$and][0][createdAt][$gte]=2024-08-27T17:00:00.000Z&
 *           filters[$and][1][createdAt][$lte]=2024-08-31T17:00:00.000Z
 */
export const formatFilterIntervalDate = (
  value: Record<string, string>,
): string => {
  const urlParams: string[] = [];

  Object.keys(value).forEach((key) => {
    const match = RegExp(/^([^[]+)\[([^\]]+)\]$/).exec(key);
    const [field, operator] = match ? match.slice(1) : [];

    if (value[key] !== undefined) {
      urlParams.push(
        `&filters[$and][${urlParams.length}][${field}][${operator}]=${value[key]}`,
      );
    }
  });

  return urlParams.join('&');
};
