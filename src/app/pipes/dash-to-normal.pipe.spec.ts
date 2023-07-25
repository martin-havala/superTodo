import { DashToNormalPipe } from './dash-to-normal.pipe';

describe('DashToNormalPipe', () => {
  it('create an instance', () => {
    const pipe = new DashToNormalPipe();
    expect(pipe).toBeTruthy();
  });

  it('should change dash case', () => {
    const pipe = new DashToNormalPipe();
    expect(pipe.transform('this-is-the-test')).toEqual("this is the test");
  });
});
