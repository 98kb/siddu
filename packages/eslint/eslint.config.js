import tseslint from "typescript-eslint";
import {styleGuide} from "./src/style-guide.js";

export default tseslint.config(styleGuide);
