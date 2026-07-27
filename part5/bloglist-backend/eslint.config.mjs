import neostandard, { plugins } from "neostandard";
import globals from "globals"; // Este paquete ya lo tenías instalado

export default [
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/node_modules/**",
      "eslint.config.mjs"
    ]
  },
  ...neostandard({
    // Esto le indica a Standard que use las variables globales de Node y de Jest
    env: ["node", "jest"] 
  }),
  {
    // Configuración moderna para decirle a ESLint que acepte las funciones de Jest
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
]