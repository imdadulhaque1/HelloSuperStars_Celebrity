import * as React from "react";
import Svg, { Path } from "react-native-svg";

function People(props) {
  return (
    <Svg viewBox="0 0 19.566 19.566" {...props}>
      <Path d="M0 0h19.566v19.566H0z" fill="none" />
      <Path
        d="M13.046 8.965a2.453 2.453 0 10-2.447-2.453 2.44 2.44 0 002.447 2.453zm-6.525 0a2.453 2.453 0 10-2.447-2.453 2.44 2.44 0 002.447 2.453zm0 1.635c-1.9.001-5.709.959-5.709 2.859v1.23a.819.819 0 00.816.818h9.784a.819.819 0 00.816-.818v-1.23c.002-1.9-3.807-2.858-5.707-2.858zm6.525 0c-.237 0-.506.016-.791.041.016.008.024.025.033.033a3.4 3.4 0 011.573 2.785v1.23a2.463 2.463 0 01-.147.818h4.225a.819.819 0 00.816-.818v-1.23c0-1.9-3.809-2.858-5.709-2.858z"
        fill="#fff"
      />
    </Svg>
  );
}

export default People;
