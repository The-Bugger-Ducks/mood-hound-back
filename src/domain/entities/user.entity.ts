export enum UserRoleEnum {
	ADMIN = 'ADMIN',
	VIEWER = 'VIEWER',
}

export class UserEntity {
	id?: string;
	name: string;
	email: string;
	password: string;
	role: UserRoleEnum;
}
