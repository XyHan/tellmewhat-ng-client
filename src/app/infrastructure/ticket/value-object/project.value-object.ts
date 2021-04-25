import { selectType } from '../../../domain/shared/type/select.type';

export class ProjectValueObject {
  public static getValueObject(): selectType[] {
    return [
      { label: 'Projet A', value: 'a'},
      { label: 'Projet B', value: 'b'},
      { label: 'Projet C', value: 'c'},
    ];
  }

  public static getLabelFromValue(value: string): string | undefined {
    const item: selectType | undefined = this.getValueObject().filter((object: selectType) => object.value === value).shift();
    return item ? item.label : undefined;
  }

  public static getValueFromLabel(label: string): string | undefined {
    const item: selectType | undefined = this.getValueObject().filter((object: selectType) => object.label === label).shift();
    return item ? item.value : undefined;
  }
}
