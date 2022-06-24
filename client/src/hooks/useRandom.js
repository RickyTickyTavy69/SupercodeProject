import { useCallback, useState } from "react";
import getRandom from "../utils/getRandom";

const useRandom = () => {
  const [box1, setBox1] = useState(false);
  const [box2, setBox2] = useState(false);
  const [box3, setBox3] = useState(false);

  const mixBoxes = useCallback(() => {
    // функция обновляет массив boxes, делая одно значение true
    const trueNumber = getRandom(0, 3); // случайное число от нуля до двух.

    if (trueNumber === 0) {
      setBox1(true);
    }
    if (trueNumber === 1) {
      setBox2(true);
    }
    if (trueNumber === 2) {
      setBox3(true);
    }
    console.log("boxes mixed", box1, box2, box3);
    console.log("the number", trueNumber);
  }, []);

  const setFalseBox = (number) => {
    if (number === 1) {
      setBox1((prevstate) => false); // почему то не работает.
      console.log("box1 set false", box1, box2, box3);
    }
    if (number === 2) {
      setBox2((prevstate) => false);
      console.log("box2 set false", box1, box2, box3);
    }
    if (number === 3) {
      setBox3((prevstate) => false);
      console.log("box3 set false", box1, box2, box3);
    }
  };

  return { box1, box2, box3, mixBoxes, setFalseBox };
};

export default useRandom;
