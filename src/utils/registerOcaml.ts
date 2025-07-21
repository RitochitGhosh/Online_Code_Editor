import * as monaco from "monaco-editor";

export const registerOcamlLanguage = () => {
  monaco.languages.register({ id: "ocaml" });

  monaco.languages.setMonarchTokensProvider("ocaml", {
    tokenizer: {
      root: [
        [/\b(let|in|match|with|fun|type|module|open|rec)\b/, "keyword"],
        [/[a-zA-Z_]\w*/, "identifier"],
        [/\d+/, "number"],
        [/".*?"/, "string"],
        [/[{}()[\]]/, "@brackets"],
        [/[=><!~?:&|+\-*\/\^%]+/, "operator"],
      ],
    },
  });
};