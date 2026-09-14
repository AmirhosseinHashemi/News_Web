export function getPagination(page: number, limit: number) {
  const skip = (page - 1) * limit;

  return {
    take: limit,
    skip,
  };
}

export function getPaginationMeta({
  page,
  limit,
  totalItems,
}: {
  page: number;
  limit: number;
  totalItems: number;
}) {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage: page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
