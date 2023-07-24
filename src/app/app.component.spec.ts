import { SpectatorRouting, createRoutingFactory } from '@ngneat/spectator/jest';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: SpectatorRouting<AppComponent>;
  const createComponent = createRoutingFactory(AppComponent);

  beforeEach(
    () =>
      (spectator = createComponent({
        providers: [],
      }))
  );

  it('should be alive', () => {
    expect(spectator).toBeTruthy();
  });
});
