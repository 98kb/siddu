import tseslint from "typescript-eslint";
import {styleGuide} from "./src/style-guide";

export default tseslint.config(styleGuide);
