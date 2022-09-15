import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  createOscypek,
  defaultOscypekList,
} from './helpers/inventory/oscypek.helpers';
import { AppModule } from '../../../shepherdboy-api/src/app/app.module';
import { CreateOscypekResponse } from '@shepherdboy-org/api-interfaces';

describe('Create default Inventory', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a default oscypek inventory', () => {
    // given

    // when
    return defaultOscypekList.forEach(
      async ({ name, price, size, type, availableAmount }) => {
        return await createOscypek(
          app.getHttpServer(),
          `${name}`,
          size,
          type,
          price.toString(),
          availableAmount
        )
          // then
          .expect(201)
          .expect(({ body }: { body: CreateOscypekResponse }) => {
            expect(body.availableAmount).toBeDefined();
          });
      }
    );
  });
});
