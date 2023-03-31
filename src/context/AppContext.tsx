import { ComponentType, PropsWithChildren, ReactNode } from "react";

interface IProps {
  components: Array<ComponentType<PropsWithChildren<any>>>;
  children: ReactNode;
}

export const AppContext = (props: IProps) => {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>;
      }, children)}
    </>
  );
};
