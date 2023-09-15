import classes from "./AdviceOutput.module.css";

const AdviceOutput = ({ slip }) => {
  return (
    <>
      <p className={classes.id}>advice #{slip.id}</p>
      <p className={classes.advice}>“{slip.advice}”</p>
    </>
  );
};

export default AdviceOutput;
