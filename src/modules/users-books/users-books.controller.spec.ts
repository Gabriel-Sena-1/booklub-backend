import { Test, TestingModule } from '@nestjs/testing';
import { UsersBooksController } from './users-books.controller';
import { UsersBooksService } from './users-books.service';

describe('UsersBooksController', () => {
  let controller: UsersBooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersBooksController],
      providers: [UsersBooksService],
    }).compile();

    controller = module.get<UsersBooksController>(UsersBooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
