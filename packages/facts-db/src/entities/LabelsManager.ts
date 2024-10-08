import {EntityManager} from "./EntityManager";
import {InsertLabel} from "../schema/label/InsertLabel";
import {Label} from "../schema/label/Label";

export class LabelsManager extends EntityManager<"labels"> {
  async getOrCreate({name}: InsertLabel) {
    return (await this.getByName(name)) ?? (await this.add({name}));
  }

  async getByName(name: string): Promise<Label | undefined> {
    const matchingLabels = await this.getAll(label => label.name === name);
    return matchingLabels[0];
  }
}
