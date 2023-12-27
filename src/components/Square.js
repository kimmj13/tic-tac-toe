import "./Square.css";
// export default class Square extends Component {
const Square = (props) => {
  // render() {
  return (
    <button
      className="square"
      // onClick={() => this.props.onClick()}
      onClick={() => props.onClick()}
    >
      {/* {this.props.value} */}
      {props.value}
    </button>
  );
  // }
};

export default Square;
