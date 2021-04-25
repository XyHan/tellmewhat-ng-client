import { selectType } from '../../../domain/shared/type/select.type';

export class TypeValueObject {
  public static getValueObject(): selectType[] {
    return [
      { label: 'Nouvelle fonctionnalité', value: 'feature'},
      { label: 'Bogue', value: 'bug'},
      { label: 'Nouveau projet', value: 'project'},
      { label: 'Data export', value: 'data'},
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
