import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  createAdditive,
  defaultAdditiveList,
} from './helpers/inventory/additive.helpers';
import { AppModule } from '../../../shepherdboy-api/src/app/app.module';
import { CreateAdditiveResponse } from '@shepherdboy-org/api-interfaces';

describe('Create default Inventory', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a garlic pesto add-on', () => {
    // given

    // when
    return (
      createAdditive(
        app.getHttpServer(),
        defaultAdditiveList[0].name,
        defaultAdditiveList[0].price.toString(),
        defaultAdditiveList[0].availableAmount
      )
        // then
        .expect(201)
        .expect(({ body }: { body: CreateAdditiveResponse }) => {
          expect(body.availableAmount).toBeDefined();
        })
    );
  });

  it('should create a cranberry sauce add-on', () => {
    // given

    // when
    return (
      createAdditive(
        app.getHttpServer(),
        defaultAdditiveList[1].name,
        defaultAdditiveList[1].price.toString(),
        defaultAdditiveList[1].availableAmount
      )
        // then
        .expect(201)
        .expect(({ body }: { body: CreateAdditiveResponse }) => {
          expect(body.availableAmount).toBeDefined();
        })
    );
  });
});
