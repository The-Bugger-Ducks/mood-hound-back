import { ObjectId } from 'mongodb';

export enum UserRoleEnum {
	ADMIN = 'ADMIN',
	VIEWER = 'VIEWER',
}

export class UserMongoEntity {
	_id?: ObjectId;
	name: string;
	email: string;
	password: string;
	role: UserRoleEnum;
}

export class UserEntity {
	id: string;
	name: string;
	email: string;
	password: string;
	role: UserRoleEnum;

	constructor(data: Partial<UserMongoEntity>) {
		this.id = data._id.toString();
		this.name = data.name;
		this.email = data.email;
		this.password = data.password;
		this.role = data.role;
	}
}
