export type statusValueObject = { label: string; value: number; };

export class StatusValueObject {
  public static getValueObject(): statusValueObject[] {
    return [
      { label: 'Nouveau', value: 1 },
      { label: 'Confirmé', value: 2 },
      { label: 'En cours', value: 3 },
      { label: 'En attente', value: 4 },
      { label: 'Résolu', value: 45},
    ];
  }

  public static getLabelFromValue(value: number): string | undefined {
    const item: statusValueObject | undefined = this.getValueObject().filter((object: statusValueObject) => object.value === value).shift();
    return item ? item.label : undefined;
  }

  public static getValueFromLabel(label: string): number | undefined {
    const item: statusValueObject | undefined = this.getValueObject().filter((object: statusValueObject) => object.label === label).shift();
    return item ? item.value : undefined;
  }
}
