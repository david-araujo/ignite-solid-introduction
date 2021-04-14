import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (!user_id) throw new Error("user not found");
    const adminUser = this.usersRepository.findById(user_id);
    if (!adminUser || !adminUser.admin)
      throw new Error("This is not an Admin User");
    const users = this.usersRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };
