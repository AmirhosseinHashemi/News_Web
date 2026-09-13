import UserRepository from "./user.repository.js";

export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll();
  }
}
