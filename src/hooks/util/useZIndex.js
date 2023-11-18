import { useRef, useCallback } from "react";

// export function App() {
//   const { refToGetZIndex, getZIndex } = useZIndex();
//   return (
//     <div className='App'>
//       <div ref={refToGetZIndex} style={{ zIndex: 100 }}>
//         <p>hello</p>
//       </div>
//       <button
//         onClick={() => {
//           const zIndex = getZIndex();
//           console.log(zIndex);
//         }}
//       >
//         push
//       </button>
//     </div>
//   );
// }

const useZIndex = () => {
  const refToGetZIndex = useRef(null); // Create a ref to the component

  const getZIndex = useCallback(() => {
    const element = refToGetZIndex.current; // Get the component element from the ref
    const styles = window.getComputedStyle(element);
    const zIndex = styles.getPropertyValue("z-index");
    // "auto"、"100"等のstringが返る
    return zIndex;
  }, []);

  return { refToGetZIndex, getZIndex };
};

export default useZIndex;
