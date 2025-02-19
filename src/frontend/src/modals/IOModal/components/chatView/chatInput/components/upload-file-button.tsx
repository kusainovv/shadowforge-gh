import ShadTooltip from "@/components/common/shadTooltipComponent";
import ForwardedIconComponent from "../../../../../../components/common/genericIconComponent";
import { Button } from "../../../../../../components/ui/button";

const UploadFileButton = ({
  fileInputRef,
  handleFileChange,
  handleButtonClick,
  lockChat,
}) => {
  return (
    <ShadTooltip
      styleClasses="z-50"
      side="right"
      content="Attach image (png, jpg, jpeg)"
    >
      <Button disabled={lockChat}>
        <input
          disabled={lockChat}
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div
          className={`flex items-center justify-center font-bold transition-all ${
            lockChat
              ? "cursor-not-allowed"
              : "   hover:text-black"
          } p-0`}
          onClick={handleButtonClick}
          
        >
          <ForwardedIconComponent className="h-[6px] w-[6px]" name="Image" />
        </div>
      </Button>
    </ShadTooltip>
  );
};

export default UploadFileButton;
