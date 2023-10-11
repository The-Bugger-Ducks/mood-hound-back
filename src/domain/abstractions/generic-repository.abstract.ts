export abstract class IGenericRepository<T> {
	abstract findAll(): Promise<T[] | Error>;

	abstract findOne(id: string): Promise<T | Error>;

	abstract create(item: T): Promise<void>;
}
