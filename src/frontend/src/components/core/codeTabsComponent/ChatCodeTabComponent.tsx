import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import { useDarkStore } from "../../../stores/darkStore";
import IconComponent from "../../common/genericIconComponent";
import { Button } from "../../ui/button";

type SimplifiedCodeTabProps = {
  code: string;
  language: string;
};

export default function SimplifiedCodeTabComponent({
  code,
  language,
}: SimplifiedCodeTabProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }

    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <div
      className="mt-2 flex w-full flex-col overflow-hidden   text-left dark"
      data-testid="chat-code-tab"
    >
      <div className="flex w-full items-center justify-between bg-navy border border-b-0 border-border   px-4 py-2">
        <span className="dar text-sm   text-white">{language}</span>
        <Button
          variant="ghost"
          size="icon"
          data-testid="copy-code-button"
          onClick={copyToClipboard}
        >
          {isCopied ? (
            <IconComponent name="Check" className="h-4 w-4" />
          ) : (
            <IconComponent name="Copy" className="h-4 w-4" />
          )}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={tomorrow}
        className="!mt-0 h-full w-full overflow-scroll text-left !rounded-none !custom-scroll"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
