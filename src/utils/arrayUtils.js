const compareValues = (valueType, val0, val1) => {
  switch (valueType) {
    case "string":
      return val0 ? val0.localeCompare(val1) : 0;
    case "number":
      return val0 < val1 ? -1 : 1;
    default:
      return null;
  }
};

export function arrayOfObjectsSorted(
  arrayOfObjects,
  key,
  descending = false,
  typeOfValue = "string"
) {
  arrayOfObjects.sort((a, b) => {
    if (descending) {
      // descending
      // position zero is the biggest

      const valueB = b[key];
      // return valueB ? valueB.localeCompare(a[key]) : false;
      return compareValues(typeOfValue, valueB, a[key]);
    }
    // ascending
    // position zero is the smallest
    const valueA = a[key];
    // return valueA ? valueA.localeCompare(b[key]) : false;
    return compareValues(typeOfValue, valueA, b[key]);
  });
  return arrayOfObjects;
}

export const objectArraydeduplicated = (
  objectArray,
  arrayLengthLimitToDeduplicate = null
) => {
  if (
    arrayLengthLimitToDeduplicate &&
    arrayLengthLimitToDeduplicate < objectArray.length
  ) {
    // 大きすぎるarrayに対して実務上重複削除を行わない場合
    // console.log("Too long. Deduplication has stopped.");
    return objectArray;
  }

  if (objectArray.length < 1) {
    // console.log("no element");
    return objectArray;
  }

  const idVSObj = {};

  // arrayの先頭のもの（古いもの等）を残したい。そこで、reverseする。こうすれば、最終的に辞書（オブジェクト）のvalueとして残るものがreversed arrayのより後ろのもの（古いもの等）となる。
  // reverse()はoriginal arrayをmutateしてしまうので「...objectArray」する
  const objectArrayReversed = [...objectArray].reverse();

  for (const anObj of objectArrayReversed) {
    if (!anObj || !anObj._id) {
      // console.log("bad element found");
      return objectArray;
    }
    const anId = anObj._id.toString();
    // 同じidのオブジェクトはここで（よりarrayの先頭のもの（古いもの等）が残るようにして）重複削除される
    idVSObj[anId] = anObj;
  }

  const deduplicatedArray = [];
  for (const anObj of objectArray) {
    const anId = anObj._id.toString();

    const objInIdVSObj = idVSObj[anId];
    if (objInIdVSObj) {
      deduplicatedArray.push(objInIdVSObj);
      idVSObj[anId] = null;
    }
  }

  return deduplicatedArray;
};

/*
getObjectByKeyValuePairFromObjectArray("label", "public" , [
  {  label: "public" },
  {  label: "非公開" },
]);
-->  { label: "public" }
*/
export function getObjectByKeyValuePairFromObjectArray(
  key,
  value,
  objectArray
) {
  if (!Array.isArray(objectArray)) {
    return null;
  }
  for (const anObj of objectArray) {
    if (anObj[key] === value) {
      return anObj;
    }
  }
}

/*
const a = [0, 1, 2, null, undefined, "", "x", "y"];
const b = arrayWithoutFalsyElements(a);
console.log("b", b);

↓

// [1, 2, "x", "y"]
*/
export function arrayWithoutFalsyElements(arr) {
  const newArr = [];
  for (const anElement of arr) {
    if (anElement) {
      newArr.push(anElement);
    }
  }
  return newArr;
}

/*
const nameArr = [
  { _id: 0, name: "John" },
  { _id: 23, name: "Gori" },
];
const data = getObjectDataFromArray("_id", 23, nameArr);
console.log("data", data);
const data1 = getObjectDataFromArray("name", "John", nameArr);
console.log("data1", data1);

// data
// (2) {index: "1", obj: {...}}
//     index:"1"
//     obj:(2) {_id: 23, name: "Gori"}
//         _id:23
//         name:"Gori"

// data1
// (2) {index: "0", obj: {...}}
//     index:"0"
//     obj:(2) {_id: 0, name: "John"}
//         _id:0
//         name:"John"
*/

export function getObjectDataFromArray(key, value, arr) {
  for (const index in arr) {
    const anObj = arr[index];
    if (anObj[key] === value) {
      return { index: index, obj: anObj };
    }
  }
  return null;
}

export const getNewArrayFromFetchedAndPrevious = ({
  ObjsPrevious,
  ObjsFetched,
  // unshiftしたいならfalse
  doPush = true,
}) => {
  if (!ObjsFetched) {
    return;
  }

  if (ObjsPrevious) {
    let newArray = doPush
      ? [...ObjsPrevious, ...ObjsFetched]
      : [...ObjsFetched, ...ObjsPrevious];

    const arrayLengthLimitToDeduplicate = 500;
    newArray = objectArraydeduplicated(
      newArray,
      arrayLengthLimitToDeduplicate,
      doPush
    );

    if (!newArray) {
      // 何らかの理由でfalsyだったらnullに統一
      newArray = null;
    }
    return newArray;
  } else {
    return ObjsFetched;
  }
};

/*
２つのarrayたちが「同じ」arrayたちであるかどうかを判定する。
ここで、「同じ」とは「idが同じ」「elementsが同じ」等の様々な意味をとる。

            checkIfSameArray({
              arr0: [{ _id: 100 }],
              arr1: [{ _id: 100 }],
              compareBy: "keyAndValue",
              keyToCompare: "_id",
            })
↓
true

            checkIfSameArray({
              arr0: [{ _id: 100, gori: "GGG" }],
              arr1: [{ _id: 100, xx: 24161 }],
              compareBy: "keyAndValue",
              keyToCompare: "_id",
            })
↓
true

            checkIfSameArray({
              arr0: [{ _id: 100 }],
              arr1: [{ _id: 100 }, { _id: 200 }],
              compareBy: "keyAndValue",
              keyToCompare: "_id",
            })
↓
false

            checkIfSameArray({
              arr0: [{ _id: 100 }],
              arr1: [{ _id: 100 }],
            })
↓
false

            checkIfSameArray({
              arr0: [100],
              arr1: [100],
            })
↓
true

            checkIfSameArray({
              arr0: [100],
              arr1: [100, 200],
            })
↓
false

// arrayじゃない場合
            checkIfSameArray({
              arr0: 100,
              arr1: 100,
            })
↓
null

            checkIfSameArray({
              arr0: [],
              arr1: [],
            })
↓
true

*/
export const checkIfSameArray = ({
  arr0,
  arr1,
  compareBy = null,
  keyToCompare = null,
}) => {
  // console.log(arr0, arr1, compareBy, keyToCompare);
  if (!Array.isArray(arr0) || !Array.isArray(arr1)) {
    return null;
  }

  if (!arr0 || !arr1) {
    return null;
  }
  const sameLength = hasSameLength(arr0, arr1);
  if (!sameLength) {
    return sameLength;
  }
  return checkIfhasSameElements(arr0, arr1, compareBy, keyToCompare);
};
const hasSameLength = (arr0, arr1) => {
  return arr0.length === arr1.length;
};
const checkIfhasSameElements = (arr0, arr1, compareBy, keyToCompare) => {
  for (const i in arr0) {
    const _anObj = arr0[i];
    const anObj = arr1[i];
    if (!_anObj || !anObj) {
      return null;
    }
    switch (compareBy) {
      case "keyAndValue":
        const _anObj_value = _anObj[keyToCompare];
        const anObj_value = anObj[keyToCompare];
        // console.log("AAAAAAAAFASDFASFASFA", _anObj_value, anObj_value);
        if (!_anObj_value || !anObj_value) {
          return null;
        }
        if (_anObj_value !== anObj_value) {
          return false;
        }
        break;
      case "all":
        // ここに_anObjとanObj内の全key value pairsで比較するコード（keyとvalueが全て一致しているか調べるコード）を入れることもできるが、面倒なのでやっていない。
        throw new Error("invalid compareBy"); // ここでerrorを返しているのは、そのkey value pairsで比較するコードが未実装であることから、誤ってtrueが返ってしまうのを防ぐため
      default:
        // defaultは単純に要素で比較
        if (_anObj !== anObj) {
          return false;
        }
    }
  }

  return true;
};

/*
This function takes up to three arguments:

start (required): The starting value of the range
stop (optional): The ending value of the range (if not specified, the function assumes start is 0 and uses it as the stop value)
step (optional): The amount by which the range should be incremented (default is 1)
The function returns an array containing all the values in the range. Here are a few examples of how you could use it:

range(5); // returns [0, 1, 2, 3, 4]
range(1, 5); // returns [1, 2, 3, 4]
range(1, 10, 2); // returns [1, 3, 5, 7, 9]
*/

export function range(start, stop = null, step = 1) {
  // If only one argument is passed, use it as the stop value
  if (stop === null) {
    stop = start;
    start = 0;
  }

  let result = [];

  // Iterate over the range and add each value to the result array
  for (let i = start; i < stop; i += step) {
    result.push(i);
  }

  return result;
}

/*
arrayをrandomにsortする

（１）基本的には、argumentのarrayが変形され、randomにsortされる。
const array = ["a", "b", "c", "d"];
shuffleArray({ array });
console.log({ array });
// ['b', 'a', 'c', 'd']

（２）shuffleOriginalArrayをfalseにすると、argumentのarrayは変形されず、新規作成されたarrayをrandomにsortして返す。
const arr = ["a", "b", "c", "d"];
const newArr = shuffleArray({ array: arr, shuffleOriginalArray: false });
console.log({ arr, newArr });
// arr: ['a', 'b', 'c', 'd']
// newArr: ['b', 'c', 'a', 'd']

*/

export function shuffleArray({ array, shuffleOriginalArray = true }) {
  if (!Array.isArray(array)) {
    return;
  }
  if (array.length < 2) {
    return array;
  }
  if (!shuffleOriginalArray) {
    // 新しいarrayを作り、そのpointerで上書き
    array = [...array];
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
