import {
  getPagination,
  getPaginationMeta,
} from "../../utils/paginationHelpers.js";
import UserRepository from "./user.repository.js";
import { FindAllSeriviceParams } from "./user.type.js";

export default class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll({ page, limit }: FindAllSeriviceParams) {
    const { skip, take } = getPagination(page, limit);

    const [users, totalItems] = await this.userRepository.findAll({
      skip,
      take,
    });

    const paginationMeta = getPaginationMeta({ page, limit, totalItems });

    return { users, paginationMeta };
  }
}
