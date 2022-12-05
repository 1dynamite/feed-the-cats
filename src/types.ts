export interface CatType {
  id: number;
  hasCollar: boolean;
  name: string;
  color: string;
  age: string;
  hungry: boolean;
  timeoutId: undefined | ReturnType<typeof setTimeout>;
}

export interface CatItemPropsType extends CatType {
  handleFeedCat: (name: number) => void;
}
