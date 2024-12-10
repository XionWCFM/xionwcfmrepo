import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import type React from "react";
import { useEffect } from "react";

interface Props {
  content: string;
  onChange: (value: string) => void;
}

export const MdxEditor: React.FC<Props> = ({ content, onChange }) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      const customComponents = [
        {
          label: "CallOut",
          detail: "CallOut component for important messages",
          insertText: '<CallOut type="${1|info,warning,error|}">\n  $0\n</CallOut>',
          documentation: "Available types: info, warning, error",
        },
        {
          label: "Paragraph",
          detail: "Paragraph component with various text styling options",
          insertText: [
            "<Paragraph",
            '  overflow="${1|default,ellipsis|}"',
            '  leading="${2|default,denser,normal,tight,loose,looser|}"',
            '  weight="${3|default,bold,semi-bold,medium,regular,light,thin|}"',
            '  color="${4|default,white,neutral-50,neutral-100,neutral-200,neutral-300,neutral-400,neutral-500,neutral-600,neutral-700,neutral-800,neutral-900,neutral-950,gray-50,gray-100,gray-200,gray-300,gray-400,gray-500,gray-600,gray-700,gray-800,gray-900,gray-950,warning-50,warning-100,warning-200,warning-300,warning-400,warning-500,warning-600,warning-700,warning-800,warning-900,warning-950,danger-50,danger-100,danger-200,danger-300,danger-400,danger-500,danger-600,danger-700,danger-800,danger-900,danger-950,success-50,success-100,success-200,success-300,success-400,success-500,success-600,success-700,success-800,success-900,success-950,primary-50,primary-100,primary-200,primary-300,primary-400,primary-500,primary-600,primary-700,primary-800,primary-900,primary-950|}"',
            '  size="${5|xs,sm,base,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl,8xl,9xl|}"',
            '  responsive="${6|true,false|}"',
            ">",
            "  $0",
            "</Paragraph>",
          ].join("\n"),
          documentation: `Available props:
- overflow: default, ellipsis
- leading: default, denser, normal, tight, loose, looser
- weight: default, bold, semi-bold, medium, regular, light, thin
- color: default, white, neutral-[50-950], gray-[50-950], warning-[50-950], danger-[50-950], success-[50-950], primary-[50-950]
- size: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
- responsive: boolean
- className: string
- children: ReactNode`,
        },
      ];

      monaco.languages.registerCompletionItemProvider("markdown", {
        provideCompletionItems: (model: Monaco.editor.ITextModel, position: Monaco.Position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          return {
            suggestions: customComponents.map((component) => ({
              label: component.label,
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: component.insertText,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              detail: component.detail,
              documentation: component.documentation,
              range: range,
            })),
          };
        },
      });
    }
  }, [monaco]);

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="markdown"
      value={content}
      onChange={(value) => onChange(value ?? "")}
      theme={"vs-light"}
      options={{
        minimap: { enabled: false },
        wordWrap: "on",
        lineNumbers: "on",
        folding: true,
        fontSize: 14,
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        acceptSuggestionOnEnter: "off",
        renderLineHighlight: "none",
        occurrencesHighlight: "off",
        lineHeight: 24,
        lineDecorationsWidth: 0,
        renderWhitespace: "none",
        autoClosingBrackets: "never",
        autoClosingQuotes: "never",
        autoSurround: "never",
        unicodeHighlight: {
          ambiguousCharacters: false,
          invisibleCharacters: false,
        },
      }}
    />
  );
};
