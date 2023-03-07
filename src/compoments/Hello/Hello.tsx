import './Hello.css';

interface IHelloProps {
  foo: string;
  bar: string;
}

export const Hello = (props: IHelloProps): JSX.Element => (
  <div className="sample">
    Hello from {props.foo} and {props.bar}!
  </div>
);
