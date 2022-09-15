import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  createOscypek,
  deleteOscypek,
} from './helpers/inventory/oscypek.helpers';
import {
  createAdditive,
  deleteAdditive,
} from './helpers/inventory/additive.helpers';
import { AppModule } from './../../../shepherdboy-api/src/app/app.module';
import {
  CreateAdditiveResponse,
  CreateOscypekResponse,
} from '@shepherdboy-org/api-interfaces';

describe('Inventory API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create an oscypek', () => {
    // given

    // when
    return (
      createOscypek(app.getHttpServer())
        // then
        .expect(201)
        .expect(({ body }: { body: CreateOscypekResponse }) => {
          expect(body.availableAmount).toBeDefined();
          expect(body.createdAt).toBeDefined();
          expect(body.group).toBeDefined();
          expect(body.id).toBeDefined();
          expect(body.name).toBeDefined();
          expect(body.price).toBeDefined();
          expect(body.size).toBeDefined();
          expect(body.type).toBeDefined();
          expect(body.updatedAt).toBeDefined();
        })
        // remove created data
        .then(({ body }) => deleteOscypek(app.getHttpServer(), body.id))
    );
  });

  it('should create an additive', () => {
    // given

    // when
    return (
      createAdditive(app.getHttpServer())
        // then
        .expect(201)
        .expect(({ body }: { body: CreateAdditiveResponse }) => {
          expect(body.availableAmount).toBeDefined();
          expect(body.createdAt).toBeDefined();
          expect(body.group).toBeDefined();
          expect(body.id).toBeDefined();
          expect(body.name).toBeDefined();
          expect(body.price).toBeDefined();
          expect(body.updatedAt).toBeDefined();
        })
        // remove created data
        .then(({ body }) => deleteAdditive(app.getHttpServer(), body.id))
    );
  });
});
