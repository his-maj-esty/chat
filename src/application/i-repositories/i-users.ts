export interface IUserRepository {
  create(user: User): Promise<User>;
  validate(user: UserValidate): Promise<boolean>;
  isExistingUser(user: UserCheck): Promise<boolean>;
  update(user: UserUpdate): Promise<User>;
  delete(user: UserDelete): Promise<void>;
}
