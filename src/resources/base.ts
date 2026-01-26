import { EagleBirth } from '../client';

/**
 * Base resource class
 */
export abstract class BaseResource {
  protected client: EagleBirth;

  constructor(client: EagleBirth) {
    this.client = client;
  }
}
