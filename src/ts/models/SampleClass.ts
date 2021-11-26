interface SampleClassType {
  title: string;
}

export default class SampleClass implements SampleClassType {
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}
