import { CamelToNormalPipe } from './camel-to-normal.pipe';

describe('CamelToNormalPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelToNormalPipe();
    expect(pipe).toBeTruthy();
  });

  it('should change camel case', () => {
    const pipe = new CamelToNormalPipe();
    expect(pipe.transform('thisIsTheTest')).toEqual("this is the test");
  });
});
