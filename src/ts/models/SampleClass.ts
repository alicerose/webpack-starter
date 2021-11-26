import SampleInterface from '../interfaces/SampleInterface';

export default class SampleClass implements SampleInterface {
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}
