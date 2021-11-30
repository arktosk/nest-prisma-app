import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { CryptoModule } from '../services/crypto/crypto.module';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CryptoService } from '../services/crypto/crypto.service';

describe('AuthService', () => {
  let usersService: UsersService;
  let cryptoService: CryptoService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
          signOptions: { expiresIn: '1s' },
        }),
        UsersModule,
        CryptoModule,
      ],
      providers: [AuthService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    cryptoService = module.get<CryptoService>(CryptoService);
    authService = module.get<AuthService>(AuthService);
  });

  describe('when validating user', () => {
    const userEmail = 'user@example.com';

    beforeEach(() => {
      jest
        .spyOn(usersService, 'findAuthInfo')
        .mockImplementation(async ({ email }) => ({
          id: 0,
          email,
          password: await cryptoService.hash('correct-password'),
        }));

      jest
        .spyOn(usersService, 'findUnique')
        .mockImplementation(async ({ email }) =>
          email === userEmail
            ? {
                id: 0,
                email,
                name: 'User',
                createdAt: new Date(),
                updatedAt: new Date(),
              }
            : null,
        );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return user object when email and password are correct', async () => {
      const result = await authService.validateUser(
        userEmail,
        'correct-password',
      );

      expect(result).not.toBeNull();
      expect(result).toMatchObject({
        id: 0,
        email: userEmail,
        name: 'User',
      });
    });

    it('should return null when user or password are wrong', async () => {
      let result;
      result = await authService.validateUser('wrong-email', 'wrong-password');

      expect(result).toBeNull();

      result = await authService.validateUser(userEmail, 'wrong-password');

      expect(result).toBeNull();
    });
  });

  it.todo('should return valid JWT when log in');
});
