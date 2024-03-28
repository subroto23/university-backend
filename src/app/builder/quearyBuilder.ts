import { FilterQuery, Query } from 'mongoose';

class QuearyBuilder<T> {
  public quearyModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(quearyModel: Query<T[], T>, query: Record<string, unknown>) {
    this.quearyModel = quearyModel;
    this.query = query;
  }
  //Searching
  search(searchAbleFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.quearyModel = this.quearyModel.find({
        $or: searchAbleFields.map((field) => {
          return {
            [field]: { $regex: searchTerm, $options: 'i' },
          } as FilterQuery<T>;
        }),
      });
    }
    return this;
  }
  //Filtering
  filter() {
    const queryObj = { ...this.query }; //copy
    const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.quearyModel = this.quearyModel.find(queryObj as FilterQuery<T>);
    return this;
  }

  //Sort
  sort() {
    const sort = this?.query?.sort || '-createdAt';
    this.quearyModel = this.quearyModel.sort(sort as string);
    return this;
  }

  //Pagination
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = Number(page - 1) * limit;
    this.quearyModel = this.quearyModel.skip(skip).limit(limit);
    return this;
  }

  //fileLimitiong
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.quearyModel = this.quearyModel.select(fields);
    return this;
  }
}

export default QuearyBuilder;
