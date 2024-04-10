export interface IPaginationRes<T> {
  meta: {
    total: number;
  };
  data: Array<T>;
}
