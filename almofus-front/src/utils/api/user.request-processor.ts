import { almofusAxios } from './almofus-axios';
import { CompleteUserDto, LoginRequestDto } from './dto/user.dto';

class UserRequestProcessor {
  async getUser(userId: number) {
    const response = await almofusAxios.get<CompleteUserDto>(`/users/${userId}`);
    return response.data;
  }

  async login(email: string, password: string) {
    const body: LoginRequestDto = {
      email,
      password,
    };

    const response = await almofusAxios.post<CompleteUserDto>(`/users/login`, body);
    return response.data;
  }
}

export default new UserRequestProcessor();
